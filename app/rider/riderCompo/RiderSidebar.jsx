"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/constants";
import { 
  FaHome, 
  FaUser, 
  FaSignOutAlt, 
  FaMotorcycle, 
  FaHistory, 
  FaWallet,
  FaBell,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

export default function RiderSidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams?.get("status");
  const [rider, setRider] = useState(null);
  const [ordersOpen, setOrdersOpen] = useState(false);

  useEffect(() => {
    // Keep Orders dropdown open if user is currently on an orders list page
    if (pathname === "/rider/orders") {
      setOrdersOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_ENDPOINTS.RIDER_AUTH}/me`, {
          withCredentials: true,
        });
        if (data.success) {
          setRider(data.rider);
        }
      } catch (err) {
        console.error("Failed to fetch rider profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_ENDPOINTS.RIDER_AUTH}/logout`, {
        withCredentials: true,
      });
      router.push("/rider/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/rider/login");
    }
  };

  const isActive = (route) => {
    return pathname === route ? "bg-emerald-600 border-l-4 border-white" : "hover:bg-emerald-700";
  };

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-emerald-600 text-white rounded-lg md:hidden shadow-lg"
        onClick={() => setOpen(true)}
      >
        <RxHamburgerMenu size={24} />
      </button>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setOpen(false)} 
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-emerald-900 text-white z-50 transition-transform duration-300 transform
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:sticky md:h-screen overflow-y-auto
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-white p-2 rounded-lg">
              <FaMotorcycle className="text-emerald-900 text-2xl" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">Rider Portal</h1>
          </div>

          <div className="mb-8 p-4 bg-emerald-800/50 rounded-xl border border-emerald-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-lg flex-shrink-0">
                {rider?.name?.[0] || "R"}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate text-sm">{rider?.name || "Rider"}</p>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${rider?.is_online ? "bg-green-400" : "bg-gray-400"}`}></div>
                  <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider">{rider?.is_online ? "Online" : "Offline"}</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-1 flex-grow">
            <Link 
              href="/rider/dashboard" 
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${isActive("/rider/dashboard")}`}
            >
              <span className="text-lg"><FaHome /></span>
              <span className="font-medium text-sm">Dashboard</span>
            </Link>

            {/* Orders Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setOrdersOpen(!ordersOpen)}
                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 text-left ${
                  pathname === "/rider/orders" ? "bg-emerald-800/40 text-white" : "text-emerald-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg"><FaClipboardList /></span>
                  <span className="font-medium text-sm">Orders</span>
                </div>
                <span>{ordersOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}</span>
              </button>

              {ordersOpen && (
                <div className="pl-10 space-y-1 animate-[slideDown_0.2s_ease-out]">
                  <Link
                    href="/rider/orders?status=completed"
                    onClick={() => setOpen(false)}
                    className={`flex items-center p-2 rounded-lg text-sm transition-all duration-200 ${
                      pathname === "/rider/orders" && currentStatus === "completed"
                        ? "text-white font-bold bg-emerald-700"
                        : "text-emerald-200 hover:text-white"
                    }`}
                  >
                    Completed Orders
                  </Link>
                  <Link
                    href="/rider/orders?status=cancelled"
                    onClick={() => setOpen(false)}
                    className={`flex items-center p-2 rounded-lg text-sm transition-all duration-200 ${
                      pathname === "/rider/orders" && currentStatus === "cancelled"
                        ? "text-white font-bold bg-emerald-700"
                        : "text-emerald-200 hover:text-white"
                    }`}
                  >
                    Cancelled Orders
                  </Link>
                </div>
              )}
            </div>
          </nav>
            
          <div className="mt-auto pt-6 border-t border-emerald-800">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-red-600/20 text-red-400 transition-all duration-200"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium text-sm">Logout</span>
            </button>
            <p className="text-[10px] text-emerald-500 text-center mt-4">Version 1.1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
