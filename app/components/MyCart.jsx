"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaMapMarkerAlt, FaHome, FaBuilding, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCartItems } from "../store/cartSlice";
import axios from "axios";
import { baseurl, imageurl } from "./utlis/apis";
import { useRouter } from "next/navigation";
import AddressForm from "./AddressForm";
import toast from "react-hot-toast";
import MapModal from "./MapModal";

// Enable cookies in all requests
axios.defaults.withCredentials = true;

export default function MyCart({ cart, setCart }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Address management states
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [error, setError] = useState('');

  // Order and payment states
  const [selectedFrequency, setSelectedFrequency] = useState('one_time');
  const [subscriptionDuration, setSubscriptionDuration] = useState(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);



  // Map modal states
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapLocation, setMapLocation] = useState(null);



  // Alternative days calendar states
  const [showDatePicker, setShowDatePicker] = useState(false);
  // store selected dates as an array of Date objects
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentPickerMonth, setCurrentPickerMonth] = useState(new Date());
  const [alternativeDaysDuration, setAlternativeDaysDuration] = useState(null);

  // Disable background scrolling when date picker modal is open
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (showDatePicker) {
      // Disable scrolling completely
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [showDatePicker]);




  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      // Reset payment processing state when fetching cart (new items added, cart refreshed)
      setIsProcessingPayment(false);
      setError('');
      const response = await axios.get(`${baseurl}/cart/cartallcart`);
      const data = await response.data;
      if (data.success) {
        const carts = data.carts || [];
        setCartData(carts);
        dispatch(setCartItems(carts));
      } else {
        setCartData([]);
        dispatch(setCartItems([]));
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartData([]);
      dispatch(setCartItems([]));
      // Reset payment state on error too
      setIsProcessingPayment(false);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`${baseurl}/cart/deletecart/${itemId}`);
      const data = await response.data;
      if (data.success) {
        fetchCart();
      } else {
        fetchCart();
      }
    } catch (error) {
      console.error("Error removing item:", error);
      fetchCart();
    }
  };

  const handelcartquentity = async (increment, id) => {
    // 1Optimistic UI update
    setCartData((prev) =>
      prev.map((item) => {
        if (item.cart_id === id) {
          const newQty = increment
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

          return {
            ...item,
            quantity: newQty,
            total_price: newQty * item.cart_price,
          };
        }
        return item;
      })
    );

    // Update backend silently
    try {
      await axios.put(`${baseurl}/cart/updatecart/${id}`, {
        increment,
      });
    } catch (error) {
      console.error("Quantity update failed", error);
      // optional: refetch cart on error
      fetchCart();
    }
  };

  // Fetch addresses
  const fetchaddress = useCallback(async () => {
    setAddressLoading(true);
    try {
      const response = await axios.get(`${baseurl}/address/get`);
      const data = await response.data;
      if (data.success) {
        setAllAddress(data.addresses || []);
        const defaultAddr = data.addresses?.find(addr => addr.is_default === 1);
        if (defaultAddr) {
          setDefaultAddress(defaultAddr.id);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setAddressLoading(false);
    }
  }, []);

  useEffect(() => {
    if (cart) {
      // Reset payment processing state when cart drawer opens
      setIsProcessingPayment(false);
      setError('');
      fetchCart();
      fetchaddress();
    }
  }, [cart, fetchCart, fetchaddress]);


  // Moved useMemo to top level (before any return)
  const { itemCount, derivedSubTotal } = useMemo(() => {
    const items = Array.isArray(cartData) ? cartData : [];
    const totals = items.reduce(
      (acc, item) => {
        const quantity = Number(item?.quantity ?? item?.qnty ?? 1);
        const unitPrice = Number(item?.cart_price ?? item?.price ?? 0);
        const lineTotal =
          item?.total_price != null
            ? Number(item.total_price)
            : unitPrice * (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
        acc.itemCount += quantity || 0;
        acc.subTotal += Number(lineTotal) || 0;
        return acc;
      },
      { itemCount: 0, subTotal: 0 }
    );
    return { itemCount: totals.itemCount, derivedSubTotal: totals.subTotal };
  }, [cartData]);

  const deliveryCharge = 0;
  const handlingCharge = 0;

  // Calculate total to pay.
  // If user selected custom dates in the calendar, those dates override other options
  // and total is `singleDayPrice * selectedDates.length`.
  const totalToPay = useMemo(() => {
    const singleDayPrice = Number(derivedSubTotal || 0);
    if (Array.isArray(selectedDates) && selectedDates.length > 0) {
      return singleDayPrice * selectedDates.length;
    }
    const duration = Number(subscriptionDuration || 1);
    return singleDayPrice * (Number.isFinite(duration) && duration > 0 ? duration : 1);
  }, [derivedSubTotal, subscriptionDuration, selectedDates.length]);

  const grandTotal = totalToPay + deliveryCharge + handlingCharge;
  const hasItems = Array.isArray(cartData) && cartData.length > 0;

  // Set default address
  const handelDefault = async (id) => {
    try {
      const response = await axios.get(`${baseurl}/address/update/${id}`);
      const data = await response.data;
      if (data.success) {
        fetchaddress();
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  // Handle address form cancel
  const handleCancelForm = () => {
    setShowNewAddress(false);
    fetchaddress();
  };

  // Load Razorpay SDK
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle place order with Razorpay
  const handlePlaceOrder = async () => {
    if (!defaultAddress) {
      setError("Please select a delivery address");
      return;
    }

    if (!hasItems) {
      setError("Your cart is empty");
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      setError("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const amountToPay = parseFloat(grandTotal).toFixed(2);
    const amountInRupees = parseFloat(amountToPay);

    try {
      setIsProcessingPayment(true);
      setError('');

      // Get Razorpay Key from Backend
      let razorpayKey;
      try {
        const keyResponse = await axios.get(`${baseurl}/order/key`);
        if (keyResponse.data.success && keyResponse.data.key_id) {
          razorpayKey = keyResponse.data.key_id;
        } else {
          throw new Error("Failed to get Razorpay key from backend");
        }
      } catch (keyError) {
        console.warn("Could not fetch key from backend, using fallback:", keyError);
        razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_RAm3ngY6JIbOzo";
      }

      // Create Order on Backend
      const { data } = await axios.post(`${baseurl}/order/create`, {
        amount: amountInRupees,
      });

      if (!data.success || !data.order || !data.order.id) {
        setError("Failed to create Razorpay order: " + (data.message || "Unknown error"));
        setIsProcessingPayment(false);
        return;
      }

      // Setup Razorpay Options
      const options = {
        key: razorpayKey,
        currency: "INR",
        name: "Gaualla Milk Dairy",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            setIsProcessingPayment(true);
            setError('');

            // Create order with pending status (webhook will confirm payment)
            const verifyRes = await axios.post(`${baseurl}/order/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              address_id: defaultAddress,
              total_amount: amountToPay,
              type: selectedFrequency,
              selectedDates: selectedFrequency === 'alternative' ? selectedDates : [],
              cart_items: (Array.isArray(cartData) ? cartData : []).map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.cart_price,
              })),
            });

            if (verifyRes.data.success && verifyRes.data.order_id) {
              const orderId = verifyRes.data.order_id;

              // Clear cart items immediately after order creation
              try {
                await axios.delete(`${baseurl}/cart/clearall`, {
                  withCredentials: true
                });
                console.log("✅ Cart cleared after order creation");
              } catch (clearError) {
                console.error("Error clearing cart:", clearError);
                // Non-critical error, continue anyway
              }

              // Show success message immediately
              toast.success("✅ Payment received! Confirming order...");
              setError("⏳ Processing payment confirmation... Please wait.");

              // Poll for order status (webhook will update payment_status to 'paid')
              let attempts = 0;
              const maxAttempts = 30; // 30 seconds max wait
              const pollInterval = 1000; // Check every 1 second

              const checkOrderStatus = async () => {
                try {
                  const statusRes = await axios.get(`${baseurl}/order/getsingleorder/${orderId}`);

                  if (statusRes.data.success && statusRes.data.order) {
                    const order = statusRes.data.order;

                    if (order.payment_status === 'paid') {
                      // Webhook confirmed payment - SUCCESS!
                      toast.success("✅ Payment Successful! Your order has been confirmed.");
                      // Clear all cart items from backend
                      try {
                        await axios.delete(`${baseurl}/cart/clearall`, {
                          withCredentials: true
                        });
                        console.log("✅ Cart cleared successfully");
                      } catch (clearError) {
                        console.error("Error clearing cart:", clearError);
                        // Non-critical error, continue anyway
                      }
                      fetchCart();
                      setCart(false);
                      // Redirect to orders page
                      setTimeout(() => {
                        router.push("/orders");
                      }, 1000);
                      return;
                    } else if (order.payment_status === 'failed') {
                      // Payment failed
                      setError("❌ Payment failed. Please try again.");
                      setIsProcessingPayment(false);
                      return;
                    }
                  }

                  // Continue polling if not confirmed yet
                  attempts++;
                  if (attempts < maxAttempts) {
                    setTimeout(checkOrderStatus, pollInterval);
                  } else {
                    // Timeout - order might still be processing
                    toast.success("⏳ Payment is being processed. You will receive a confirmation shortly.");
                    setIsProcessingPayment(false);
                    // Still clear cart and redirect to orders page (order exists, just waiting for webhook)
                    setTimeout(() => {
                      fetchCart();
                      setCart(false);
                      router.push("/orders");
                    }, 2000);
                  }
                } catch (error) {
                  console.error("Error checking order status:", error);
                  attempts++;
                  if (attempts < maxAttempts) {
                    setTimeout(checkOrderStatus, pollInterval);
                  } else {
                    toast.success("✅ Order created! Please check your orders page for status.");
                    setIsProcessingPayment(false);
                    // Redirect to orders page even if status check failed
                    setTimeout(() => {
                      fetchCart();
                      setCart(false);
                      router.push("/orders");
                    }, 2000);
                  }
                }
              };

              // Start polling after a short delay (give webhook time to arrive)
              setTimeout(checkOrderStatus, 2000);
            } else {
              setError("Order creation failed: " + (verifyRes.data.message || "Unknown error"));
              setIsProcessingPayment(false);
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            setError("Payment verification failed. Please contact support with payment ID: " + response.razorpay_payment_id);
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9876543210",
        },
        notes: {
          address: "Order address ID: " + defaultAddress,
        },
        theme: {
          color: "#60BE74",
        },
        modal: {
          ondismiss: function () {
            setError("Payment was cancelled. Please try again.");
          }
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
      };

      if (!window.Razorpay) {
        setError("Razorpay SDK not loaded. Please refresh the page.");
        setIsProcessingPayment(false);
        return;
      }

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        const errorMsg = response.error?.description || response.error?.reason || response.error?.code || "Unknown error";
        setError(`Payment failed: ${errorMsg}`);
        setIsProcessingPayment(false);
        alert(`Payment failed: ${errorMsg}`);
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      setError("Something went wrong while placing order");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Handle date selection for alternative days (toggle individual dates)
  const handleDateSelect = (date) => {
    if (!date) return;
    // keep existing behaviour: prevent selecting past dates
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) return;

    setSelectedDates((prev) => {
      const exists = prev.some((d) => d.getTime() === date.getTime());
      if (exists) {
        return prev.filter((d) => d.getTime() !== date.getTime());
      }
      return [...prev, date];
    });
  };

  const confirmDates = () => {
    // simply close the modal and keep selected dates
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

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentPickerMonth.getFullYear(), currentPickerMonth.getMonth(), i));
    }

    return days;
  };

  // ────────────────────────────────────────────────
  // Now safe to do early returns
  // ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={`${cart ? "translate-y-0" : "translate-y-full"} duration-400 transition-transform fixed inset-0 bg-white z-[9999] overflow-y-auto`}>
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-[#60BE74] mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cartData || cartData.length === 0) {
    return (
      <div className={`${cart ? "translate-y-0" : "translate-y-full"} duration-400 transition-transform fixed inset-0 bg-white z-[9999] overflow-y-auto`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
            <button onClick={() => setCart(false)} className="text-gray-600 hover:text-gray-800 text-2xl cursor-pointer">
              <RxCross2 />
            </button>
          </div>

          <div className="text-center flex flex-col items-center py-20">
            <h2 className="text-3xl font-semibold mb-4">Cart is Empty</h2>
            <p className="text-lg text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/product?name=all"
              onClick={() => setCart(false)}
              className="uppercase font-medium text-base text-white px-8 py-3 rounded-md bg-[#60BE74] hover:bg-[#50b666] transition-all duration-300 shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main render (cart has items) - Full screen experience
  return (
    <div className={`${cart ? "translate-y-0" : "translate-y-full"} duration-400 transition-transform fixed inset-0 bg-gray-50 z-[9999] overflow-y-auto`}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Checkout</h1>
              <button
                onClick={() => setCart(false)}
                className="text-gray-600 hover:text-gray-800 text-2xl cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <RxCross2 />
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="container mx-auto px-4 py-4">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <FaExclamationTriangle className="mr-2" />
              <span className="flex-1">{error}</span>
              <button
                onClick={() => setError('')}
                className="ml-4 text-red-800 hover:text-red-900 text-xl"
              >
                &times;
              </button>
            </div>
          </div>
        )}


        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items & Address */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items Section */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
                  Cart Items ({itemCount || 0})
                </h3>
                <div className="space-y-4">
                  {cartData?.map((item, index) => (
                    <div key={index} className="border border-gray-300 bg-[#ebede57c] p-4 rounded-lg shadow-sm flex flex-row items-start md:items-center justify-between gap-4">
                      <div className="shrink-0">
                        <img
                          src={`${imageurl}/${JSON.parse(item?.images || '[]')[0]}` || "/img/product/default-product.webp"}
                          alt={item?.name}
                          className="h-20 w-20 md:h-24 md:w-24 rounded object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="text-lg md:text-xl font-semibold text-gray-800">
                          {item?.name}
                        </h5>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-green-600">₹{item?.total_price}</span>
                          </div>
                          <div className="flex items-center gap-3 bg-white px-2 rounded-2xl">
                            <button
                              onClick={() => handelcartquentity(false, item.cart_id)}
                              className="rounded-2xl bg-[#e6f3eb76] text-gray-600 hover:text-green-500 transition border border-gray-400 p-1"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="text-lg font-medium">{item?.quantity}</span>
                            <button
                              onClick={() => handelcartquentity(true, item.cart_id)}
                              className="rounded-2xl bg-[#e6f3eb76] text-gray-600 hover:text-green-500 transition border border-gray-400 p-1"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.cart_id)}
                          className="mt-2 text-red-500 text-sm flex items-center cursor-pointer hover:text-red-700"
                        >
                          <RxCross2 className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-blue-500" />
                    Delivery Address
                  </div>

                  {/* Map button inside header */}
                  {!showNewAddress && allAddress.length > 0 && (
                    <button
                      onClick={() => {
                        if (!navigator.geolocation) {
                          alert("Geolocation is not supported by your browser");
                          return;
                        }

                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            setMapLocation({
                              lat: position.coords.latitude,
                              lng: position.coords.longitude,
                            });
                            setShowMapModal(true);
                          },
                          () => {
                            alert("Please allow location access to use map");
                          }
                        );
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-lg text-sm flex items-center shadow-md"
                    >
                      📍 Set on Map
                    </button>
                  )}
                </h3>

                {!showNewAddress ? (
                  <>
                    <button
                      onClick={() => setShowNewAddress(true)}
                      className="mb-6 bg-[#60BE74] hover:bg-[#50b666] text-white py-2.5 px-5 rounded-lg transition-colors flex items-center shadow-md hover:shadow-lg"
                    >
                      <FaPlus className="mr-2" /> Add New Address
                    </button>

                    {addressLoading ? (
                      <div className="flex justify-center py-10">
                        <FaSpinner className="animate-spin text-2xl text-blue-500" />
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {allAddress?.map((addr) => (
                          <div
                            key={addr.id}
                            className={`p-4 rounded-2xl shadow-md border transition cursor-pointer
                ${addr.is_default === 1 ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white"}
                ${defaultAddress === addr.id ? "ring-2 ring-[#60BE74]" : ""}`}
                            onClick={() => setDefaultAddress(addr.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-700">
                                {addr.address_type === "home" ? (
                                  <FaHome className="text-blue-500" />
                                ) : (
                                  <FaBuilding className="text-green-500" />
                                )}
                                <span className="font-medium capitalize">{addr.address_type}</span>
                              </div>
                              {addr.is_default === 1 ? (
                                <MdOutlineStar className="text-yellow-500 text-xl" />
                              ) : (
                                <MdOutlineStarBorder
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handelDefault(addr.id);
                                  }}
                                  className="text-gray-400 text-xl cursor-pointer hover:text-yellow-500"
                                />
                              )}
                            </div>

                            <p className="mt-2 font-semibold text-gray-800">
                              {addr.first_name} {addr.last_name}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {addr.street}, {addr.city}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {addr.state}, {addr.zip_code}
                            </p>
                            <p className="text-gray-600 text-sm">{addr.country}</p>
                            <p className="text-gray-700 mt-1">📞 {addr.phone}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {allAddress?.length === 0 && !addressLoading && (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                        <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No addresses saved yet.</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Please add an address to continue with your order.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <AddressForm
                    onCancel={handleCancelForm}
                    mapLocation={mapLocation}
                  />
                )}

                {/* MAP MODAL */}
                {showMapModal && (
                  <MapModal
                    initialLocation={mapLocation}
                    onClose={() => setShowMapModal(false)}
                    onConfirm={(location) => {
                      setMapLocation(location); // Store complete location data
                      setShowNewAddress(true);
                      setShowMapModal(false);
                    }}
                  />
                )}

                {/* DATE PICKER MODAL FOR ALTERNATIVE DAYS - Rendered at document root via portal */}
                {showDatePicker && typeof document !== 'undefined' && createPortal(
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Select Alternative Days</h3>


                      {/* Month/Year Navigation */}
                      <div className="flex justify-between items-center mb-4">
                        <button
                          onClick={() => setCurrentPickerMonth(new Date(currentPickerMonth.getFullYear(), currentPickerMonth.getMonth() - 1))}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
                        >
                          ← Prev
                        </button>
                        <span className="text-gray-800 font-semibold">
                          {currentPickerMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                          onClick={() => setCurrentPickerMonth(new Date(currentPickerMonth.getFullYear(), currentPickerMonth.getMonth() + 1))}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
                        >
                          Next →
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-center text-xs font-bold text-gray-600">
                            {day}
                          </div>
                        ))}
                        {generateCalendarDays().map((date, idx) => (
                          <button
                            key={idx}
                            onClick={() => date && handleDateSelect(date)}
                            disabled={!date}
                            className={`p-2 rounded text-sm font-medium transition-colors ${!date
                              ? 'text-gray-300 cursor-default'
                              : isDateSelected(date)
                                ? 'bg-green-500 text-white'
                                : date < new Date()
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                              }`}
                          >
                            {date ? date.getDate() : ''}
                          </button>
                        ))}
                      </div>

                      {/* Selected Dates Display */}
                      {selectedDates && selectedDates.length > 0 ? (
                        <div className="bg-blue-50 p-3 rounded-lg mb-4">
                          <p className="text-sm text-gray-700 font-semibold">Selected Dates:</p>
                          {selectedDates
                            .slice()
                            .sort((a, b) => a.getTime() - b.getTime())
                            .map((d) => (
                              <p key={d.getTime()} className="text-sm text-gray-600">{d.toLocaleDateString()}</p>
                            ))}
                        </div>
                      ) : (
                        <div className="bg-blue-50 p-3 rounded-lg mb-4">
                          <p className="text-sm text-gray-700 font-semibold">Selected Dates:</p>
                          <p className="text-sm text-gray-600">None</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setShowDatePicker(false);
                            setSelectedDates([]);
                            setCurrentPickerMonth(new Date());
                          }}
                          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => setSelectedDates([])}
                          className="flex-1 bg-yellow-200 hover:bg-yellow-300 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                        >
                          Clear All
                        </button>

                        <button
                          onClick={confirmDates}
                          disabled={selectedDates.length === 0}
                          className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium transition-colors"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                  , document.body)}
              </div>
            </div>



            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
                  Order Summary
                </h3>

                <div className="mb-5 pb-4 border-b space-y-4 max-h-[320px] overflow-auto pr-1">
                  {cartData.map((item) => (
                    <div key={item.cart_id} className="flex items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4 shrink-0">
                        <img
                          src={`${imageurl}/${JSON.parse(item.images || '[]')[0]}` || "/img/placeholder-product.webp"}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/img/placeholder-product.webp";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">{item?.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">Quantity: {item?.quantity}</p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="font-bold text-gray-800">
                          ₹{parseFloat(item?.total_price ?? 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pb-4 border-b mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">₹{parseFloat(derivedSubTotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                {/* Subscription Options */}
                {cartData.length > 1 ? (
                  <div className="mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg py-2 px-4 text-center">
                      <span className="text-blue-700 font-medium">One-time purchase (multiple items)</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Select purchase option:</p>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => { setSelectedFrequency('one_time'); setSubscriptionDuration(1); setSelectedDates([]); setShowDatePicker(false); }}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'one_time'
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        One Time
                      </button>
                      <button
                        onClick={() => { setSelectedFrequency('daily'); setSubscriptionDuration(30); setSelectedDates([]); setShowDatePicker(false); }}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'daily'
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        30 Days
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFrequency('alternative');
                          setSubscriptionDuration(15);
                          setShowDatePicker(true);
                        }}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'alternative'
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        Alternative days
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-xl font-bold text-gray-800">
                    ₹{parseFloat(grandTotal || 0).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={!defaultAddress || isProcessingPayment || !hasItems}
                  className="w-full bg-[#60BE74] hover:bg-[#50b666] disabled:bg-gray-400 text-white py-3.5 rounded-lg text-lg font-semibold transition-colors shadow-md hover:shadow-lg flex justify-center items-center cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : !defaultAddress ? (
                    'Select Address First'
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}