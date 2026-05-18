"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { adminurl } from "./adminCompo/adminapis";

export default function AuthCheck({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page
      if (pathname === "/admin" || pathname === "/admin/login" || pathname === "/admin/Login") {
        setIsChecking(false);
        return;
      }

      try {
        const res = await fetch(`${adminurl}/verify`, {
          credentials: "include",
        });
        
        const data = await res.json();
        
        if (!res.ok || !data.success) {
          // Not authenticated, redirect to login
          if (pathname !== "/admin" && pathname !== "/admin/login" && pathname !== "/admin/Login") {
            router.push("/admin");
          }
        } else {
          // Authenticated, if on login page redirect to dashboard
          if (pathname === "/admin" || pathname === "/admin/login" || pathname === "/admin/Login") {
            router.push("/admin/dashboard");
          }
        }
      } catch (err) {
        console.error("Auth check error:", err);
        // On error, redirect to login if not already there
        if (pathname !== "/admin" && pathname !== "/admin/login" && pathname !== "/admin/Login") {
          router.push("/admin");
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Show loading state while checking (prevents flash of content)
  if (isChecking && pathname !== "/admin" && pathname !== "/admin/login" && pathname !== "/admin/Login") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
