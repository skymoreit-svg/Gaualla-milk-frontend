"use client";
import React, { useEffect, useState } from "react";
import CompleteProfileForm from "./CompleteProfileForm";
import { FaBox, FaOpencart, FaShoppingBag } from "react-icons/fa";
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

  const [cart, setCart] = useState(false)
  const user = info?.user || {};

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
    //   if (!info?.success) {
    //   router.push("/user/login");

    // }




  }, [isLoading])


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
    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-lg">
      <img
        src="/img/logos/logo.webp"
        alt="Profile Placeholder"
        className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-yellow-500"
      />
      <h6 className="font-semibold text-2xl lg:text-3xl text-gray-800">
        Your Profile Awaits! ✨
      </h6>
      <p className="text-gray-600">
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
            <h5 className="text-2xl lg:text-4xl text-gray-800">
              {user.name || "Guest"}
            </h5>
            <p className="text-lg lg:text-xl">{user.email || "No email"}</p>
          </div>
        </div>

        {/* Profile content */}
        {!profileComplete ? (
          <ProfileEmpty />
        ) : (
          <div className="w-full flex flex-col md:flex-row items-start gap-x-5 p-5 bg-gradient-to-br from-gray-200 to-gray-100 backdrop-blur-3xl rounded-2xl">
            <div className="h-auto w-full rounded-2xl bg-white p-3 flex flex-col gap-1 lg:flex-row">


              {tablles.map((item, index) => {

                return (
                  <Link
                    key={index}
                    href={item.link}
                    className={`flex items-center gap-3 px-4 py-3 text-gray-700 transition  hover:text-blue-600 border-b border-gray-200 last:border-b-0
      `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                );
              })}


              <button
                onClick={() => setCart(true)}
                className={`flex items-center gap-3 px-4 py-3 text-gray-700 transition  hover:text-blue-600 border-b border-gray-200 last:border-b-0
      `}
              >
                <span className="text-lg"><FaOpencart /></span>
                <span className="text-sm">Cart</span>
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-3 text-gray-700 transition  hover:text-blue-600 border-b border-gray-200 last:border-b-0
      `}
              >
                <span className="text-lg"><MdLogout /></span>
                <span className="text-sm">Logout</span>
              </button>





            </div>
          </div>
        )}

        {completeProfileForm && (
          <CompleteProfileForm setCompleteProfileForm={setCompleteProfileForm} />
        )}
      </div>

      <MyCart cart={cart} setCart={setCart} />
    </div>
  );
}
