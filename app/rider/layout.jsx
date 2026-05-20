"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { API_ENDPOINTS } from "../config/constants";
import { Toaster } from "react-hot-toast";
import RiderSidebar from "./riderCompo/RiderSidebar";

export default function RiderLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRiderAuth = async () => {
      const isLoginPath = pathname === "/rider/login" || pathname === "/rider/login/";
      
      if (isLoginPath) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_ENDPOINTS.RIDER_AUTH}/me`, {
          withCredentials: true,
        });

        if (data.success) {
          setAuthorized(true);
        } else {
          router.push("/rider/login");
        }
      } catch (err) {
        console.error("Rider auth check failed:", err);
        router.push("/rider/login");
      } finally {
        setLoading(false);
      }
    };

    checkRiderAuth();
  }, [pathname, router]);

  const isLoginPath = pathname === "/rider/login" || pathname === "/rider/login/";

  if (loading && !isLoginPath) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-emerald-400 font-medium">Authenticating Rider...</p>
        </div>
      </div>
    );
  }

  // If on login page or authorized, show content
  if (isLoginPath || authorized) {
    if (isLoginPath) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <Toaster position="bottom-center" />
        </div>
      );
    }

    return (
      <div className="flex bg-gray-100 min-h-screen">
        <RiderSidebar />
        <div className="flex-1 h-screen overflow-auto">
          <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 flex justify-between items-center md:hidden">
             <div className="w-8"></div> {/* Spacer for hamburger */}
             <h1 className="font-bold text-emerald-900">Rider Portal</h1>
             <div className="w-8"></div>
          </header>
          <main className="p-4 md:p-8 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
        <Toaster position="bottom-center" />
      </div>
    );
  }

  return null;
}
