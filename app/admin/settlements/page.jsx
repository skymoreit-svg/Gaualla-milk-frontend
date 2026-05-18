"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { adminurl } from "../adminCompo/adminapis";
import { FaMoneyBillWave, FaHistory, FaCheck } from "react-icons/fa";

export default function SettlementsPage() {
  const [tab, setTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settlingRider, setSettlingRider] = useState(null);
  const [settleAmount, setSettleAmount] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (tab === "pending") {
        const { data } = await axios.get(`${adminurl}/settlements/pending`, { withCredentials: true });
        if (data.success) setPending(data.settlements);
      } else {
        const { data } = await axios.get(`${adminurl}/settlements/history`, { withCredentials: true });
        if (data.success) setHistory(data.history);
      }
    } catch (err) {
      console.error("Fetch settlements error:", err);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSettle = async (riderId, maxAmount) => {
    const amount = parseFloat(settleAmount);
    if (!amount || amount <= 0 || amount > maxAmount) {
      alert(`Enter a valid amount (max ₹${maxAmount})`);
      return;
    }

    try {
      await axios.post(`${adminurl}/settlements/settle`, { rider_id: riderId, amount }, { withCredentials: true });
      setSettlingRider(null);
      setSettleAmount("");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Settlement failed");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-text mb-6">COD Settlements</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "pending" ? "bg-accent text-white" : "bg-background00 text-text hover:bg-background00"
          }`}
          onClick={() => setTab("pending")}
        >
          <FaMoneyBillWave className="inline mr-2" /> Pending
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "history" ? "bg-accent text-white" : "bg-background00 text-text hover:bg-background00"
          }`}
          onClick={() => setTab("history")}
        >
          <FaHistory className="inline mr-2" /> History
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-700">Loading...</div>
      ) : tab === "pending" ? (
        <div className="space-y-4">
          {pending.length === 0 ? (
            <div className="text-center py-10 text-gray-700">No pending settlements</div>
          ) : (
            pending.map((s) => (
              <div key={s.rider_id} className="bg-background rounded-xl shadow p-5 border border-highlight">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="font-bold text-text text-lg">{s.rider_name}</p>
                    <p className="text-sm text-gray-700">{s.rider_phone}</p>
                    <p className="text-sm text-gray-700">{s.pending_deliveries} deliveries pending settlement</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-highlight">
                      ₹{parseFloat(s.total_unsettled).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-[#252729b8]">Unsettled COD</p>
                  </div>
                </div>

                {settlingRider === s.rider_id ? (
                  <div className="mt-4 flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="text-sm text-text">Settlement Amount</label>
                      <input
                        type="number"
                        value={settleAmount}
                        onChange={(e) => setSettleAmount(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={`Max ₹${s.total_unsettled}`}
                        max={s.total_unsettled}
                      />
                    </div>
                    <button
                      onClick={() => handleSettle(s.rider_id, parseFloat(s.total_unsettled))}
                      className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent transition text-sm flex items-center gap-1"
                    >
                      <FaCheck /> Settle
                    </button>
                    <button
                      onClick={() => { setSettlingRider(null); setSettleAmount(""); }}
                      className="bg-background00 text-text px-4 py-2 rounded-lg hover:bg-background00 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setSettlingRider(s.rider_id); setSettleAmount(s.total_unsettled.toString()); }}
                    className="mt-4 bg-green-50 text-accent px-4 py-2 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                  >
                    Mark Settlement
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-background rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text uppercase">Rider</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text uppercase">Order</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-text uppercase">COD Amount</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-text uppercase">Settlement Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-10 text-gray-700">No settlement history</td></tr>
              ) : (
                history.map((h) => (
                  <tr key={h.id} className="hover:bg-background">
                    <td className="px-4 py-3">
                      <p className="font-medium">{h.rider_name}</p>
                      <p className="text-xs text-gray-[#252729b8]">{h.rider_phone}</p>
                    </td>
                    <td className="px-4 py-3 text-text">#{h.order_id}</td>
                    <td className="px-4 py-3 text-right font-medium text-accent">₹{parseFloat(h.cod_amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {h.settlement_date ? new Date(h.settlement_date).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
