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
      return { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle };
    }
    if (statusLower.includes("delivery") || statusLower.includes("out")) {
      return { bg: "bg-blue-100", text: "text-blue-700", icon: Truck };
    }
    if (statusLower === "processing") {
      return { bg: "bg-purple-100", text: "text-purple-700", icon: Clock };
    }
    if (statusLower === "pending") {
      return { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock };
    }
    if (statusLower === "cancelled") {
      return { bg: "bg-red-100", text: "text-red-700", icon: XCircle };
    }
    return { bg: "bg-gray-100", text: "text-gray-700", icon: Package };
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusLower = (paymentStatus || "").toLowerCase();
    if (statusLower === "paid") {
      return "bg-green-100 text-green-700";
    }
    if (statusLower === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }
    if (statusLower === "failed") {
      return "bg-red-100 text-red-700";
    }
    if (statusLower === "refunded") {
      return "bg-orange-100 text-orange-700";
    }
    return "bg-gray-100 text-gray-700";
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-lg shadow p-8 max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The order you're looking for doesn't exist."}</p>
          <Link
            href="/admin/orders"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-600 mt-1">Order placed on {formatDate(order.created_at)}</p>
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
                      className="p-2 text-gray-600 hover:text-blue-600 transition"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="out for_delivery">Out For Delivery</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={handleStatusUpdate}
                      disabled={saving}
                      className="p-2 text-green-600 hover:text-green-700 transition"
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
                      className="p-2 text-gray-600 hover:text-blue-600 transition"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                    <button
                      onClick={handlePaymentStatusUpdate}
                      disabled={saving}
                      className="p-2 text-green-600 hover:text-green-700 transition"
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
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => {
                    const itemImages = parseImages(item.product_image);
                    const firstImage = itemImages.length > 0 ? itemImages[0] : null;

                    return (
                      <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                        {firstImage && (
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={`${adminimg}/uploads/${firstImage}`}
                              alt={item.product_name || "Product"}
                              className="w-full h-full object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {item.product_name || "Product"}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Quantity:</span> {item.quantity}
                            </div>
                            <div>
                              <span className="font-medium">Unit Price:</span> {formatCurrency(item.price)}
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium">Total:</span>{" "}
                              <span className="font-bold text-gray-900">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No items found</p>
                )}
              </div>
            </div>

            {/* Customer Information */}
            {order.user && (
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Name:</span> {order.user.name || "N/A"}</p>
                  <p><span className="font-semibold">Email:</span> {order.user.email || "N/A"}</p>
                  <p><span className="font-semibold">Phone:</span> {order.user.phone || "N/A"}</p>
                </div>
              </div>
            )}

            {/* Delivery Address */}
            {order.address && (
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6 relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </h2>

                  {order.address.latitude && order.address.longitude && (
                    <button
                      onClick={() => setShowMapModal(true)}
                      className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
                    >
                      View on Map
                    </button>
                  )}
                </div>

                {/* Address Details */}
                <div className="text-gray-700">
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
                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Coordinates</p>
                      <p className="font-mono text-sm text-gray-800 break-all">
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
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Transactions</h2>
                <div className="space-y-3">
                  {order.transactions.map((txn, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">Payment ID: {txn.razorpay_payment_id}</p>
                          <p className="text-sm text-gray-600">Status: {txn.status}</p>
                          <p className="text-sm text-gray-600">Amount: {formatCurrency(txn.amount || 0)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${txn.captured ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
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
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Refunds</h2>
                <div className="space-y-3">
                  {order.refunds.map((refund, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">Refund ID: {refund.razorpay_refund_id}</p>
                          <p className="text-sm text-gray-600">Status: {refund.status}</p>
                          <p className="text-sm text-gray-600">Amount: {formatCurrency(refund.amount || 0)}</p>
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
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(parseFloat(order.total_amount || 0))}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(parseFloat(order.total_amount || 0))}</span>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Order Type:</span>
                  <p className="text-gray-600 capitalize">{order.type || "onetime"}</p>
                </div>
                {order.type === 'alternative' && order.alternative_dates && order.alternative_dates.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Selected Dates:</span>
                    <div className="text-gray-600 mt-2">
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
                  <span className="font-semibold text-gray-700">Created:</span>
                  <p className="text-gray-600">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Last Updated:</span>
                  <p className="text-gray-600">{formatDate(order.updated_at)}</p>
                </div>
              </div>
            </div>

            {/* Delivery & Rider Assignment */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Delivery
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Delivery Status:</span>
                  <p className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.delivery_status === "delivered" ? "bg-green-100 text-green-700" :
                      order.delivery_status === "in_transit" ? "bg-blue-100 text-blue-700" :
                      order.delivery_status === "unassigned" ? "bg-gray-100 text-gray-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {(order.delivery_status || "unassigned").replace(/_/g, " ")}
                    </span>
                  </p>
                </div>
                {order.delivery_otp && (
                  <div>
                    <span className="font-semibold text-gray-700">Delivery OTP:</span>
                    <p className="text-gray-600 font-mono text-lg">{order.delivery_otp}</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                {(!order.delivery_status || order.delivery_status === "unassigned") ? (
                  <button
                    onClick={() => setShowAssignModal(true)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                  >
                    Assign Rider
                  </button>
                ) : (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Rider assigned</p>
                    {order.assigned_rider_id && (
                      <Link href={`/admin/riders/${order.assigned_rider_id}`} className="text-blue-600 hover:underline">
                        View Rider Profile
                      </Link>
                    )}
                  </div>
                )}
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
