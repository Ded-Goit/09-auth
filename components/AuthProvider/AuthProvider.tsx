//components/AuthProvider/AuthProvider.tsx
"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { getUserProfile } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { PropagateLoader } from "react-spinners";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const sessionUser = await getUserProfile();
        if (sessionUser && sessionUser.email) {
          setUser(sessionUser);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();
  }, [setUser, clearIsAuthenticated]);

  if (loading)
    return (
      <div>
        <PropagateLoader color="#0d6efd" size={11} speedMultiplier={2} />
      </div>
    );

  return <>{children}</>;
}
