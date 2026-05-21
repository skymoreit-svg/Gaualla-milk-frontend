"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Search, Eye, ChevronDown, RefreshCw } from "lucide-react";
import axios from "axios";
import { adminurl } from "../adminCompo/adminapis";
import Link from "next/link";
import toast from "react-hot-toast";

// Enable credentials
axios.defaults.withCredentials = true;

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, paymentFilter, page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (paymentFilter !== "all") params.append("payment_status", paymentFilter);
      if (searchTerm.trim()) params.append("search", searchTerm.trim());

      const response = await axios.get(`${adminurl}/orders?${params.toString()}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setOrders(response.data.orders || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchOrders();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return orders;
    const search = searchTerm.trim().toLowerCase();
    return orders.filter((order) => {
      const orderId = String(order.id || "").toLowerCase();
      const userName = (order.user_name || "").toLowerCase();
      const userEmail = (order.user_email || "").toLowerCase();
      const userPhone = (order.user_phone || "").toLowerCase();
      const street = (order.street || "").toLowerCase();
      const city = (order.city || "").toLowerCase();
      
      return (
        orderId.includes(search) ||
        userName.includes(search) ||
        userEmail.includes(search) ||
        userPhone.includes(search) ||
        street.includes(search) ||
        city.includes(search)
      );
    });
  }, [orders, searchTerm]);

  const getStatusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("completed")) return "bg-green-100 text-accent";
    if (s.includes("out") || s.includes("delivery")) return "bg-primary text-white";
    if (s.includes("processing")) return "bg-primary text-white";
    if (s.includes("pending")) return "bg-yellow-100 text-highlight";
    if (s.includes("cancelled")) return "bg-red-100 text-red-700";
    return "bg-background00 text-text";
  };

  const getPaymentColor = (payment) => {
    const p = (payment || "").toLowerCase();
    if (p.includes("paid")) return "bg-green-100 text-accent";
    if (p.includes("pending")) return "bg-yellow-100 text-highlight";
    if (p.includes("failed")) return "bg-red-100 text-red-700";
    if (p.includes("refunded")) return "bg-orange-100 text-highlight";
    return "bg-background00 text-text";
  };

  if (loading && orders.length === 0) {
    return (
      <div className="p-8 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-text">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Orders</h1>
          <p className="text-text mt-1">Manage and track all orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-background border border-highlight rounded-lg p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-[#252729b8] w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order number, customer name, email, phone, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-12 pr-5 py-3 bg-background border border-highlight rounded-lg text-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 bg-background border border-highlight rounded-lg text-text font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="out_for_delivery">Out For Delivery</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 bg-background border border-highlight rounded-lg text-text font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="all">All Payment Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto bg-background rounded-lg shadow border border-highlight">
        <table className="w-full">
          <thead className="bg-background border-b border-highlight">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Order #</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Items</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Payment</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-gray-700">
                  {loading ? "Loading orders..." : "No orders found"}
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-background transition">
                  <td className="px-6 py-4 text-sm font-semibold text-text">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-text">{order.user_name || "N/A"}</p>
                      <p className="text-xs text-gray-700">{order.user_phone || order.user_email || ""}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text">
                    {order.item_count || 0} item{(order.item_count || 0) !== 1 ? "s" : ""}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-text">
                    {formatCurrency(parseFloat(order.total_amount || 0))}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      order.type === 'alternative' ? 'bg-primary text-white' :
                      order.type === 'daily' ? 'bg-green-100 text-accent' :
                      'bg-primary text-white'
                    }`}>
                      {order.type === 'onetime' ? 'One Time' : 
                       order.type === 'daily' ? '30 Days' :
                       order.type === 'alternative' ? 'Alternative' : order.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getPaymentColor(order.payment_status)}`}>
                      {order.payment_status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text">{formatDate(order.created_at)}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-primary hover:text-primary transition inline-flex items-center gap-1"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                      <span className="text-sm">View</span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-highlight rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-text">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-highlight rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
