"use client";
import React, { useState, useEffect } from "react";
import { 
  Search, 
  RefreshCw, 
  Plus,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  DollarSign
} from "lucide-react";
import axios from "axios";
import { adminurl } from "../../adminCompo/adminapis";
import toast from "react-hot-toast";
import Link from "next/link";

const RefundsPage = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, limit: 50, offset: 0 });
  const [filters, setFilters] = useState({
    status: "",
    transaction_id: "",
    order_id: "",
    start_date: "",
    end_date: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    payment_id: "",
    amount: "",
    speed: "normal",
    notes: "",
    receipt: ""
  });

  useEffect(() => {
    fetchRefunds();
  }, [currentPage, filters]);

  const fetchRefunds = async () => {
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
        `${adminurl}/payments/refunds?${params.toString()}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setRefunds(response.data.data.refunds || []);
        setPagination(response.data.data.pagination || pagination);
      } else {
        toast.error("Failed to fetch refunds");
      }
    } catch (error) {
      console.error("Error fetching refunds:", error);
      toast.error("Error loading refunds");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRefund = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${adminurl}/payments/refunds/create`,
        createForm,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Refund initiated successfully");
        setShowCreateModal(false);
        setCreateForm({
          payment_id: "",
          amount: "",
          speed: "normal",
          notes: "",
          receipt: ""
        });
        fetchRefunds();
      } else {
        toast.error(response.data.message || "Failed to create refund");
      }
    } catch (error) {
      console.error("Error creating refund:", error);
      toast.error(error.response?.data?.message || "Error creating refund");
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
    if (statusLower === "processed") {
      return "bg-green-100 text-green-700";
    }
    if (statusLower === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }
    if (statusLower === "failed") {
      return "bg-red-100 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Refunds</h1>
          <p className="text-gray-600 mt-1">Manage and process refunds</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Refund
          </button>
          <Link
            href="/admin/payments"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="processed">Processed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <input
            type="text"
            placeholder="Transaction ID"
            value={filters.transaction_id}
            onChange={(e) => setFilters({ ...filters, transaction_id: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Order ID"
            value={filters.order_id}
            onChange={(e) => setFilters({ ...filters, order_id: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              setFilters({
                status: "",
                transaction_id: "",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Refunds Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading refunds...</p>
          </div>
        ) : refunds.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No refunds found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Refund ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Payment ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {refunds.map((refund) => (
                    <tr key={refund.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {refund.razorpay_refund_id?.substring(0, 20) || refund.id}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          {refund.razorpay_payment_id?.substring(0, 20) || "N/A"}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{refund.user_name || "N/A"}</div>
                          <div className="text-gray-500 text-xs">{refund.user_email || ""}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(refund.amount || 0)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(refund.status)}`}>
                          {refund.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          {refund.order_id_ref ? (
                            <Link
                              href={`/admin/orders`}
                              className="text-blue-600 hover:underline"
                            >
                              #{refund.order_id_ref}
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(refund.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/payments/transactions/${refund.transaction_id}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="View Transaction"
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
                  {pagination.total} refunds
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

      {/* Create Refund Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Refund</h2>
            <form onSubmit={handleCreateRefund} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment ID (Razorpay Payment ID) *
                </label>
                <input
                  type="text"
                  required
                  value={createForm.payment_id}
                  onChange={(e) => setCreateForm({ ...createForm, payment_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="pay_xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Amount *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0.01"
                  value={createForm.amount}
                  onChange={(e) => setCreateForm({ ...createForm, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Speed
                </label>
                <select
                  value={createForm.speed}
                  onChange={(e) => setCreateForm({ ...createForm, speed: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="normal">Normal (5-7 days)</option>
                  <option value="optimum">Optimum (3-5 days)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={createForm.notes}
                  onChange={(e) => setCreateForm({ ...createForm, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Refund reason..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receipt Number
                </label>
                <input
                  type="text"
                  value={createForm.receipt}
                  onChange={(e) => setCreateForm({ ...createForm, receipt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Create Refund
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundsPage;
