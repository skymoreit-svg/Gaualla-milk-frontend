"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { adminurl } from "./adminapis";

import { FaHome, FaShoppingCart, FaUser, FaSignInAlt, FaSignOutAlt, FaBlog, FaMotorcycle, FaMapMarkedAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { PiFlagBannerFill } from "react-icons/pi";
import { LuPackage } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCreditCard } from "react-icons/fa";
import NotificationBell from "./NotificationBell";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detect cookie
  useEffect(() => {
    const logged = document.cookie.includes("admin=");
    setIsLoggedIn(logged);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${adminurl}/logout`, {
        withCredentials: true,
      });
      router.push("/admin/Login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if logout fails
      router.push("/admin/Login");
    }
  };

  const [activeRoute, setActiveRoute] = useState(pathname || "");
  useEffect(() => {
    setActiveRoute(pathname || "");
  }, [pathname]);

  const isActive = (route) => {
    const ar = (activeRoute || "").toLowerCase();
    const r = (route || "").toLowerCase();
    if (!r) return "hover:bg-gray-700";
    if (r === "/admin") {
      return ar === "/admin" || ar === "/admin/"
        ? "bg-gray-700 border-l-4 border-green-400"
        : "hover:bg-gray-700";
    }
    return ar === r || ar.startsWith(r + "/")
      ? "bg-gray-700 border-l-4 border-green-400"
      : "hover:bg-gray-700";
  };



  




  return (
    <>
      {/* Hamburger menu only on small screens */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg md:hidden hover:bg-gray-800 transition-colors duration-200"
        onClick={() => setOpen(true)}
      >
        <RxHamburgerMenu size={24} />
      </button>

      {/* Sidebar overlay for mobile */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpen(false)} />
          <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 p-5 pt-8 z-50 md:hidden">
            <button className="absolute top-4 right-4 text-white" onClick={() => setOpen(false)}>
              ✕
            </button>

            <div className="flex gap-x-4 items-center mb-8">
              <FaShoppingCart className="text-white text-2xl" />
              <h1 className="text-white font-bold text-xl">Gaualla</h1>
            </div>

            <ul className="pt-6 space-y-1">
              <li className={`p-2 text-white rounded-md ${isActive("/admin")}`}>
                <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <FaHome /> <span>Dashboard</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/category")}`}>
                <Link href="/admin/category" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <BiCategory /> <span>Categories</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/products")}`}>
                <Link href="/admin/products" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <FaShoppingCart /> <span>Products</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/bannners")}`}>
                <Link href="/admin/bannners" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <PiFlagBannerFill /> <span>Bannners</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/blogs")}`}>
                <Link href="/admin/blogs/create" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <FaBlog /> <span>Blogs</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/orders")}`}>
                <Link href="/admin/orders" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <LuPackage /> <span>Orders</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/payments")}`}>
                <Link href="/admin/payments" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <FaCreditCard /> <span>Payments</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/riders")}`}>
                <Link href="/admin/riders" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <FaMotorcycle /> <span>Riders</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/riders/live-map")}`}>
                <Link href="/admin/riders/live-map" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <FaMapMarkedAlt /> <span>Live Map</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/settlements")}`}>
                <Link href="/admin/settlements" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <FaCreditCard /> <span>Settlements</span>
                </Link>
              </li>

              <li className={`p-2 text-white rounded-md ${isActive("/admin/user")}`}>
                <Link href="/admin/user" onClick={() => setOpen(false)} className="flex items-center gap-x-4">
                  <FaUser /> <span>Users</span>
                </Link>
              </li>

              <li className="p-2 text-white rounded-md hover:bg-gray-700 cursor-pointer"
                  onClick={handleLogout}>
                <div className="flex items-center gap-x-4">
                  <FaSignOutAlt /> <span>Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="w-64 bg-gray-900 h-screen p-5 pt-8">
          <div className="flex gap-x-4 items-center mb-8">
            <FaShoppingCart className="text-white text-2xl" />
            <h1 className="text-white font-bold text-xl">Gaualla</h1>
            <div className="ml-auto"><NotificationBell /></div>
          </div>

          <ul className="pt-6 space-y-1">
            <li className={`p-2 text-white rounded-md ${isActive("/admin")}`}>
              <Link href="/admin" className="flex items-center gap-x-4">
                <FaHome /> <span>Dashboard</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/category")}`}>
              <Link href="/admin/category" className="flex items-center gap-x-4">
                <BiCategory /> <span>Categories</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/products")}`}>
              <Link href="/admin/products" className="flex items-center gap-x-4">
                <FaShoppingCart /> <span>Products</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/bannners")}`}>
              <Link href="/admin/bannners" className="flex items-center gap-x-4">
                <PiFlagBannerFill /> <span>Bannners</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/blogs")}`}>
              <Link href="/admin/blogs" className="flex items-center gap-x-4">
                <FaBlog /> <span>Blogs</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/orders")}`}>
              <Link href="/admin/orders" className="flex items-center gap-x-4">
                <LuPackage /> <span>Orders</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/payments")}`}>
              <Link href="/admin/payments" className="flex items-center gap-x-4">
                <FaCreditCard /> <span>Payments</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/riders")}`}>
              <Link href="/admin/riders" className="flex items-center gap-x-4">
                <FaMotorcycle /> <span>Riders</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/riders/live-map")}`}>
              <Link href="/admin/riders/live-map" className="flex items-center gap-x-4">
                <FaMapMarkedAlt /> <span>Live Map</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/settlements")}`}>
              <Link href="/admin/settlements" className="flex items-center gap-x-4">
                <FaCreditCard /> <span>Settlements</span>
              </Link>
            </li>

            <li className={`p-2 text-white rounded-md ${isActive("/admin/user")}`}>
              <Link href="/admin/user" className="flex items-center gap-x-4">
                <FaUser /> <span>Users</span>
              </Link>
            </li>

              <li className="p-2 text-white rounded-md hover:bg-gray-700 cursor-pointer"
                  onClick={handleLogout}>
                <div className="flex items-center gap-x-4">
                  <FaSignOutAlt /> <span>Logout</span>
                </div>
              </li>
       
          </ul>
        </div>
      </div>
    </>
  );
}


