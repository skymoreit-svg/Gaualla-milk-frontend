"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  AlertCircle
} from "lucide-react";
import axios from "axios";
import { baseurl, imageurl } from "../../components/utlis/apis";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

// Enable credentials
axios.defaults.withCredentials = true;

const OrderDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id;
  const { info } = useSelector((state) => state.user);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!info?.success) {
      router.push("/login");
      return;
    }
    if (orderId) {
      fetchOrder();
    }
  }, [orderId, info]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseurl}/order/getsingleorder/${orderId}`, {
        withCredentials: true
      });

      if (response.data.success && response.data.order) {
        setOrder(response.data.order);
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
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "completed") {
      return { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle };
    }
    if (statusLower === "processing" || statusLower === "out for_delivery") {
      return { bg: "bg-blue-100", text: "text-blue-700", icon: Truck };
    }
    if (statusLower === "pending") {
      return { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock };
    }
    if (statusLower === "failed" || statusLower === "cancelled") {
      return { bg: "bg-red-100", text: "text-red-700", icon: XCircle };
    }
    return { bg: "bg-gray-100", text: "text-gray-700", icon: Package };
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusLower = paymentStatus?.toLowerCase() || "";
    if (statusLower === "paid") {
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
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The order you're looking for doesn't exist."}</p>
          <Link
            href="/orders"
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/orders"
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
              <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold ${statusBadge.bg} ${statusBadge.text}`}>
                <StatusIcon className="w-4 h-4" />
                {order.status || "Pending"}
              </span>
              <span className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${getPaymentStatusBadge(order.payment_status)}`}>
                {order.payment_status || "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Support Banner */}
        {(order.payment_status === "failed" || order.payment_status === "pending") && (
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 mb-6 text-white">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Payment Issue? Contact Support</h3>
                <p className="text-orange-100 mb-4">
                  If you've made the payment but it's showing as pending or failed, please contact our support team with your Payment ID.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-orange-100">Phone</p>
                      <a href="tel:+91 8378-000052
" className="text-lg font-semibold hover:underline">
                        +91 8378-000052
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-orange-100">Email</p>
                      <a href="mailto:gauallamilkpvtltd@gmail.com" className="text-lg font-semibold hover:underline">
                        gauallamilkpvtltd@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                              src={`${imageurl}/${firstImage}`}
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

            {/* Delivery Address */}
            {order.address && (
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </h2>
                <div className="text-gray-700">
                  <p className="font-semibold mb-2">
                    {order.address.first_name} {order.address.last_name}
                  </p>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state} {order.address.zip_code}
                  </p>
                  <p>{order.address.country}</p>
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
                  <span>{formatCurrency(order.total_amount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(order.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Support Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Need Help?
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-blue-100 mb-1">Phone Support</p>
                  <a href="tel:+91 8378-000052
" className="text-lg font-semibold hover:underline block">
                    +91 8378-000052

                  </a>
                </div>
                <div>
                  <p className="text-blue-100 mb-1">Email Support</p>
                  <a href="mailto:gauallamilkpvtltd@gmail.com" className="text-lg font-semibold hover:underline block">
                    gauallamilkpvtltd@gmail.com
                  </a>
                </div>
                <div className="pt-3 border-t border-white/20">
                  <p className="text-blue-100">Support Hours</p>
                  <p className="font-semibold">9 AM - 6 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
