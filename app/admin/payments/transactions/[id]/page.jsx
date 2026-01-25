"use client";
import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  RefreshCw, 
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  CreditCard,
  User,
  Package,
  AlertCircle
} from "lucide-react";
import axios from "axios";
import { adminurl } from "../../../adminCompo/adminapis";
import toast from "react-hot-toast";
import Link from "next/link";
import { useParams } from "next/navigation";

const TransactionDetailPage = () => {
  const params = useParams();
  const transactionId = params.id;
  const [transaction, setTransaction] = useState(null);
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (transactionId) {
      fetchTransactionDetails();
    }
  }, [transactionId]);

  const fetchTransactionDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${adminurl}/payments/transactions/${transactionId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setTransaction(response.data.data.transaction);
        setRefunds(response.data.data.refunds || []);
      } else {
        toast.error("Failed to fetch transaction details");
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      toast.error("Error loading transaction details");
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
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
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

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Transaction not found</p>
          <Link
            href="/admin/payments/transactions"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Back to Transactions
          </Link>
        </div>
      </div>
    );
  }

  const availableForRefund = (transaction.amount || 0) - (transaction.amount_refunded || 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/payments/transactions"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Transactions
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
        <p className="text-gray-600 mt-1">View complete transaction information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Info */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Payment ID</label>
                  <p className="text-sm font-mono text-gray-900 mt-1">{transaction.razorpay_payment_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Order ID (Razorpay)</label>
                  <p className="text-sm font-mono text-gray-900 mt-1">{transaction.razorpay_order_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(transaction.status)}`}>
                      {transaction.status || "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Captured</label>
                  <p className="text-sm text-gray-900 mt-1">
                    {transaction.captured ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Yes
                      </span>
                    ) : (
                      <span className="text-gray-600">No</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Payment Method</label>
                  <p className="text-sm text-gray-900 mt-1 capitalize">{transaction.payment_method || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Currency</label>
                  <p className="text-sm text-gray-900 mt-1">{transaction.currency || "INR"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Created At</label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(transaction.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Updated At</label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(transaction.updated_at)}</p>
                </div>
              </div>

              {transaction.vpa && (
                <div>
                  <label className="text-sm font-medium text-gray-600">UPI VPA</label>
                  <p className="text-sm text-gray-900 mt-1">{transaction.vpa}</p>
                </div>
              )}

              {transaction.bank && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Bank</label>
                  <p className="text-sm text-gray-900 mt-1">{transaction.bank}</p>
                </div>
              )}

              {transaction.wallet && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Wallet</label>
                  <p className="text-sm text-gray-900 mt-1">{transaction.wallet}</p>
                </div>
              )}

              {transaction.error_code && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <label className="text-sm font-medium text-red-700">Error Details</label>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-red-600">Code: {transaction.error_code}</p>
                    {transaction.error_description && (
                      <p className="text-sm text-red-600">Description: {transaction.error_description}</p>
                    )}
                    {transaction.error_reason && (
                      <p className="text-sm text-red-600">Reason: {transaction.error_reason}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Refunds Section */}
          {refunds.length > 0 && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Refunds</h2>
              <div className="space-y-4">
                {refunds.map((refund) => (
                  <div key={refund.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-mono text-gray-900">{refund.razorpay_refund_id || refund.id}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(refund.created_at)}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(refund.status)}`}>
                        {refund.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(refund.amount)}</p>
                      {refund.notes && (
                        <p className="text-sm text-gray-600 mt-1">{refund.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Amount Summary */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Amount Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Transaction Amount</span>
                <span className="text-sm font-bold text-gray-900">{formatCurrency(transaction.amount || 0)}</span>
              </div>
              {transaction.amount_refunded > 0 && (
                <div className="flex justify-between text-red-600">
                  <span className="text-sm">Refunded</span>
                  <span className="text-sm font-bold">-{formatCurrency(transaction.amount_refunded)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-sm font-medium text-gray-900">Available for Refund</span>
                <span className="text-sm font-bold text-gray-900">{formatCurrency(availableForRefund)}</span>
              </div>
              {transaction.fee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span className="text-sm">Processing Fee</span>
                  <span className="text-sm">{formatCurrency(transaction.fee)}</span>
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          {transaction.user_name && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">User Information</h2>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-sm text-gray-900 mt-1">{transaction.user_name}</p>
                </div>
                {transaction.user_email && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-sm text-gray-900 mt-1">{transaction.user_email}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Info */}
          {transaction.order_id_ref && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">Order ID</label>
                  <p className="text-sm text-gray-900 mt-1">
                    <Link
                      href={`/admin/orders`}
                      className="text-blue-600 hover:underline"
                    >
                      #{transaction.order_id_ref}
                    </Link>
                  </p>
                </div>
                {transaction.order_amount && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Order Amount</label>
                    <p className="text-sm text-gray-900 mt-1">{formatCurrency(transaction.order_amount)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          {availableForRefund > 0 && transaction.status === "captured" && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
              <Link
                href={`/admin/payments/refunds?payment_id=${transaction.razorpay_payment_id}`}
                className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition"
              >
                Create Refund
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
