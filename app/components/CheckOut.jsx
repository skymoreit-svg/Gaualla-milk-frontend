"use client";
import React, { useEffect, useState } from "react";
import {
  FaGreaterThan,
  FaMapMarkerAlt,

  FaHome,
  FaBuilding,
  FaPlus,

  FaExclamationTriangle,
  FaSpinner,

} from 'react-icons/fa';

import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseurl, imageurl } from "./utlis/apis";
import AddressForm from "./AddressForm";
import OtherBanner from "./OtherBanner";





export default function CheckOut() {
  const router = useRouter();
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [isSettingDefault, setIsSettingDefault] = useState(null);
  const [error, setError] = useState('');

  const [allAddress, setAllAddress] = useState();
  const [defaultAddress, setDefaultAddressState] = useState(null);
  const [order, setOrder] = useState();
  const [selectedFrequency, setSelectedFrequency] = useState('one_time');
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(true);
  const [subscriptionDuration, setSubscriptionDuration] = useState("1")


  const fetchcartdata = async (id) => {
    try {
      const response = await axios.get(`${baseurl}/cart/${id}`);
      const data = await response.data;
      if (data.success) {
        setOrder(data.cart);
      } else {
        setError(data.message || 'Failed to fetch order details');
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError('An error occurred while fetching order details. Please try again.');
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






  useEffect(() => {
    const cartid = localStorage.getItem("buyitem");
    if (!cartid) {
      router.push("/");
    } else {
      fetchcartdata(cartid);
      fetchaddress()
    }

  }, []);







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

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const amountToPay = parseFloat(order.total_price * subscriptionDuration).toFixed(2);

    try {
      // 👉 1. Create Order on Backend
      const { data } = await axios.post(`${baseurl}/order/create`, {
        amount: amountToPay,
      });

      if (!data.success) {
        setError("Failed to create Razorpay order");
        return;
      }

      // 👉 2. Setup Razorpay Options
      const options = {
        key: "rzp_test_RAm3ngY6JIbOzo", // Replace with your Razorpay key_id
        amount: amountToPay * 100,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async function (response) {
          // 👉 3. Verify payment
          const verifyRes = await axios.post(`${baseurl}/order/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            address_id: defaultAddress,
            total_amount: amountToPay,
            type: selectedFrequency,
            cart_items: [
              {
                product_id: order.product_id,
                quantity: order.quantity,
                price: order.cart_price,
              },
            ],
          });

          if (verifyRes.data.success) {
            alert("Payment Successful!");
            router.push("/");
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        notes: {
          address: "Order address ID: " + defaultAddress,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      setError("Something went wrong while placing order");
    }
  };







  return (
    <div className="min-h-screen bg-gray-50">

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

        <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-y-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6 flex items-center">
                <FaMapMarkerAlt className="mr-3 text-blue-500" />
                Delivery Address
              </h3>

              {!showNewAddress ? (
                <>
                  <button
                    onClick={() => setShowNewAddress(true)}
                    className="mb-6 bg-[#60BE74] hover:bg-[#50b666] text-white py-2.5 px-5 rounded-lg transition-colors flex items-center shadow-md hover:shadow-lg"
                  >
                    <FaPlus className="mr-2" /> Add New Address
                  </button>

                  {loading ? (
                    <div className="flex justify-center py-10">
                      <FaSpinner className="animate-spin text-2xl text-blue-500" />
                    </div>
                  ) : (
                    <div className="address-list">

                      <div className="grid gap-4">
                        {allAddress?.map((addr) => (
                          <div
                            key={addr.id}
                            className={`p-4 rounded-2xl shadow-md border transition 
              ${addr.is_default ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white"}
            `}
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
                              {addr.is_default ? (
                                <MdOutlineStar className="text-yellow-500 text-xl" />
                              ) : (
                                <MdOutlineStarBorder onClick={() => handelDefault(addr.id)} className="text-gray-400 text-xl cursor-pointer" />
                              )}
                            </div>

                            <p className="mt-2 font-semibold text-gray-800">
                              {addr.first_name} {addr.last_name}
                            </p>
                            <p className="text-gray-600 text-sm">{addr.street}, {addr.city}</p>
                            <p className="text-gray-600 text-sm">{addr.state}, {addr.zip_code}</p>
                            <p className="text-gray-600 text-sm">{addr.country}</p>
                            <p className="text-gray-700 mt-1">📞 {addr.phone}</p>
                          </div>
                        ))}
                      </div>


                      {allAddress?.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                          <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">No addresses saved yet.</p>
                          <p className="text-gray-400 text-sm mt-1">Please add an address to continue with your order.</p>
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
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6 flex items-center">
                Order Summary
              </h3>

              {orderLoading ? (
                <div className="flex justify-center py-10">
                  <FaSpinner className="animate-spin text-2xl text-blue-500" />
                </div>
              ) : order ? (
                <>
                  <div className="flex items-center mb-5 pb-4 border-b">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4">
                      <img
                        src={`${imageurl}/${JSON.parse(order.images)[0]}` || "/img/placeholder-product.webp"}
                        alt={order?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/img/placeholder-product.webp";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{order?.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">Quantity: {order?.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">₹{parseFloat(order?.cart_price || 0).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pb-4 border-b mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-800">₹{parseFloat(order.total_price || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                  </div>


                  {order.one_time ? (
                    <div className="mb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg py-2 px-4 text-center">
                        <span className="text-blue-700 font-medium">One-time purchase</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Select purchase option:</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => { setSelectedFrequency('one_time'), setSubscriptionDuration(1) }}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'one_time'
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          One Time
                        </button>
                        <button
                          onClick={() => { setSelectedFrequency('daily'), setSubscriptionDuration(30) }}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'daily'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          30 Days
                        </button>
                        <button
                          onClick={() => { setSelectedFrequency('alternative'), setSubscriptionDuration(15) }}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${selectedFrequency === 'alternative'
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
                      ₹{parseFloat(order.total_price * subscriptionDuration).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={!defaultAddress}
                    className="w-full bg-[#60BE74] hover:bg-black disabled:bg-gray-400 text-white py-3.5 rounded-lg text-lg font-semibold transition-colors shadow-md hover:shadow-lg flex justify-center items-center"
                  >
                    {!defaultAddress ? 'Select Address First' :
                      (isSettingDefault ? <FaSpinner className="animate-spin mr-2" /> : null)}
                    {defaultAddress && !isSettingDefault && 'Place Order'}
                  </button>
                </>
              ) : (
                <p className="text-gray-500 text-center py-8">No order details available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}