"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { adminurl } from "./adminapis";
import { FaTimes, FaTruck, FaCircle } from "react-icons/fa";

export default function AssignRiderModal({ orderId, onClose, onAssigned }) {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    const fetchOnlineRiders = async () => {
      try {
        const { data } = await axios.get(`${adminurl}/riders/online`, { withCredentials: true });
        if (data.success) setRiders(data.riders);
      } catch (err) {
        console.error("Fetch online riders error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOnlineRiders();
  }, [orderId]);

  const handleAssign = async (riderId) => {
    try {
      setAssigning(riderId);
      const { data } = await axios.post(
        `${adminurl}/assignments/assign`,
        { order_id: orderId, rider_id: riderId, admin_notes: adminNotes },
        { withCredentials: true }
      );
      if (data.success) {
        onAssigned?.(data);
        onClose();
      }
    } catch (err) {
      console.error("Assign error:", err);
      alert(err.response?.data?.message || "Failed to assign");
    } finally {
      setAssigning(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold">Assign Rider - Order #{orderId}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
        </div>

        <div className="p-4">
          {/* Admin notes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes (optional)</label>
            <input
              type="text"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Priority delivery, fragile items..."
            />
          </div>

          {/* Online riders */}
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FaCircle className="text-green-500 text-xs" /> Online Riders ({riders.length})
          </h3>

          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading riders...</p>
          ) : riders.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No online riders available</p>
          ) : (
            <div className="space-y-2">
              {riders.map((rider) => (
                <div key={rider.id} className="border rounded-lg p-3 hover:bg-gray-50 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{rider.name}</span>
                      {rider.active_orders > 0 && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                          {rider.active_orders} active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>{rider.phone}</span>
                      <span className="flex items-center gap-1 capitalize">
                        <FaTruck className="text-gray-400" /> {rider.vehicle_type}
                        {rider.vehicle_number && ` - ${rider.vehicle_number}`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssign(rider.id)}
                    disabled={assigning === rider.id}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition disabled:opacity-50 ml-3"
                  >
                    {assigning === rider.id ? "Assigning..." : "Assign"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
