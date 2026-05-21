"use client";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaGreaterThan,
  FaMapMarkerAlt,

  FaHome,
  FaBuilding,
  FaPlus,

  FaExclamationTriangle,
  FaSpinner,
  FaMinus,
  FaWallet,
} from 'react-icons/fa';

import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// ✅ Enable cookies in all requests
axios.defaults.withCredentials = true;
import { baseurl, imageurl } from "./utlis/apis";
import AddressForm from "./AddressForm";
import OtherBanner from "./OtherBanner";
import OrderSuccessModal from "./OrderSuccessModal";

export default function CheckOut() {
  const router = useRouter();
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [isSettingDefault, setIsSettingDefault] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [allAddress, setAllAddress] = useState();
  const [defaultAddress, setDefaultAddressState] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState('one_time');
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderSuccessOpen, setOrderSuccessOpen] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState(null);
  const [subscriptionDuration, setSubscriptionDuration] = useState(1);

  // Date picker states for Alternative Days
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentPickerMonth, setCurrentPickerMonth] = useState(new Date());

  const [wallet, setWallet] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // 'razorpay' or 'wallet'


  const fetchCartItemById = async (id) => {
    try {
      const response = await axios.get(`${baseurl}/cart/${id}`);
      const data = await response.data;
      if (data.success) {
        return data.cart;
      } else {
        setError(data.message || 'Failed to fetch order details');
        return null;
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError('An error occurred while fetching order details. Please try again.');
      return null;
    } finally {
      // caller controls loading
    }
  };

  const fetchOrderItems = async (ids) => {
    try {
      setOrderLoading(true);
      setError('');
      const cleanIds = (Array.isArray(ids) ? ids : [])
        .map((x) => String(x ?? '').trim())
        .filter(Boolean);

      if (cleanIds.length === 0) {
        setOrderItems([]);
        setError('No order details available.');
        return;
      }

      const items = await Promise.all(cleanIds.map((id) => fetchCartItemById(id)));
      const okItems = items.filter(Boolean);
      setOrderItems(okItems);

      // If multiple items selected, force one-time purchase for now.
      if (okItems.length > 1) {
        setSelectedFrequency('one_time');
        setSubscriptionDuration(1);
      }
    } finally {
      setOrderLoading(false);
    }
  };
  const fetchaddress = async () => {

    setLoading(true)
    const response = await axios.get(`${baseurl}/address/get`)
    const data = await response.data;
    if (data.success) {
      setAllAddress(data.addresses)
      const defaultAddr = data.addresses.find(addr => addr.is_default === 1);

      if (defaultAddr) {
        setDefaultAddressState(defaultAddr.id)
      }
    }

    setLoading(false)
  }






  const { info, isLoading: userLoading } = useSelector((state) => state.user);

  const fetchWallet = async () => {
    try {
      const response = await axios.get(`${baseurl}/wallet/info`);
      if (response.data.success) {
        setWallet(response.data.wallet);
      }
    } catch (err) {
      console.error("Error fetching wallet:", err);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("accessToken");
    if (!userLoading && !info?.success && !token) {
      router.push("/login");
      return;
    }

    if (!userLoading && (info?.success || token)) {
      fetchWallet();
    }

    // client-only
    let ids = [];
    try {
      const multiRaw = localStorage.getItem("buyitems");
      if (multiRaw) {
        const parsed = JSON.parse(multiRaw);
        if (Array.isArray(parsed)) ids = parsed;
      }
    } catch {
      // ignore malformed buyitems
    }

    if (!ids.length) {
      const single = localStorage.getItem("buyitem");
      if (single) ids = [single];
    }

    if (!ids.length && !userLoading) {
      router.push("/");
    } else {
      fetchOrderItems(ids);
      fetchaddress()
    }
  }, [router, info, userLoading]);

  const subtotal = useMemo(() => {
    return (Array.isArray(orderItems) ? orderItems : []).reduce((sum, item) => {
      const qty = Number(item?.quantity ?? 1);
      const unit = Number(item?.cart_price ?? 0);
      const lineTotal =
        item?.total_price != null
          ? Number(item.total_price)
          : unit * (Number.isFinite(qty) && qty > 0 ? qty : 1);
      return sum + (Number(lineTotal) || 0);
    }, 0);
  }, [orderItems]);

  const totalToPay = useMemo(() => {
    const singleDayPrice = Number(subtotal || 0);
    if (selectedFrequency === 'alternative' && Array.isArray(selectedDates) && selectedDates.length > 0) {
      return singleDayPrice * selectedDates.length;
    }
    const duration = Number(subscriptionDuration || 1);
    return singleDayPrice * (Number.isFinite(duration) && duration > 0 ? duration : 1);
  }, [subtotal, subscriptionDuration, selectedFrequency, selectedDates.length]);

  // Calendar Helper Functions
  const handleDateSelect = (date) => {
    if (!date) return;
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date < tomorrow) return;

    setSelectedDates((prev) => {
      const exists = prev.some((d) => d.getTime() === date.getTime());
      if (exists) {
        return prev.filter((d) => d.getTime() !== date.getTime());
      }
      return [...prev, date];
    });
  };

  const confirmDates = () => {
    setShowDatePicker(false);
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    return selectedDates.some((d) => d.getTime() === date.getTime());
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentPickerMonth);
    const firstDay = getFirstDayOfMonth(currentPickerMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentPickerMonth.getFullYear(), currentPickerMonth.getMonth(), i));
    }

    return days;
  };







  const handleCancelForm = () => {
    setShowNewAddress(false);
    fetchaddress()

  };

  const handelDefault = async (id) => {
    const response = await axios.get(`${baseurl}/address/update/${id}`)
    const data = await response.data;
    if (data.success) {
      fetchaddress()
    }
  }








  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handlePlaceOrder = async () => {
    if (!defaultAddress) {
      setError("Please select a delivery address");
      return;
    }

    if (paymentMethod === "wallet") {
      if (!wallet || wallet.total_balance < totalToPay) {
        setError("Insufficient wallet balance. Please select another method or recharge.");
        return;
      }

      try {
        setSaving(true);
        setError("");

        const payload = {
          address_id: defaultAddress,
          total_amount: parseFloat(totalToPay).toFixed(2),
          type: selectedFrequency,
          selectedDates: selectedFrequency === 'alternative' ? selectedDates : [],
          cart_items: (Array.isArray(orderItems) ? orderItems : []).map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.cart_price,
          })),
        };

        const { data } = await axios.post(`${baseurl}/order/pay-wallet`, payload, {
          withCredentials: true,
        });

        if (data.success) {
          const orderId = data.order_id || data.order?.id || null;
          setSuccessOrderId(orderId);
          setOrderSuccessOpen(true);
          setOrderItems([]); // Clear items

          // Clear cart
          try {
            await axios.delete(`${baseurl}/cart/clearall`, { withCredentials: true });
          } catch (clearError) {
            console.error("Error clearing cart:", clearError);
          }

          localStorage.removeItem("buyitem");
          localStorage.removeItem("buyitems");
        } else {
          setError(data.message || "Failed to process wallet payment");
        }
      } catch (error) {
        console.error("Wallet order payment error:", error);
        setError(error.response?.data?.message || "Failed to place order using Wallet");
      } finally {
        setSaving(false);
      }
      return;
    }

    const shouldBypassPayment = false; // Forced false to ensure Razorpay opens

    if (shouldBypassPayment) {
      try {
        const payload = {
          address_id: defaultAddress,
          total_amount: parseFloat(totalToPay).toFixed(2),
          type: selectedFrequency,
          cart_items: (Array.isArray(orderItems) ? orderItems : []).map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.cart_price,
          })),
        };

        const { data } = await axios.post(`${baseurl}/order/create-dev`, payload, {
          withCredentials: true,
        });

        if (!data.success) {
          setError(data.message || "Failed to place order in dev mode");
          return;
        }

        const orderId = data.order_id || data.order?.id || null;
        setSuccessOrderId(orderId);
        setOrderSuccessOpen(true);
        setOrderItems([]); // Clear items so they don't show behind modal

        try {
          await axios.delete(`${baseurl}/cart/clearall`, { withCredentials: true });
        } catch (clearError) {
          console.error("Error clearing cart:", clearError);
        }

        localStorage.removeItem("buyitem");
        localStorage.removeItem("buyitems");
        return;
      } catch (error) {
        console.error("Dev bypass order error:", error);
        setError(error.response?.data?.message || "Failed to place order in dev bypass mode");
        return;
      }
    }

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const amountToPay = parseFloat(totalToPay).toFixed(2);
    const amountInRupees = parseFloat(amountToPay); // Convert back to number for backend

    try {
      // 👉 0. Get Razorpay Key from Backend (ensures key matches)
      let razorpayKey;
      try {
        const keyResponse = await axios.get(`${baseurl}/order/key`, { withCredentials: true });
        if (keyResponse.data.success && keyResponse.data.key_id) {
          razorpayKey = keyResponse.data.key_id;
          console.log("✅ Razorpay key fetched from backend");
        } else {
          throw new Error("Failed to get Razorpay key from backend");
        }
      } catch (keyError) {
        console.warn("⚠️ Could not fetch key from backend, using fallback:", keyError);
        razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_RAm3ngY6JIbOzo";
      }

      // 👉 1. Create Order on Backend
      const { data } = await axios.post(`${baseurl}/order/create`, {
        amount: amountInRupees, // Send as number, not string
      }, { withCredentials: true });

      console.log("Order creation response:", data); // Debug log

      if (!data.success || !data.order || !data.order.id) {
        console.error("Invalid order response:", data);
        setError("Failed to create Razorpay order: " + (data.message || "Unknown error"));
        return;
      }

      console.log("✅ Razorpay order created:", data.order.id);
      console.log("Order amount:", data.order.amount, "paise (₹" + (data.order.amount / 100) + ")");

      // Validate order data
      if (!data.order.id || !data.order.amount) {
        console.error("Invalid order data:", data.order);
        setError("Invalid order data received from server.");
        return;
      }

      // 👉 2. Setup Razorpay Options
      // ⚠️ IMPORTANT: When using order_id, DO NOT pass amount - Razorpay uses the amount from the order
      const options = {
        key: razorpayKey,
        // amount: REMOVED - Don't pass amount when using order_id (Razorpay will use order amount)
        currency: "INR", // Optional but recommended for validation
        name: "My Store",
        description: "Order Payment",
        order_id: data.order.id, // ✅ Amount is already set in this order
        handler: async function (response) {
          try {
            console.log("✅ Payment successful, verifying...", response);
            
            // 👉 3. Verify payment
            const verifyRes = await axios.post(`${baseurl}/order/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              address_id: defaultAddress,
              total_amount: amountToPay,
              type: selectedFrequency,
              selectedDates: selectedFrequency === 'alternative' ? selectedDates : [],
              cart_items: (Array.isArray(orderItems) ? orderItems : []).map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.cart_price,
              })),
            });

            if (verifyRes.data.success) {
              const orderId = verifyRes.data.order_id;
              setSuccessOrderId(orderId);
              setOrderSuccessOpen(true);
              setOrderItems([]); // Clear items so they don't show behind modal

              // Clear all cart items from backend
              try {
                await axios.delete(`${baseurl}/cart/clearall`, {
                  withCredentials: true
                });
                console.log("✅ Cart cleared successfully");
              } catch (clearError) {
                console.error("Error clearing cart:", clearError);
              }

              // Clear cart/localStorage if needed
              localStorage.removeItem("buyitem");
              localStorage.removeItem("buyitems");
            } else {
              const orderId = verifyRes.data?.order_id;
              if (orderId) {
                setSuccessOrderId(orderId);
                setOrderSuccessOpen(true);
              } else {
                toast.error("Payment verification failed: " + (verifyRes.data.message || "Unknown error"));
              }
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            const orderId = error.response?.data?.order_id;
            if (orderId) {
              setSuccessOrderId(orderId);
              setOrderSuccessOpen(true);
            } else {
              toast.error("Payment verification failed. Please contact support with Payment ID: " + response.razorpay_payment_id);
            }
          }
        },
        prefill: {
          name: info?.user?.name || "Customer",
          email: info?.user?.email || "",
          contact: info?.user?.phone || "",
        },
        notes: {
          address: "Order address ID: " + defaultAddress,
          user_id: info?.user?.id
        },
        theme: {
          color: "var(--primary)", // Branded brown color
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal closed by user");
            setError("Payment was cancelled. Please try again.");
          }
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
      };

      // Validate that Razorpay is available
      if (!window.Razorpay) {
        setError("Razorpay SDK not loaded. Please refresh the page.");
        return;
      }

      const rzp = new window.Razorpay(options);
      
      // Add error handler for payment failures
      rzp.on('payment.failed', function (response) {
        console.error("❌ Payment failed:", response.error);
        const errorMsg = response.error?.description || response.error?.reason || response.error?.code || "Unknown error";
        setError(`Payment failed: ${errorMsg}`);
        alert(`Payment failed: ${errorMsg}`);
      });

      // Additional event handlers for debugging
      rzp.on('payment.authorized', function(response) {
        console.log("✅ Payment authorized:", response);
      });

      rzp.on('payment.captured', function(response) {
        console.log("✅ Payment captured:", response);
      });

      console.log("🚀 Opening Razorpay checkout with:", {
        key: razorpayKey.substring(0, 12) + "...",
        order_id: data.order.id,
        order_amount: data.order.amount + " paise"
      });
      
      rzp.open();
    } catch (error) {
      console.error(error);
      setError("Something went wrong while placing order");
    }
  };







  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-5 md:px-12 xl:px-32 py-10 lg:py-16">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <FaExclamationTriangle className="mr-2" />
            {error}
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-800 hover:text-red-900"
            >
              &times;
            </button>
          </div>
        )}

        {orderSuccessOpen ? (
          <div className="bg-background p-12 rounded-2xl shadow-xl border border-[var(--primary)]/10 text-center max-w-2xl mx-auto my-10">
             <div className="w-24 h-24 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-text mb-4">Thank You!</h2>
              <p className="text-xl text-text mb-8">Your order has been placed and is being processed.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/orders/'} 
                  className="px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-bold text-lg hover:bg-[#4a2917] transition-all shadow-lg shadow-gray-100"
                >
                  View My Orders
                </button>
                <Link href="/" className="px-8 py-4 border-2 border-highlight text-text rounded-xl font-bold text-lg hover:bg-background transition-all">
                  Back to Home
                </Link>
              </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-y-8">
            <div className="lg:col-span-2">
              <div className="bg-background p-6 rounded-xl shadow-lg border border-highlight">
                <h3 className="text-2xl font-bold text-text border-b pb-4 mb-6 flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-primary" />
                  Delivery Address
                </h3>

                {!showNewAddress ? (
                  <>
                    <button
                      onClick={() => setShowNewAddress(true)}
                      className="mb-6 bg-[var(--primary)] hover:bg-[#4a2917] text-white py-2.5 px-5 rounded-lg transition-colors flex items-center shadow-md hover:shadow-lg"
                    >
                      <FaPlus className="mr-2" /> Add New Address
                    </button>

                    {loading ? (
                      <div className="flex justify-center py-10">
                        <FaSpinner className="animate-spin text-2xl text-primary" />
                      </div>
                    ) : (
                      <div className="address-list">

                        <div className="grid gap-4">
                          {allAddress?.map((addr) => (
                            <div
                              key={addr.id}
                              className={`p-4 rounded-2xl shadow-md border transition 
                ${addr.is_default ? "border-yellow-400 bg-yellow-50" : "border-highlight bg-background"}
              `}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-text">
                                  {addr.address_type === "home" ? (
                                    <FaHome className="text-primary" />
                                  ) : (
                                    <FaBuilding className="text-[var(--primary)]" />
                                  )}
                                  <span className="font-medium capitalize">{addr.address_type}</span>
                                </div>
                                {addr.is_default ? (
                                  <MdOutlineStar className="text-highlight text-xl" />
                                ) : (
                                  <MdOutlineStarBorder onClick={() => handelDefault(addr.id)} className="text-gray-[#252729b8] text-xl cursor-pointer" />
                                )}
                              </div>

                              <p className="mt-2 font-semibold text-text">
                                {addr.first_name} {addr.last_name}
                              </p>
                              <p className="text-text text-sm">{addr.street}, {addr.city}</p>
                              <p className="text-text text-sm">{addr.state}, {addr.zip_code}</p>
                              <p className="text-text text-sm">{addr.country}</p>
                              <p className="text-text mt-1">📞 {addr.phone}</p>
                            </div>
                          ))}
                        </div>


                        {allAddress?.length === 0 && (
                          <div className="text-center py-8 border-2 border-dashed border-highlight rounded-xl">
                            <FaMapMarkerAlt className="text-4xl text-gray-[#252729b8] mx-auto mb-3" />
                            <p className="text-gray-700">No addresses saved yet.</p>
                            <p className="text-gray-[#252729b8] text-sm mt-1">Please add an address to continue with your order.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (

                  <AddressForm

                    onCancel={handleCancelForm}
                  />


                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-background p-6 rounded-xl shadow-lg border border-highlight sticky top-6">
                <h3 className="text-2xl font-bold text-text border-b pb-4 mb-6 flex items-center">
                  Order Summary
                </h3>

                {orderLoading ? (
                  <div className="flex justify-center py-10">
                    <FaSpinner className="animate-spin text-2xl text-primary" />
                  </div>
                ) : orderItems?.length ? (
                  <>
                    <div className="mb-5 pb-4 border-b space-y-4 max-h-[320px] overflow-auto pr-1">
                      {orderItems.map((item) => (
                        <div key={item.cart_id ?? `${item.product_id}-${item.name}`} className="flex items-center">
                          <div className="w-16 h-16 bg-background00 rounded-lg overflow-hidden mr-4 shrink-0">
                            <img
                              src={`${imageurl}/${JSON.parse(item.images)[0]}` || "/img/placeholder-product.webp"}
                              alt={item?.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/img/placeholder-product.webp";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-text truncate">{item?.name}</h4>
                            <p className="text-text text-sm mt-1">Quantity: {item?.quantity}</p>
                          </div>
                          <div className="text-right ml-3">
                            <p className="font-bold text-text">
                              ₹{parseFloat(item?.total_price ?? 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 pb-4 border-b mb-4">
                      <div className="flex justify-between">
                        <span className="text-text">Subtotal</span>
                        <span className="text-text">₹{parseFloat(subtotal || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text">Shipping</span>
                        <span className="text-[var(--primary)] font-medium">Free</span>
                      </div>
                    </div>


                    {orderItems.length > 1 ? (
                      <div className="mb-6">
                        <div className="bg-primary border border-primary rounded-lg py-2 px-4 text-center">
                          <span className="text-primary font-medium">One-time purchase (multiple items)</span>
                        </div>
                      </div>
                    ) : orderItems?.[0]?.one_time ? (
                      <div className="mb-6">
                        <div className="bg-primary border border-primary rounded-lg py-2 px-4 text-center">
                          <span className="text-primary font-medium">One-time purchase</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <p className="text-sm text-text mb-2">Select purchase option:</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => { setSelectedFrequency('one_time'); setSubscriptionDuration(1); }}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'one_time'
                              ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30'
                              : 'bg-background00 text-text hover:bg-background00'}`}
                          >
                            One Time
                          </button>
                          <button
                            onClick={() => { setSelectedFrequency('daily'); setSubscriptionDuration(30); }}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'daily'
                              ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30'
                              : 'bg-background00 text-text hover:bg-background00'}`}
                          >
                            30 Days
                          </button>
                          <button
                            onClick={() => { setSelectedFrequency('alternative'); setSubscriptionDuration(15); setShowDatePicker(true); }}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'alternative'
                              ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30'
                              : 'bg-background00 text-text hover:bg-background00'}`}
                          >
                            Calendar Schedule
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Payment Method Selector */}
                    <div className="mb-6 border-t pt-4">
                      <p className="text-sm font-semibold text-text mb-3">Choose Payment Method:</p>
                      <div className="space-y-2">
                        {/* Razorpay Option */}
                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-highlight hover:bg-background00'}`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="razorpay"
                            checked={paymentMethod === 'razorpay'}
                            onChange={() => setPaymentMethod('razorpay')}
                            className="text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-text">Debit/Credit Card, UPI, Netbanking</p>
                            <p className="text-xs text-gray-500">Pay securely via Razorpay</p>
                          </div>
                        </label>

                        {/* Wallet Option */}
                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-highlight hover:bg-background00'}`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="wallet"
                            checked={paymentMethod === 'wallet'}
                            onChange={() => setPaymentMethod('wallet')}
                            className="text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-bold text-text">Gaualla Wallet</p>
                              {wallet && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${wallet.total_balance >= totalToPay ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  Bal: ₹{wallet.total_balance.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {wallet ? (
                              <p className="text-xs text-gray-500">
                                Main: ₹{wallet.main_balance.toFixed(2)} | Cashback: ₹{wallet.cashback_balance.toFixed(2)}
                              </p>
                            ) : (
                              <p className="text-xs text-gray-500">Loading wallet balance...</p>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    {paymentMethod === 'wallet' && wallet && wallet.total_balance < totalToPay && (
                      <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-xs font-medium flex flex-col gap-1">
                        <span>⚠️ Insufficient Wallet Balance to place this order (₹{totalToPay.toFixed(2)}).</span>
                        <Link href="/user/profile" className="text-[var(--primary)] hover:underline font-bold mt-1">
                          Go to Profile & Recharge Wallet →
                        </Link>
                      </div>
                    )}

                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-semibold text-text">Total</span>
                      <span className="text-xl font-bold text-text">
                        ₹{parseFloat(totalToPay || 0).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={
                        !defaultAddress || 
                        (selectedFrequency === 'alternative' && selectedDates.length === 0) ||
                        (paymentMethod === 'wallet' && (!wallet || wallet.total_balance < totalToPay))
                      }
                      className="w-full bg-[var(--primary)] hover:bg-black disabled:bg-gray-400 text-white py-3.5 rounded-lg text-lg font-semibold transition-colors shadow-md hover:shadow-lg flex justify-center items-center"
                    >
                      {!defaultAddress ? 'Select Address First' :
                        (selectedFrequency === 'alternative' && selectedDates.length === 0) ? 'Select Dates on Calendar' :
                        (paymentMethod === 'wallet' && (!wallet || wallet.total_balance < totalToPay)) ? 'Insufficient Wallet Balance' :
                        (saving ? <FaSpinner className="animate-spin mr-2" /> : 'Place Order')}
                    </button>
                  </>
                ) : (
                  <p className="text-gray-700 text-center py-8">No order details available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <OrderSuccessModal
        open={orderSuccessOpen}
        orderId={successOrderId}
        onClose={() => setOrderSuccessOpen(false)}
        onViewOrders={() => {
          setOrderSuccessOpen(false);
          window.location.href = '/orders/';
        }}
      />

      {/* DATE PICKER MODAL FOR ALTERNATIVE DAYS - Rendered at document root via portal */}
      {showDatePicker && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="bg-background rounded-xl shadow-2xl max-w-sm w-full p-6" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="text-xl font-bold text-text mb-4">Custom Delivery Schedule</h3>

            {/* Month/Year Navigation */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentPickerMonth(new Date(currentPickerMonth.getFullYear(), currentPickerMonth.getMonth() - 1))}
                className="bg-background00 hover:bg-gray-300 text-text px-3 py-1 rounded"
              >
                ← Prev
              </button>
              <span className="text-text font-semibold text-sm">
                {currentPickerMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setCurrentPickerMonth(new Date(currentPickerMonth.getFullYear(), currentPickerMonth.getMonth() + 1))}
                className="bg-background00 hover:bg-gray-300 text-text px-3 py-1 rounded"
              >
                Next →
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-[10px] font-bold text-text">
                  {day}
                </div>
              ))}
              {generateCalendarDays().map((date, idx) => {
                const tomorrow = new Date();
                tomorrow.setHours(0, 0, 0, 0);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const isPastOrToday = date && date < tomorrow;
                return (
                  <button
                    key={idx}
                    onClick={() => date && handleDateSelect(date)}
                    disabled={!date || isPastOrToday}
                    className={`p-2 rounded text-xs font-medium transition-colors ${!date
                      ? 'text-gray-600 cursor-default'
                      : isDateSelected(date)
                        ? 'bg-[var(--primary)] text-white'
                        : isPastOrToday
                          ? 'text-gray-[#252729b8] cursor-not-allowed opacity-50'
                          : 'bg-background00 text-text hover:bg-[var(--primary)]/10'
                      }`}
                  >
                    {date ? date.getDate() : ''}
                  </button>
                );
              })}
            </div>

            {/* Selected Dates Display */}
            {selectedDates && selectedDates.length > 0 ? (
              <div className="bg-[var(--primary)]/5 p-3 rounded-lg mb-4 max-h-[120px] overflow-y-auto">
                <p className="text-xs text-[var(--primary)] font-bold mb-1">Selected Dates ({selectedDates.length}):</p>
                <div className="flex flex-wrap gap-1">
                  {selectedDates
                    .slice()
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((d) => (
                      <span key={d.getTime()} className="text-[10px] bg-background px-2 py-1 rounded border border-[var(--primary)]/20 text-[var(--primary)]">
                        {d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    ))}
                </div>
              </div>
            ) : (
              <div className="bg-background p-3 rounded-lg mb-4 text-center">
                <p className="text-xs text-gray-700 font-medium italic">No dates selected yet</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowDatePicker(false);
                  setSelectedDates([]);
                }}
                className="flex-1 bg-background00 hover:bg-background00 text-text py-2.5 rounded-lg text-sm font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDates}
                disabled={selectedDates.length === 0}
                className="flex-1 bg-[var(--primary)] hover:bg-black disabled:bg-gray-300 text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
        , document.body)}
    </div>
  );
}
