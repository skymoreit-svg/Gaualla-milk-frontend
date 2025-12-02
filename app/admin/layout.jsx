"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./adminCompo/Sidebar";
import { useRouter, usePathname } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:9002/admin/verify", {
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/admin/Login");
        } else {
          setAllowed(true);
        }
      } catch (err) {
        router.push("/admin/Login");
      }
    };

    // Don't run auth check on login page
    if (pathname !== "/admin/Login") {
      checkAuth();
    } else {
      setAllowed(true);
    }
  }, [pathname]);

  // Prevent page flicker
  if (!allowed) return null;

  return (
    <div className="flex">
      {pathname !== "/admin/Login" && <Sidebar />}
      <div className="w-full h-screen overflow-auto pt-12 md:pt-0">
        {children}
      </div>
    </div>
  );
}
