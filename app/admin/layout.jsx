"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./adminCompo/Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { adminurl } from "./adminCompo/adminapis";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Don't run auth check on login page
      if (pathname === "/admin/Login" || pathname === "/admin/login") {
        setAllowed(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${adminurl}/verify`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          router.push("/admin/Login");
          return;
        }

        setAllowed(true);
      } catch (err) {
        console.error("Auth check error:", err);
        router.push("/admin/Login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Prevent page flicker
  if (!allowed) return null;

  const isLoginPage = pathname === "/admin/Login" || pathname === "/admin/login";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="w-full h-screen overflow-auto pt-12 md:pt-0">
        {children}
      </div>
    </div>
  );
}
