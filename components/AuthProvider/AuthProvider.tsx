"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const user = await res.json();
          setUser(user);
        } else {
          clearIsAuthenticated();
          if (
            pathname.startsWith("/profile") ||
            pathname.startsWith("/notes")
          ) {
            router.push("/sign-in");
          }
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
