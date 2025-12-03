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

  // Normalize pathname to handle trailing slashes and case
  const normalizedPath = pathname?.replace(/\/$/, "").toLowerCase() || "";
  const isLoginPage = normalizedPath === "/admin/login";

  useEffect(() => {
    const checkAuth = async () => {
      // Don't run auth check on login page
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
  }, [pathname, router, isLoginPage]);

  // For login page, show immediately
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading state while checking auth for other pages
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

  // Prevent page flicker for protected pages
  if (!allowed) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-auto pt-12 md:pt-0">
        {children}
      </div>
    </div>
  );
}