"use client";
import React, { useEffect, useState } from "react";
import CompleteProfileForm from "./CompleteProfileForm";
import { FaBox, FaOpencart, FaShoppingBag, FaWallet } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { LuPackage } from "react-icons/lu";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { setCartItems } from "../store/cartSlice";
import axios from "axios";
import { baseurl } from "./utlis/apis";
import toast from "react-hot-toast";
import Link from "next/link";
import MyCart from "./MyCart";

// Enable cookies in all requests
axios.defaults.withCredentials = true;

export default function UserProfile() {
  const { info, isLoading, isError, errorMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState("My Profile");
  const [completeProfileForm, setCompleteProfileForm] = useState(false);

  const [cart, setCart] = useState(false);
  const user = info?.user || {};

  const [wallet, setWallet] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [isRecharging, setIsRecharging] = useState(false);
  const [transactions, setTransactions] = useState([]);

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

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${baseurl}/wallet/transactions?page=1&limit=5`);
      if (response.data.success) {
        setTransactions(response.data.transactions);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    const amount = parseFloat(rechargeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount to recharge");
      return;
    }

    setIsRecharging(true);
    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) {
        toast.error("Razorpay SDK failed to load. Please check your internet connection.");
        setIsRecharging(false);
        return;
      }

      // 2. Create Razorpay order on backend
      const { data } = await axios.post(`${baseurl}/wallet/topup/create`, {
        amount
      }, { withCredentials: true });

      if (!data.success || !data.razorpay_order) {
        toast.error("Failed to initiate recharge order");
        setIsRecharging(false);
        return;
      }

      // 3. Open Razorpay payment modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_RAm3ngY6JIbOzo",
        amount: data.razorpay_order.amount,
        currency: data.razorpay_order.currency,
        name: "Gaualla Milk",
        description: `Wallet Top-up of ₹${amount}`,
        order_id: data.razorpay_order.id,
        handler: async function (response) {
          try {
            toast.loading("Verifying payment...", { id: "verify-toast" });
            const verifyRes = await axios.post(`${baseurl}/wallet/topup/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount
            }, { withCredentials: true });

            if (verifyRes.data.success) {
              toast.success("Wallet recharged successfully!", { id: "verify-toast" });
              setRechargeAmount("");
              fetchWallet();
              fetchTransactions();
            } else {
              toast.error(verifyRes.data.message || "Failed to verify recharge", { id: "verify-toast" });
            }
          } catch (verifyErr) {
            console.error("Recharge verification error:", verifyErr);
            toast.error("Payment verification failed", { id: "verify-toast" });
          }
        },
        prefill: {
          name: user.name || "Customer",
          email: user.email || "",
          contact: user.phone || ""
        },
        theme: {
          color: "var(--primary)"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (err) {
        toast.error(`Recharge failed: ${err.error.description}`);
      });
      rzp.open();
    } catch (err) {
      console.error("Error in wallet recharge:", err);
      toast.error(err.response?.data?.message || "Failed to initiate recharge");
    } finally {
      setIsRecharging(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Call logout API
      await axios.get(`${baseurl}/logout`, {
        withCredentials: true
      });

      // Clear Redux state
      dispatch(logoutUser());
      dispatch(setCartItems([])); // Clear cart items

      // Clear any localStorage items
      localStorage.removeItem("buyitem");
      localStorage.removeItem("buyitems");
      localStorage.removeItem("rememberedEmail");

      toast.success("Logged out successfully!");
      
      // Redirect to home page
      router.push("/");
      
      // Force page reload to clear all state
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local state
      dispatch(logoutUser());
      dispatch(setCartItems([]));
      localStorage.removeItem("buyitem");
      localStorage.removeItem("buyitems");
      localStorage.removeItem("rememberedEmail");
      toast.error("Logout had issues, but you've been logged out locally");
      router.push("/");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  useEffect(() => {
    if (user.phone) {
      fetchWallet();
      fetchTransactions();
    }
  }, [user.phone]);


  const tablles = [
    {
      title: "Orders",
      icon: <LuPackage />,
      link: "/orders"
    },
    {
      title: "Wishlist",
      icon: <FaBox />,
      link: "/wishlist"
    },
  ]




  /** ---------------- Profile Empty ---------------- **/
  const ProfileEmpty = () => (
    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-lg">
      <img
        src="/img/logos/logo.webp"
        alt="Profile Placeholder"
        className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-yellow-500"
      />
      <h6 className="font-semibold text-2xl lg:text-3xl text-text">
        Your Profile Awaits! ✨
      </h6>
      <p className="text-text">
        Complete your profile now to unlock exclusive collections, personalized
        recommendations, and special offers.
      </p>
      <button
        onClick={() => setCompleteProfileForm(true)}
        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition"
      >
        Complete Profile
      </button>
    </div>
  );

  const profileComplete = user.phone ? true : false; // mark profile complete if phone exists

  /** ---------------- Return ---------------- **/
  return (
    <div className="userProfile bg-[#F3F1EC] min-h-screen">
      <div className="container space-y-8 mx-auto px-5 md:px-12 xl:px-32 py-10">
        {/* User Profile Card */}
        <div className="w-full flex flex-col md:flex-row items-center gap-x-5 p-5 bg-gradient-to-br from-gray-200 to-gray-100 backdrop-blur-3xl rounded-2xl">
          <div className="relative">
            <img
              src="/img/user/userProfile1.webp"
              alt="user_profile"
              className="w-24 h-24 lg:h-32 lg:w-32 border-8 border-gray-500 rounded-full"
            />
            <p className="p-2 px-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white w-fit absolute -bottom-3 left-1/2 transform -translate-x-1/2 rounded-full text-xs md:text-sm">
              {profileComplete ? "100%" : "10%"}
            </p>
          </div>
          <div className="text-center mt-5 md:text-left">
            <h5 className="text-2xl lg:text-4xl text-text">
              {user.name || "Guest"}
            </h5>
            <p className="text-lg lg:text-xl">{user.email || "No email"}</p>
          </div>
        </div>

        {/* Profile content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Wallet details and transactions */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Wallet Info & Recharge Form */}
              <div className="bg-background rounded-2xl p-6 shadow-lg border border-highlight bg-gradient-to-br from-white to-[#F8F6F2]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[var(--primary)]/10 rounded-xl text-[var(--primary)] text-2xl">
                      <FaWallet />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-text">Gaualla Wallet</h4>
                      <p className="text-xs text-gray-500">Fast & hassle-free recurring deliveries</p>
                    </div>
                  </div>
                  {wallet && (
                    <div className="text-right">
                      <p className="text-2xl font-black text-text">₹{wallet.total_balance.toFixed(2)}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Balance</p>
                    </div>
                  )}
                </div>

                {wallet && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-background00 rounded-xl border border-highlight mb-6">
                    <div>
                      <p className="text-sm font-semibold text-text">Main Balance</p>
                      <p className="text-lg font-bold text-[var(--primary)]">₹{wallet.main_balance.toFixed(2)}</p>
                      <p className="text-[10px] text-gray-400">Added money</p>
                    </div>
                    <div className="border-l border-highlight pl-4">
                      <p className="text-sm font-semibold text-text">Cashback Balance</p>
                      <p className="text-lg font-bold text-green-600">₹{wallet.cashback_balance.toFixed(2)}</p>
                      <p className="text-[10px] text-gray-400">Promotional bonuses</p>
                    </div>
                  </div>
                )}

                {/* Recharge Form */}
                <form onSubmit={handleRecharge} className="space-y-4">
                  <h5 className="text-sm font-bold text-text">Recharge Wallet</h5>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={rechargeAmount}
                        onChange={(e) => setRechargeAmount(e.target.value)}
                        className="w-full pl-8 pr-3 py-3 border border-highlight rounded-xl text-base outline-none focus:ring-2 focus:ring-[var(--primary)]/30 font-semibold text-text"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isRecharging}
                      className="bg-[var(--primary)] hover:bg-black text-white px-6 rounded-xl font-bold transition shadow-md hover:shadow-lg disabled:bg-gray-400 flex items-center justify-center gap-2"
                    >
                      {isRecharging ? 'Processing...' : 'Recharge'}
                    </button>
                  </div>

                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[500, 1000, 2000, 5000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setRechargeAmount(amt.toString())}
                        className="px-3.5 py-1.5 border border-highlight rounded-lg text-xs font-semibold text-text hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition"
                      >
                        + ₹{amt}
                      </button>
                    ))}
                  </div>

                  {/* Cash back promo card */}
                  <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3">
                    <p className="text-[11px] font-bold text-amber-800 mb-1.5 flex items-center gap-1">
                      🎁 Wallet Cashback Benefits
                    </p>
                    <ul className="text-[10px] text-amber-700/80 space-y-1 pl-4 list-disc">
                      <li>Recharge ₹1,000+ to get ₹100 instant bonus cash</li>
                      <li>Recharge ₹2,000+ to get ₹300 instant bonus cash</li>
                      <li>Recharge ₹5,000+ to get ₹1,000 instant bonus cash</li>
                      <li>Recharge ₹500+ to get 5% cashback bonus</li>
                    </ul>
                  </div>
                </form>
              </div>

              {/* Transactions list */}
              <div className="bg-background rounded-2xl p-6 shadow-lg border border-highlight">
                <h4 className="text-base font-bold text-text mb-4">Recent Wallet Transactions</h4>
                {transactions && transactions.length > 0 ? (
                  <div className="divide-y divide-highlight">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="py-3 flex items-center justify-between text-sm">
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-text truncate">{tx.title}</p>
                          <p className="text-[11px] text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`font-black ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                            {tx.type === 'credit' ? '+' : '-'} ₹{parseFloat(tx.amount).toFixed(2)}
                          </p>
                          <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400 bg-background00 px-1.5 py-0.5 rounded border border-highlight">
                            {tx.source}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-700 italic text-center py-6">No transactions found</p>
                )}
              </div>

            </div>

            {/* Right Column: Sidebar Navigation & Options */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-background rounded-2xl p-6 shadow-lg border border-highlight space-y-2">
                <h4 className="text-sm font-bold text-text uppercase tracking-wider mb-4 border-b pb-2">Menu</h4>

                {tablles.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="flex items-center gap-3 px-4 py-3 text-text transition hover:text-[var(--primary)] hover:bg-background00 rounded-xl border border-transparent hover:border-highlight"
                  >
                    <span className="text-lg text-[var(--primary)]">{item.icon}</span>
                    <span className="text-sm font-semibold">{item.title}</span>
                  </Link>
                ))}

                <button
                  onClick={() => setCart(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-text transition hover:text-[var(--primary)] hover:bg-background00 rounded-xl border border-transparent hover:border-highlight text-left"
                >
                  <span className="text-lg text-[var(--primary)]"><FaOpencart /></span>
                  <span className="text-sm font-semibold">Cart</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-text transition hover:text-[var(--primary)] hover:bg-background00 rounded-xl border border-transparent hover:border-highlight text-left"
                >
                  <span className="text-lg text-[var(--primary)]"><MdLogout /></span>
                  <span className="text-sm font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </div>

        {completeProfileForm && (
          <CompleteProfileForm setCompleteProfileForm={setCompleteProfileForm} />
        )}
      </div>

      <MyCart cart={cart} setCart={setCart} />
    </div>
  );
}
