"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/constants";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt, FaBoxOpen, FaClock, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";

export default function RiderDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rider, setRider] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, ordersRes] = await Promise.all([
        axios.get(`${API_ENDPOINTS.RIDER_AUTH}/me`, { withCredentials: true }),
        axios.get(`${API_ENDPOINTS.RIDER_BASE}/orders/assigned`, { withCredentials: true })
      ]);

      if (profileRes.data.success) setRider(profileRes.data.rider);
      if (ordersRes.data.success) setOrders(ordersRes.data.orders);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const toggleOnline = async () => {
    try {
      const { data } = await axios.put(`${API_ENDPOINTS.RIDER_AUTH}/toggle-online`, {}, { withCredentials: true });
      if (data.success) {
        setRider(prev => ({ ...prev, is_online: data.is_online }));
        toast.success(data.is_online ? "You are now ONLINE" : "You are now OFFLINE");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update status";
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium italic">Scanning for assignments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {rider?.name}!</h1>
          <p className="text-gray-500">Here's what's happening with your deliveries today.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
           <span className={`text-sm font-bold ml-2 ${rider?.is_online ? "text-emerald-600" : "text-gray-400"}`}>
            SERVICE STATUS:
          </span>
          <button 
            onClick={toggleOnline}
            className={`relative inline-flex h-9 w-20 items-center rounded-full transition-all ${
              rider?.is_online ? "bg-emerald-600" : "bg-gray-300"
            }`}
          >
            <div className={`h-7 w-7 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
              rider?.is_online ? "translate-x-12" : "translate-x-1"
            }`}></div>
          </button>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Active Tasks</p>
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Vehicle</p>
          <p className="text-xl font-bold text-gray-800 uppercase">{rider?.vehicle_type || "N/A"}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Vehicle No.</p>
          <p className="text-xl font-bold text-gray-800 uppercase">{rider?.vehicle_number || "N/A"}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
          <p className={`text-xl font-bold ${rider?.is_online ? "text-emerald-600" : "text-gray-400"}`}>
            {rider?.is_online ? "Receiving Orders" : "Offline"}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FaBoxOpen className="text-emerald-600" />
            Current Assignments
          </h2>
          <button 
            onClick={fetchData} 
            className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-colors border border-emerald-100"
          >
            Refresh List
          </button>
        </div>

        <div className="p-6">
          {orders.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <FaClock className="text-gray-300 text-3xl" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">No active assignments</h3>
              <p className="text-gray-500 max-w-xs mx-auto text-sm">
                You don&apos;t have any orders assigned to you at the moment. Switch to online to receive new tasks.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map((order) => (
                <Link 
                  key={order.assignment_id} 
                  href={`/rider/orders/${order.assignment_id}`}
                  className="group relative bg-[#fdfdfd] rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 block"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 ${
                        order.assignment_status === 'pending' ? "bg-amber-100 text-amber-700" :
                        order.assignment_status === 'accepted' ? "bg-emerald-100 text-emerald-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          order.assignment_status === 'pending' ? "bg-amber-500" :
                          order.assignment_status === 'accepted' ? "bg-emerald-500" : "bg-blue-500"
                        } animate-pulse`}></span>
                        {order.assignment_status.replace('_', ' ')}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Order #{order.order_id}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-black tracking-widest">COLLECT</p>
                      <p className="text-2xl font-black text-emerald-700">₹{order.total_amount}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                        <FaMapMarkerAlt className="text-emerald-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Delivery Address</p>
                        <p className="font-bold text-gray-800 text-base">
                          {order.first_name} {order.last_name}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                          {order.street}, {order.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                    <div className="flex items-center gap-2 text-gray-600 group-hover:text-emerald-700 transition-colors">
                      <FaPhoneAlt className="text-xs" />
                      <span className="text-sm font-bold font-mono">{order.customer_phone}</span>
                    </div>
                    <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-emerald-600 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                      Start Task <FaChevronRight className="text-xs" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
