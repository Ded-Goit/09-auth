//components/AuthProvider/AuthProvider.tsx
"use client";

import { checkSession, getUserProfile } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetcSession = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getUserProfile();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetcSession();
  }, [setUser, clearIsAuthenticated]);

  return children;
}
