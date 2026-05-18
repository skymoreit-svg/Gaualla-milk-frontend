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
      return "bg-green-100 text-accent";
    }
    if (statusLower === "failed") {
      return "bg-red-100 text-red-700";
    }
    if (statusLower === "pending") {
      return "bg-yellow-100 text-highlight";
    }
    return "bg-background00 text-text";
  };

  if (loading) {
    return (
      <div className="p-8 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-text">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-[#252729b8] mx-auto mb-4" />
          <p className="text-text">Transaction not found</p>
          <Link
            href="/admin/payments/transactions"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Back to Transactions
          </Link>
        </div>
      </div>
    );
  }

  const availableForRefund = (transaction.amount || 0) - (transaction.amount_refunded || 0);

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/payments/transactions"
          className="inline-flex items-center gap-2 text-text hover:text-text mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Transactions
        </Link>
        <h1 className="text-3xl font-bold text-text">Transaction Details</h1>
        <p className="text-text mt-1">View complete transaction information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Info */}
          <div className="bg-background rounded-lg shadow border border-highlight p-6">
            <h2 className="text-xl font-bold text-text mb-4">Transaction Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text">Payment ID</label>
                  <p className="text-sm font-mono text-text mt-1">{transaction.razorpay_payment_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Order ID (Razorpay)</label>
                  <p className="text-sm font-mono text-text mt-1">{transaction.razorpay_order_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(transaction.status)}`}>
                      {transaction.status || "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Captured</label>
                  <p className="text-sm text-text mt-1">
                    {transaction.captured ? (
                      <span className="text-accent flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Yes
                      </span>
                    ) : (
                      <span className="text-text">No</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Payment Method</label>
                  <p className="text-sm text-text mt-1 capitalize">{transaction.payment_method || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Currency</label>
                  <p className="text-sm text-text mt-1">{transaction.currency || "INR"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Created At</label>
                  <p className="text-sm text-text mt-1">{formatDate(transaction.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Updated At</label>
                  <p className="text-sm text-text mt-1">{formatDate(transaction.updated_at)}</p>
                </div>
              </div>

              {transaction.vpa && (
                <div>
                  <label className="text-sm font-medium text-text">UPI VPA</label>
                  <p className="text-sm text-text mt-1">{transaction.vpa}</p>
                </div>
              )}

              {transaction.bank && (
                <div>
                  <label className="text-sm font-medium text-text">Bank</label>
                  <p className="text-sm text-text mt-1">{transaction.bank}</p>
                </div>
              )}

              {transaction.wallet && (
                <div>
                  <label className="text-sm font-medium text-text">Wallet</label>
                  <p className="text-sm text-text mt-1">{transaction.wallet}</p>
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
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <h2 className="text-xl font-bold text-text mb-4">Refunds</h2>
              <div className="space-y-4">
                {refunds.map((refund) => (
                  <div key={refund.id} className="border border-highlight rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-mono text-text">{refund.razorpay_refund_id || refund.id}</p>
                        <p className="text-xs text-gray-700 mt-1">{formatDate(refund.created_at)}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(refund.status)}`}>
                        {refund.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-lg font-bold text-text">{formatCurrency(refund.amount)}</p>
                      {refund.notes && (
                        <p className="text-sm text-text mt-1">{refund.notes}</p>
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
          <div className="bg-background rounded-lg shadow border border-highlight p-6">
            <h2 className="text-xl font-bold text-text mb-4">Amount Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-text">Transaction Amount</span>
                <span className="text-sm font-bold text-text">{formatCurrency(transaction.amount || 0)}</span>
              </div>
              {transaction.amount_refunded > 0 && (
                <div className="flex justify-between text-red-600">
                  <span className="text-sm">Refunded</span>
                  <span className="text-sm font-bold">-{formatCurrency(transaction.amount_refunded)}</span>
                </div>
              )}
              <div className="border-t border-highlight pt-3 flex justify-between">
                <span className="text-sm font-medium text-text">Available for Refund</span>
                <span className="text-sm font-bold text-text">{formatCurrency(availableForRefund)}</span>
              </div>
              {transaction.fee > 0 && (
                <div className="flex justify-between text-text">
                  <span className="text-sm">Processing Fee</span>
                  <span className="text-sm">{formatCurrency(transaction.fee)}</span>
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          {transaction.user_name && (
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <h2 className="text-xl font-bold text-text mb-4">User Information</h2>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-text">Name</label>
                  <p className="text-sm text-text mt-1">{transaction.user_name}</p>
                </div>
                {transaction.user_email && (
                  <div>
                    <label className="text-sm font-medium text-text">Email</label>
                    <p className="text-sm text-text mt-1">{transaction.user_email}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Info */}
          {transaction.order_id_ref && (
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <h2 className="text-xl font-bold text-text mb-4">Order Information</h2>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-text">Order ID</label>
                  <p className="text-sm text-text mt-1">
                    <Link
                      href={`/admin/orders`}
                      className="text-primary hover:underline"
                    >
                      #{transaction.order_id_ref}
                    </Link>
                  </p>
                </div>
                {transaction.order_amount && (
                  <div>
                    <label className="text-sm font-medium text-text">Order Amount</label>
                    <p className="text-sm text-text mt-1">{formatCurrency(transaction.order_amount)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          {availableForRefund > 0 && transaction.status === "captured" && (
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <h2 className="text-xl font-bold text-text mb-4">Actions</h2>
              <Link
                href={`/admin/payments/refunds?payment_id=${transaction.razorpay_payment_id}`}
                className="block w-full px-4 py-2 bg-primary text-white text-center rounded-lg hover:bg-primary transition"
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
