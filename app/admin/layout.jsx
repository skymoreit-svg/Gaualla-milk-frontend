"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./adminCompo/Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { adminurl } from "./adminCompo/adminapis";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Normalize pathname to handle trailing slashes and case
  const normalizedPath = pathname?.replace(/\/$/, "").toLowerCase() || "";
  const isLoginPage =
    normalizedPath === "/admin" || normalizedPath === "/admin/login";

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoginPage) {
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
          if (
            normalizedPath !== "/admin" &&
            normalizedPath !== "/admin/login"
          ) {
            router.push("/admin");
          }
          setAllowed(false);
          setLoading(false);
          return;
        }

        if (
          normalizedPath === "/admin" ||
          normalizedPath === "/admin/login"
        ) {
          router.push("/admin/dashboard");
          setAllowed(false);
          setLoading(false);
          return;
        }

        setAllowed(true);
      } catch (err) {
        console.error("Auth check error:", err);
        if (
          normalizedPath !== "/admin" &&
          normalizedPath !== "/admin/login"
        ) {
          router.push("/admin");
        }
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, isLoginPage, normalizedPath]);

  // Login page → no sidebar
  if (isLoginPage) {
    return (
      <>
        {children}
        <Toaster position="top-right" />
      </>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text">Loading...</p>
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  if (!allowed) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-auto pt-12 md:pt-0">
        {children}
      </div>

      {/* Toast container (ONE TIME for admin) */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
