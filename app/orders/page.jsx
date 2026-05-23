"use client";
import React, { useState, useEffect } from "react";
import { 
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
  ShoppingBag
} from "lucide-react";
import axios from "axios";
import { baseurl, imageurl } from "../components/utlis/apis";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

// Enable credentials
axios.defaults.withCredentials = true;

const OrdersPage = () => {
  const router = useRouter();
  const { info } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // Redirect to login if not authenticated (no info and no token)
    if (!info?.success && !token) {
      router.push("/login");
      return;
    }
    
    // Only fetch orders if we have at least a token or info
    if (info?.success || token) {
      fetchOrders();
    }
  }, [info]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseurl}/order/getorder`, {
        withCredentials: true
      });

      if (response.data.success) {
        setOrders(response.data.orders || []);
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
    if (statusLower === "completed") {
      return { bg: "bg-[var(--primary)]/10", text: "text-[var(--primary)]", icon: CheckCircle };
    }
    if (statusLower === "processing" || statusLower === "out_for_delivery") {
      return { bg: "bg-primary", text: "text-primary", icon: Truck };
    }
    if (statusLower === "pending") {
      return { bg: "bg-yellow-100", text: "text-highlight", icon: Clock };
    }
    if (statusLower === "failed" || statusLower === "cancelled") {
      return { bg: "bg-red-100", text: "text-red-700", icon: XCircle };
    }
    return { bg: "bg-background00", text: "text-text", icon: Package };
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusLower = paymentStatus?.toLowerCase() || "";
    if (statusLower === "paid") {
      return "bg-[var(--primary)]/10 text-[var(--primary)]";
    }
    if (statusLower === "pending") {
      return "bg-yellow-100 text-highlight";
    }
    if (statusLower === "failed") {
      return "bg-red-100 text-red-700";
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
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mb-4"></div>
          <p className="text-text">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">My Orders</h1>
          <p className="text-text">View and track all your orders</p>
        </div>

        {/* Contact Support Section */}
         <div className="bg-[var(--primary)] rounded-lg p-6 mb-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Need Help? Contact Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-background/20 p-3 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-200">Phone</p>
                <a href="tel:+91 8378-000052" className="text-lg font-semibold hover:underline">
                  +91 8378-000052
                </a>
              </div>
            </div>
             <div className="flex items-center gap-3">
              <div className="bg-background/20 p-3 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-200">Email</p>
                <a href="mailto:gauallamilkpvtltd@gmail.com" className="text-lg font-semibold hover:underline">
                  gauallamilkpvtltd@gmail.com
                </a>
              </div>
            </div>
             <div className="flex items-center gap-3">
              <div className="bg-background/20 p-3 rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-200">Support Hours</p>
                <p className="text-lg font-semibold">9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-background rounded-lg shadow p-12 text-center">
            <Package className="w-16 h-16 text-gray-[#252729b8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">No Orders Yet</h3>
            <p className="text-text mb-6">You haven't placed any orders yet.</p>
             <Link
              href="/"
              className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[#4a2917] transition shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusBadge = getStatusBadge(order.status);
              const StatusIcon = statusBadge.icon;
              const orderImages = parseImages(order.items?.[0]?.product_image);

              return (
                <div key={order.id} className="bg-background rounded-lg shadow border border-highlight overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-background px-6 py-4 border-b border-highlight">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-text">Order #{order.id}</h3>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.text}`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.status || "Pending"}
                          </span>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getPaymentStatusBadge(order.payment_status)}`}>
                            {order.payment_status || "Pendsing"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(order.created_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            {formatCurrency(order.total_amount)}
                          </div>
                        </div>
                      </div>
                       <Link
                        href={`/orders/${order.id}`}
                        className="text-[var(--primary)] hover:text-[#4a2917] font-bold text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => {
                          const itemImages = parseImages(item.product_image);
                          const firstImage = itemImages.length > 0 ? itemImages[0] : null;

                          return (
                            <div key={index} className="flex gap-4 pb-4 border-b border-highlight last:border-0">
                              {firstImage && (
                                <div className="w-20 h-20 flex-shrink-0">
                                  <img
                                    src={`${imageurl}/${firstImage}`}
                                    alt={item.product_name || "Product"}
                                    className="w-full h-full object-cover rounded-lg border border-highlight"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h4 className="font-semibold text-text mb-1">
                                  {item.product_name || "Product"}
                                  {item.variant_name && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)]">
                                      {item.variant_name}
                                    </span>
                                  )}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-text">
                                  <span>Qty: {item.quantity}</span>
                                  <span>Price: {formatCurrency(item.price)}</span>
                                  <span className="font-semibold text-text">
                                    Total: {formatCurrency(item.price * item.quantity)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-700">No items found</p>
                      )}
                    </div>

                    {/* Delivery Address */}
                    {order.address && (
                      <div className="mt-6 pt-6 border-t border-highlight">
                        <h4 className="font-semibold text-text mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Delivery Address
                        </h4>
                        <p className="text-sm text-text">
                          {order.address.first_name} {order.address.last_name}
                          <br />
                          {order.address.street}
                          <br />
                          {order.address.city}, {order.address.state} {order.address.zip_code}
                          <br />
                          {order.address.country}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
