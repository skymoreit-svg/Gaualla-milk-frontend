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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">COD Settlements</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "pending" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setTab("pending")}
        >
          <FaMoneyBillWave className="inline mr-2" /> Pending
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "history" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setTab("history")}
        >
          <FaHistory className="inline mr-2" /> History
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : tab === "pending" ? (
        <div className="space-y-4">
          {pending.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No pending settlements</div>
          ) : (
            pending.map((s) => (
              <div key={s.rider_id} className="bg-white rounded-xl shadow p-5 border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{s.rider_name}</p>
                    <p className="text-sm text-gray-500">{s.rider_phone}</p>
                    <p className="text-sm text-gray-500">{s.pending_deliveries} deliveries pending settlement</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{parseFloat(s.total_unsettled).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">Unsettled COD</p>
                  </div>
                </div>

                {settlingRider === s.rider_id ? (
                  <div className="mt-4 flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="text-sm text-gray-600">Settlement Amount</label>
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
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-1"
                    >
                      <FaCheck /> Settle
                    </button>
                    <button
                      onClick={() => { setSettlingRider(null); setSettleAmount(""); }}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setSettlingRider(s.rider_id); setSettleAmount(s.total_unsettled.toString()); }}
                    className="mt-4 bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                  >
                    Mark Settlement
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rider</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">COD Amount</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Settlement Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-10 text-gray-500">No settlement history</td></tr>
              ) : (
                history.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{h.rider_name}</p>
                      <p className="text-xs text-gray-400">{h.rider_phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">#{h.order_id}</td>
                    <td className="px-4 py-3 text-right font-medium text-green-600">₹{parseFloat(h.cod_amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-500">
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
