"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../../../config/constants";
import { 
  FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaCheckCircle, 
  FaTimesCircle, FaTruck, FaBox, FaKey, FaHandHoldingHeart 
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function OrderActionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [otp, setOtp] = useState("");
  const [showFailModal, setShowFailModal] = useState(false);
  const [failReason, setFailReason] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_ENDPOINTS.RIDER_BASE}/orders/${id}`, { withCredentials: true });
      if (data.success) {
        setOrder(data.order);
      } else {
        toast.error("Order not found");
        router.push("/rider/dashboard");
      }
    } catch (err) {
      toast.error("Failed to load order detail");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, payload = {}) => {
    try {
      setUpdating(true);
      const { data } = await axios.put(`${API_ENDPOINTS.RIDER_BASE}/orders/${id}/${action}`, payload, { withCredentials: true });
      if (data.success) {
        toast.success(data.message || "Status updated!");
        fetchOrder();
        if (action === "deliver" || action === "fail") {
          router.push("/rider/dashboard");
        }
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setUpdating(false);
      setShowFailModal(false);
    }
  };

  const handleOpenNavigation = () => {
    if (!order) return;
    
    const destLat = order.latitude;
    const destLng = order.longitude;
    
    if (destLat && destLng) {
      const url = `https://www.google.com/maps?z=16&t=m&q=loc:${destLat}+${destLng}`;
      window.open(url, "_blank");
    } else {
      const addressText = `${order.street} ${order.city}`;
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`, "_blank");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-medium animate-pulse">Loading mission details...</div>;
  }

  if (!order) return null;

  const currentStatus = order.status;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Sticky */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Delivery Detail</h1>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3 ${
                currentStatus === 'pending' ? "bg-yellow-100 text-yellow-700" :
                currentStatus === 'delivered' ? "bg-emerald-100 text-emerald-700" :
                "bg-blue-100 text-blue-700"
            }`}>
                {currentStatus.replace('_', ' ')}
            </span>
            <h2 className="text-2xl font-black text-gray-900 mb-1">₹{order.total_amount}</h2>
            <p className="text-gray-500 text-sm font-medium">Order #{order.order_id}</p>
        </div>

        {/* Action Buttons based on status */}
        <div className="grid grid-cols-1 gap-3">
          {currentStatus === 'pending' && (
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('accept')} 
                disabled={updating}
                className="flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 active:scale-95 transition disabled:opacity-50"
              >
                <FaCheckCircle /> Accept Job
              </button>
              <button 
                onClick={() => handleAction('reject')} 
                disabled={updating}
                className="flex-1 bg-white text-red-600 border-2 border-red-100 font-bold py-4 rounded-2xl active:scale-95 transition disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          )}

          {currentStatus === 'accepted' && (
            <button 
              onClick={() => handleAction('pickup')} 
              disabled={updating}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 transition"
            >
              <FaBox /> Mark as Picked Up
            </button>
          )}

          {currentStatus === 'picked_up' && (
            <button 
              onClick={() => handleAction('start-delivery')} 
              disabled={updating}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 active:scale-95 transition"
            >
              <FaTruck /> Start Delivery
            </button>
          )}

          {currentStatus === 'in_transit' && (
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-500 shadow-xl shadow-emerald-50 space-y-4">
              <h3 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <FaKey className="text-emerald-600" /> Confirm Delivery
              </h3>
              <div>
                 <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Customer OTP</label>
                 <input 
                    type="text" 
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center text-3xl font-black rounded-xl border-2 border-gray-100 py-4 focus:border-emerald-500 outline-none transition-colors"
                    maxLength={6}
                 />
              </div>
              <button 
                onClick={() => handleAction('deliver', { otp })} 
                disabled={updating || !otp}
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition disabled:opacity-30"
              >
                Confirm & Deliver
              </button>
              <button 
                onClick={() => setShowFailModal(true)}
                className="w-full text-red-600 font-bold py-2 text-sm"
              >
                Could not deliver?
              </button>
            </div>
          )}
        </div>

        {/* Customer & Address Details */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
           <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                <FaHandHoldingHeart className="text-emerald-500" /> Customer Details
              </h3>
              <a href={`tel:${order.customer_phone}`} className="bg-emerald-500 text-white p-2 rounded-lg active:scale-90 transition">
                <FaPhoneAlt className="text-sm" />
              </a>
           </div>
           <div className="p-5 space-y-4">
              <div>
                 <p className="text-gray-900 font-black text-lg">{order.first_name} {order.last_name}</p>
                 <p className="text-emerald-600 text-sm font-bold">{order.customer_phone}</p>
              </div>
              
              <div className="flex gap-3 items-start border-t border-gray-50 pt-4">
                 <FaMapMarkerAlt className="text-red-500 mt-1" />
                 <div>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      {order.street}, {order.landmark && `${order.landmark}, `} {order.city}, {order.state} - {order.zip_code}
                    </p>
                    <button 
                      onClick={handleOpenNavigation}
                      className="mt-3 inline-block text-left text-emerald-600 font-bold text-xs uppercase tracking-widest border-b-2 border-emerald-600 pb-0.5 cursor-pointer bg-transparent border-t-0 border-x-0 outline-none"
                    >
                      Open in Navigation
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-4 border-b border-gray-50 bg-gray-50">
              <h3 className="font-bold text-gray-700 text-sm">Order Items</h3>
           </div>
           <div className="divide-y divide-gray-50">
              {order.items?.map((item, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">
                      {item.product_name}
                      {item.variant_name && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {item.variant_name}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-700 text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Failure Report Modal */}
      {showFailModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Report Failure</h3>
              <p className="text-gray-500 text-sm mb-4">Why can't you deliver this order? This will trigger a refund for wallet orders.</p>
              
              <textarea 
                className="w-full border-2 border-gray-100 rounded-xl p-3 h-32 focus:border-red-500 outline-none transition-colors mb-4"
                placeholder="Ex: Customer not available, Locked house, Wrong address..."
                value={failReason}
                onChange={(e) => setFailReason(e.target.value)}
              />

              <div className="flex gap-2">
                 <button 
                  onClick={() => setShowFailModal(false)}
                  className="flex-1 py-3 font-bold text-gray-500"
                 >
                   Cancel
                 </button>
                 <button 
                  onClick={() => handleAction('fail', { reason: failReason })}
                  disabled={!failReason || updating}
                  className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-100 disabled:opacity-30"
                 >
                   Confirm Failure
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
