"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthCheck({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:9002/admin/verify", {
          credentials: "include",
        });
        if (!res.ok) {
          if (pathname !== "/admin") {
            router.push("/admin");
          }
        } else {
          if (pathname === "/admin") {
            router.push("/admin/dashboard");
          }
        }
      } catch (err) {
        if (pathname !== "/admin") {
          router.push("/admin");
        }
      }
    };

    checkAuth();
  }, [router, pathname]);

  return <>{children}</>;
}
