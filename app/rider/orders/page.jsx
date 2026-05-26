"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { API_ENDPOINTS } from "../../config/constants";
import Link from "next/link";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaClock, 
  FaChevronRight, 
  FaArrowLeft, 
  FaSearch, 
  FaCheckCircle, 
  FaTimesCircle 
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function RiderOrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams?.get("status") || "completed"; // 'completed' or 'cancelled'

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
    fetchOrders(1);
  }, [status]);

  const fetchOrders = async (pageNum = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_ENDPOINTS.RIDER_BASE}/orders/history?status=${status}&page=${pageNum}&limit=10`, 
        { withCredentials: true }
      );

      if (data.success) {
        setOrders(data.orders);
        setPage(data.pagination?.page || pageNum);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error("Error fetching order history:", err);
      toast.error("Failed to load order history");
    } finally {
      setLoading(false);
    }
  };

  const getPageTitle = () => {
    return status === "completed" ? "Completed Orders" : "Cancelled Orders";
  };

  const getStatusPillClass = (itemStatus) => {
    if (itemStatus === "delivered") {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
    return "bg-red-100 text-red-800 border-red-200";
  };

  // Filter orders locally by search query (order ID or name)
  const filteredOrders = orders.filter(order => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return true;
    return (
      String(order.order_id).includes(term) ||
      (order.customer_name && order.customer_name.toLowerCase().includes(term)) ||
      (order.street && order.street.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Sticky / Navigation */}
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4 bg-white/50 backdrop-blur sticky top-0 z-10 py-2">
        <button 
          onClick={() => router.push("/rider/dashboard")} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-xs text-gray-500">History and log of your processed jobs.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search by Order ID, name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm text-sm"
        />
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium italic">Retrieving archive...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            {status === "completed" ? (
              <FaCheckCircle className="text-gray-300 text-3xl" />
            ) : (
              <FaTimesCircle className="text-gray-300 text-3xl" />
            )}
          </div>
          <h3 className="text-gray-900 font-bold text-xl mb-2">No orders found</h3>
          <p className="text-gray-500 max-w-xs mx-auto text-sm">
            {searchQuery 
              ? "We couldn't find any historical records matching your search query." 
              : `You have no ${status} orders recorded in your history.`}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <Link 
                key={order.assignment_id} 
                href={`/rider/orders/${order.assignment_id}`}
                className="group relative bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 block shadow-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border ${getStatusPillClass(order.assignment_status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        order.assignment_status === 'delivered' ? "bg-emerald-500" : "bg-red-500"
                      }`}></span>
                      {order.assignment_status.replace('_', ' ')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Order #{order.order_id}</h3>
                    {order.delivered_at && (
                      <p className="text-[10px] text-gray-400 font-medium mt-1">
                        Processed: {new Date(order.delivered_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-black tracking-widest">TOTAL AMOUNT</p>
                    <p className="text-2xl font-black text-emerald-700">₹{order.total_amount}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                      <FaMapMarkerAlt className="text-emerald-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Customer & Address</p>
                      <p className="font-bold text-gray-800 text-base">
                        {order.customer_name || "Valued Customer"}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {order.street}, {order.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Payment Status: <span className={`font-mono text-sm ${order.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{order.payment_status}</span>
                  </div>
                  <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-emerald-600 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                    View Details <FaChevronRight className="text-xs" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => fetchOrders(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => fetchOrders(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
