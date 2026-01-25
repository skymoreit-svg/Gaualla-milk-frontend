"use client";
import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import axios from "axios";
import { adminurl } from "../../adminCompo/adminapis";
import toast from "react-hot-toast";
import Link from "next/link";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, limit: 50, offset: 0 });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    payment_method: "",
    user_id: "",
    order_id: "",
    start_date: "",
    end_date: ""
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: ((currentPage - 1) * pagination.limit).toString(),
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(
        `${adminurl}/payments/transactions?${params.toString()}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setTransactions(response.data.data.transactions || []);
        setPagination(response.data.data.pagination || pagination);
      } else {
        toast.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Error loading transactions");
    } finally {
      setLoading(false);
    }
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

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "captured" || statusLower === "authorized") {
      return "bg-green-100 text-green-700";
    }
    if (statusLower === "failed") {
      return "bg-red-100 text-red-700";
    }
    if (statusLower === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  const getPaymentMethodIcon = (method) => {
    const methodLower = method?.toLowerCase() || "";
    if (methodLower.includes("upi")) return "📱";
    if (methodLower.includes("card")) return "💳";
    if (methodLower.includes("netbanking")) return "🏦";
    if (methodLower.includes("wallet")) return "👛";
    return "💵";
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">View and manage all payment transactions</p>
        </div>
        <Link
          href="/admin/payments"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by payment ID..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="captured">Captured</option>
            <option value="authorized">Authorized</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={filters.payment_method}
            onChange={(e) => setFilters({ ...filters, payment_method: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Methods</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Netbanking</option>
            <option value="wallet">Wallet</option>
          </select>

          <input
            type="text"
            placeholder="Order ID"
            value={filters.order_id}
            onChange={(e) => setFilters({ ...filters, order_id: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            placeholder="Start Date"
            value={filters.start_date}
            onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="End Date"
            value={filters.end_date}
            onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setFilters({
                search: "",
                status: "",
                payment_method: "",
                user_id: "",
                order_id: "",
                start_date: "",
                end_date: ""
              });
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No transactions found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Payment ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Method</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {txn.razorpay_payment_id?.substring(0, 20) || txn.id}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{txn.user_name || "N/A"}</div>
                          <div className="text-gray-500 text-xs">{txn.user_email || ""}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(txn.amount || 0)}
                        </div>
                        {txn.amount_refunded > 0 && (
                          <div className="text-xs text-red-600">
                            Refunded: {formatCurrency(txn.amount_refunded)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getPaymentMethodIcon(txn.payment_method)}</span>
                          <span className="text-sm text-gray-700 capitalize">
                            {txn.payment_method || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(txn.status)}`}>
                          {txn.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          {txn.order_id_ref ? (
                            <Link
                              href={`/admin/orders`}
                              className="text-blue-600 hover:underline"
                            >
                              #{txn.order_id_ref}
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(txn.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/payments/transactions/${txn.id}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * pagination.limit) + 1} to{" "}
                  {Math.min(currentPage * pagination.limit, pagination.total)} of{" "}
                  {pagination.total} transactions
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
