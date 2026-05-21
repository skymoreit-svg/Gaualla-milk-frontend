"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  User,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  Edit3,
  Save,
  X
} from "lucide-react";
import axios from "axios";
import { adminurl, adminimg } from "../../adminCompo/adminapis";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import OrderMapModal from "../../adminCompo/OrderMapModal";
import AssignRiderModal from "../../adminCompo/AssignRiderModal";

// Enable credentials
axios.defaults.withCredentials = true;

const OrderDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingPaymentStatus, setIsEditingPaymentStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newPaymentStatus, setNewPaymentStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);


  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${adminurl}/orders/${orderId}`, {
        withCredentials: true
      });

      if (response.data.success && response.data.order) {
        setOrder(response.data.order);
        setNewStatus(response.data.order.status);
        setNewPaymentStatus(response.data.order.payment_status);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      setSaving(true);
      const response = await axios.put(
        `${adminurl}/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Order status updated successfully!");
        setIsEditingStatus(false);
        fetchOrder(); // Refresh order data
      } else {
        toast.error("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(err.response?.data?.message || "Failed to update order status");
    } finally {
      setSaving(false);
    }
  };

  const handlePaymentStatusUpdate = async () => {
    try {
      setSaving(true);
      const response = await axios.put(
        `${adminurl}/orders/${orderId}/payment-status`,
        { payment_status: newPaymentStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Payment status updated successfully!");
        setIsEditingPaymentStatus(false);
        fetchOrder(); // Refresh order data
      } else {
        toast.error("Failed to update payment status");
      }
    } catch (err) {
      console.error("Error updating payment status:", err);
      toast.error(err.response?.data?.message || "Failed to update payment status");
    } finally {
      setSaving(false);
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
    });
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower === "completed") {
      return { bg: "bg-green-100", text: "text-accent", icon: CheckCircle };
    }
    if (statusLower.includes("delivery") || statusLower.includes("out")) {
      return { bg: "bg-primary", text: "text-primary", icon: Truck };
    }
    if (statusLower === "processing") {
      return { bg: "bg-primary", text: "text-primary", icon: Clock };
    }
    if (statusLower === "pending") {
      return { bg: "bg-yellow-100", text: "text-highlight", icon: Clock };
    }
    if (statusLower === "cancelled") {
      return { bg: "bg-red-100", text: "text-red-700", icon: XCircle };
    }
    return { bg: "bg-background00", text: "text-text", icon: Package };
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusLower = (paymentStatus || "").toLowerCase();
    if (statusLower === "paid") {
      return "bg-green-100 text-accent";
    }
    if (statusLower === "pending") {
      return "bg-yellow-100 text-highlight";
    }
    if (statusLower === "failed") {
      return "bg-red-100 text-red-700";
    }
    if (statusLower === "refunded") {
      return "bg-orange-100 text-highlight";
    }
    return "bg-background00 text-text";
  };

  const parseImages = (images) => {
    if (!images) return [];
    try {
      if (typeof images === "string") {
        return JSON.parse(images);
      }
      return Array.isArray(images) ? images : [];
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-text">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center bg-background rounded-lg shadow p-8 max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text mb-2">Order Not Found</h2>
          <p className="text-text mb-6">{error || "The order you're looking for doesn't exist."}</p>
          <Link
            href="/admin/orders"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary transition"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(order.status);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-text hover:text-text mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text">Order #{order.id}</h1>
              <p className="text-text mt-1">Order placed on {formatDate(order.created_at)}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {!isEditingStatus ? (
                  <>
                    <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold ${statusBadge.bg} ${statusBadge.text}`}>
                      <StatusIcon className="w-4 h-4" />
                      {order.status || "Pending"}
                    </span>
                    <button
                      onClick={() => setIsEditingStatus(true)}
                      className="p-2 text-text hover:text-primary transition"
                      title="Edit Status"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="px-3 py-2 border border-highlight rounded-lg text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="out_for_delivery">Out For Delivery</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={handleStatusUpdate}
                      disabled={saving}
                      className="p-2 text-accent hover:text-accent transition"
                      title="Save"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingStatus(false);
                        setNewStatus(order.status);
                      }}
                      className="p-2 text-red-600 hover:text-red-700 transition"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!isEditingPaymentStatus ? (
                  <>
                    <span className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${getPaymentStatusBadge(order.payment_status)}`}>
                      {order.payment_status || "Pending"}
                    </span>
                    <button
                      onClick={() => setIsEditingPaymentStatus(true)}
                      className="p-2 text-text hover:text-primary transition"
                      title="Edit Payment Status"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <select
                      value={newPaymentStatus}
                      onChange={(e) => setNewPaymentStatus(e.target.value)}
                      className="px-3 py-2 border border-highlight rounded-lg text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                    <button
                      onClick={handlePaymentStatusUpdate}
                      disabled={saving}
                      className="p-2 text-accent hover:text-accent transition"
                      title="Save"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingPaymentStatus(false);
                        setNewPaymentStatus(order.payment_status);
                      }}
                      className="p-2 text-red-600 hover:text-red-700 transition"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => {
                    const itemImages = parseImages(item.product_image);
                    const firstImage = itemImages.length > 0 ? itemImages[0] : null;

                    return (
                      <div key={index} className="flex gap-4 pb-4 border-b border-highlight last:border-0">
                        {firstImage && (
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={`${adminimg}/uploads/${firstImage}`}
                              alt={item.product_name || "Product"}
                              className="w-full h-full object-cover rounded-lg border border-highlight"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-text mb-2">
                            {item.product_name || "Product"}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-text">
                            <div>
                              <span className="font-medium">Quantity:</span> {item.quantity}
                            </div>
                            <div>
                              <span className="font-medium">Unit Price:</span> {formatCurrency(item.price)}
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium">Total:</span>{" "}
                              <span className="font-bold text-text">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-700">No items found</p>
                )}
              </div>
            </div>

            {/* Customer Information */}
            {order.user && (
              <div className="bg-background rounded-lg shadow border border-highlight p-6">
                <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </h2>
                <div className="space-y-2 text-text">
                  <p><span className="font-semibold">Name:</span> {order.user.name || "N/A"}</p>
                  <p><span className="font-semibold">Email:</span> {order.user.email || "N/A"}</p>
                  <p><span className="font-semibold">Phone:</span> {order.user.phone || "N/A"}</p>
                </div>
              </div>
            )}

            {/* Subscription Delivery Schedule & Progress */}
            {order.daily_deliveries_summary && order.daily_deliveries_summary.length > 0 && (
              <div className="bg-background rounded-lg shadow border border-highlight p-6">
                <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Subscription Delivery Schedule & Progress
                </h2>
                
                {/* Overall Progress Tracker */}
                {(() => {
                  const total = order.daily_deliveries_summary.length;
                  const deliveredCount = order.daily_deliveries_summary.filter(d => d.status === "delivered").length;
                  const failedCount = order.daily_deliveries_summary.filter(d => d.status === "failed").length;
                  const processingCount = order.daily_deliveries_summary.filter(d => d.status === "out_for_delivery" || d.status === "processing").length;
                  const pctDelivered = Math.round((deliveredCount / total) * 100) || 0;
                  const pctFailed = Math.round((failedCount / total) * 100) || 0;
                  const pctProcessing = Math.round((processingCount / total) * 100) || 0;

                  return (
                    <div className="mb-6 p-4 rounded-lg bg-background05 border border-highlight/40">
                      <div className="flex justify-between items-center text-sm text-text mb-2 font-semibold">
                        <span>Overall Progress ({deliveredCount}/{total} Delivered)</span>
                        <span className="font-bold text-accent">{pctDelivered}% Completed</span>
                      </div>
                      <div className="w-full bg-background00 rounded-full h-3.5 flex overflow-hidden border border-highlight">
                        <div style={{ width: `${pctDelivered}%` }} className="bg-accent h-full transition-all duration-500" title={`Delivered: ${pctDelivered}%`}></div>
                        <div style={{ width: `${pctProcessing}%` }} className="bg-primary h-full transition-all duration-500" title={`Out for Delivery: ${pctProcessing}%`}></div>
                        <div style={{ width: `${pctFailed}%` }} className="bg-red-500 h-full transition-all duration-500" title={`Failed: ${pctFailed}%`}></div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-xs font-medium">
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-green-50 border border-green-150 text-green-700">
                          <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                          <span>Delivered: {deliveredCount}</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-blue-50 border border-blue-150 text-blue-700">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                          <span>Active: {processingCount}</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-red-50 border border-red-150 text-red-700">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                          <span>Failed: {failedCount}</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-gray-50 border border-gray-150 text-gray-700">
                          <span className="w-2.5 h-2.5 rounded-full bg-highlight"></span>
                          <span>Pending: {total - deliveredCount - failedCount - processingCount}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Grid layout of dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.daily_deliveries_summary.map((item, idx) => {
                    const statusConfig = {
                      delivered: { bg: "bg-green-50/50 border-green-200 text-green-700", icon: CheckCircle, label: "Delivered" },
                      failed: { bg: "bg-red-50/50 border-red-200 text-red-700", icon: XCircle, label: "Failed / Skipped" },
                      out_for_delivery: { bg: "bg-blue-50/50 border-blue-200 text-blue-700", icon: Truck, label: "Out for Delivery" },
                      on_hold: { bg: "bg-orange-50/50 border-orange-200 text-orange-700", icon: Clock, label: "On Hold (Low Balance)" },
                      pending: { bg: "bg-gray-50/50 border-gray-200 text-gray-500", icon: Clock, label: "Pending" }
                    }[item.status] || { bg: "bg-gray-50/50 border-gray-200 text-gray-500", icon: Clock, label: "Pending" };

                    const StatusIcon = statusConfig.icon;

                    return (
                      <div key={idx} className={`p-4 border rounded-lg flex flex-col justify-between transition-all hover:shadow-sm ${statusConfig.bg}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-sm text-text">
                            {new Date(item.date).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              weekday: 'short'
                            })}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                            <StatusIcon className="w-3.5 h-3.5" />
                            {statusConfig.label}
                          </span>
                        </div>
                        {item.assignment ? (
                          <div className="mt-2 text-xs border-t border-highlight pt-2 flex flex-col gap-1 text-text">
                            <div>
                              <span className="font-semibold text-gray-700">Rider:</span> {item.assignment.rider_name || "N/A"}
                            </div>
                            {item.assignment.rider_phone && (
                              <div>
                                <span className="font-semibold text-gray-700">Phone:</span> {item.assignment.rider_phone}
                              </div>
                            )}
                            {item.assignment.delivered_at && (
                              <div>
                                <span className="font-semibold text-gray-700">Time:</span> {new Date(item.assignment.delivered_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-2 text-xs border-t border-highlight pt-2 text-gray-700 italic">
                            No rider assigned
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delivery Address */}
            {order.address && (
              <div className="bg-background rounded-lg shadow border border-highlight p-6 relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-text flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </h2>

                  {order.address.latitude && order.address.longitude && (
                    <button
                      onClick={() => setShowMapModal(true)}
                      className="text-sm bg-primary text-white px-4 py-1.5 rounded-md hover:bg-primary transition"
                    >
                      View on Map
                    </button>
                  )}
                </div>

                {/* Address Details */}
                <div className="text-text">
                  <p className="font-semibold mb-2">
                    {order.address.first_name} {order.address.last_name}
                  </p>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state} {order.address.zip_code}
                  </p>
                  <p>{order.address.country}</p>

                  {order.address.phone && (
                    <p className="mt-2">
                      <span className="font-semibold">Phone:</span> {order.address.phone}
                    </p>
                  )}

                  {(order.address.latitude || order.address.longitude) && (
                    <div className="mt-3 p-3 bg-background border border-highlight rounded-lg">
                      <p className="text-xs uppercase tracking-wide text-gray-700 mb-1">Coordinates</p>
                      <p className="font-mono text-sm text-text break-all">
                        Lat: {order.address.latitude || "N/A"} | Lng: {order.address.longitude || "N/A"}
                      </p>
                    </div>
                  )}


                </div>

                {/* Map Modal */}
                {order.address.latitude && order.address.longitude && (
                  <OrderMapModal
                    isOpen={showMapModal}
                    onClose={() => setShowMapModal(false)}
                    latitude={order.address.latitude}
                    longitude={order.address.longitude}
                    address={order.address}
                  />
                )}
              </div>
            )}

            {/* Transactions */}
            {order.transactions && order.transactions.length > 0 && (
              <div className="bg-background rounded-lg shadow border border-highlight p-6">
                <h2 className="text-xl font-bold text-text mb-4">Payment Transactions</h2>
                <div className="space-y-3">
                  {order.transactions.map((txn, index) => (
                    <div key={index} className="border-b border-highlight pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-text">Payment ID: {txn.razorpay_payment_id}</p>
                          <p className="text-sm text-text">Status: {txn.status}</p>
                          <p className="text-sm text-text">Amount: {formatCurrency(txn.amount || 0)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${txn.captured ? "bg-green-100 text-accent" : "bg-yellow-100 text-highlight"}`}>
                          {txn.captured ? "Captured" : "Authorized"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Refunds */}
            {order.refunds && order.refunds.length > 0 && (
              <div className="bg-background rounded-lg shadow border border-highlight p-6">
                <h2 className="text-xl font-bold text-text mb-4">Refunds</h2>
                <div className="space-y-3">
                  {order.refunds.map((refund, index) => (
                    <div key={index} className="border-b border-highlight pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-text">Refund ID: {refund.razorpay_refund_id}</p>
                          <p className="text-sm text-text">Status: {refund.status}</p>
                          <p className="text-sm text-text">Amount: {formatCurrency(refund.amount || 0)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPaymentStatusBadge(refund.status)}`}>
                          {refund.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <h2 className="text-xl font-bold text-text mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-text">
                  <span>Subtotal</span>
                  <span>{formatCurrency(parseFloat(order.total_amount || 0))}</span>
                </div>
                <div className="flex justify-between text-text">
                  <span>Shipping</span>
                  <span className="text-accent">Free</span>
                </div>
                <div className="border-t border-highlight pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(parseFloat(order.total_amount || 0))}</span>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <h2 className="text-xl font-bold text-text mb-4">Order Information</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-text">Order Type:</span>
                  <p className="text-text capitalize">{order.type || "onetime"}</p>
                </div>
                {order.type === 'alternative' && order.alternative_dates && order.alternative_dates.length > 0 && (
                  <div>
                    <span className="font-semibold text-text">Selected Dates:</span>
                    <div className="text-text mt-2">
                      {order.alternative_dates.map((date, index) => (
                        <p key={index} className="py-1">
                          {new Date(date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-text">Created:</span>
                  <p className="text-text">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <span className="font-semibold text-text">Last Updated:</span>
                  <p className="text-text">{formatDate(order.updated_at)}</p>
                </div>
              </div>
            </div>

            {/* Delivery & Rider Assignment */}
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Delivery
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-text">Delivery Status:</span>
                  <p className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.delivery_status === "delivered" ? "bg-green-100 text-accent" :
                      order.delivery_status === "in_transit" ? "bg-primary text-primary" :
                      order.delivery_status === "unassigned" ? "bg-background00 text-text" :
                      "bg-yellow-100 text-highlight"
                    }`}>
                      {(order.delivery_status || "unassigned").replace(/_/g, " ")}
                    </span>
                  </p>
                </div>
                {order.delivery_otp && (
                  <div>
                    <span className="font-semibold text-text">Delivery OTP:</span>
                    <p className="text-text font-mono text-lg tracking-widest bg-green-50 border border-green-200 rounded px-3 py-1 mt-1 inline-block">{order.delivery_otp}</p>
                    {["daily", "alternative", "weekly", "monthly", "custom_dates"].includes(order.type) && (
                      <p className="text-xs text-gray-500 mt-1 italic">New OTP generated per delivery day</p>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-4">
                {(() => {
                  const isSubscription = ["daily", "alternative", "weekly", "monthly", "custom_dates"].includes(order.type);
                  const todayDelivered = isSubscription && order.delivery_status === "delivered";

                  if (todayDelivered) {
                    return (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                        <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
                          <CheckCircle className="w-4 h-4" />
                          Today&apos;s delivery completed
                        </div>
                        <p className="text-green-600 text-xs">
                          The rider has already delivered this order today. Next delivery will be available after the scheduler runs for the next scheduled date.
                        </p>
                        {order.assigned_rider_id && (
                          <Link href={`/admin/riders/${order.assigned_rider_id}`} className="text-primary hover:underline text-xs mt-2 inline-block">
                            View Rider Profile
                          </Link>
                        )}
                      </div>
                    );
                  }

                  if (!order.delivery_status || order.delivery_status === "unassigned") {
                    return (
                      <button
                        onClick={() => setShowAssignModal(true)}
                        className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent transition text-sm font-medium"
                      >
                        Assign Rider
                      </button>
                    );
                  }

                  return (
                    <div className="text-sm text-text">
                      <p className="font-medium">Rider assigned</p>
                      {order.assigned_rider_id && (
                        <Link href={`/admin/riders/${order.assigned_rider_id}`} className="text-primary hover:underline">
                          View Rider Profile
                        </Link>
                      )}
                    </div>
                  );
                })()}

              </div>
            </div>
          </div>
        </div>
      </div>

      {showAssignModal && (
        <AssignRiderModal
          orderId={parseInt(orderId)}
          onClose={() => setShowAssignModal(false)}
          onAssigned={() => fetchOrder()}
        />
      )}
    </div>
  );
};

export default OrderDetailPage;
