import { ROUTES } from "@app/config/routes";
import { authService } from "@app/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useAuth() {
  const hasToken =
    typeof window !== "undefined" ? !!authService.getToken() : false;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasToken);
  const [user, setUser] = useState<User | null>(null);

  const {
    data: authData,
    refetch: checkAuth,
    isLoading,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const isAuthValid = authService.isAuthenticated();

        if (isAuthValid) {
          const userData = await authService.me();
          return {
            isAuthenticated: true,
            user: userData,
          };
        }

        return {
          isAuthenticated: false,
          user: null,
        };
      } catch (error) {
        console.error("Auth check failed:", error);
        if (typeof window !== "undefined") {
          authService.logout();
        }
        return {
          isAuthenticated: false,
          user: null,
        };
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (authData) {
      setIsAuthenticated(authData.isAuthenticated);
      setUser(authData.user);
    }
  }, [authData]);

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      identifier,
      password,
      rememberMe = false,
    }: {
      identifier: string;
      password: string;
      rememberMe?: boolean;
    }) => {
      return authService.login({ identifier, password });
    },
    onSuccess: (response) => {
      setIsAuthenticated(true);
      setUser(response.user);
    },
  });

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = ROUTES.auth.login;
    },
  });

  useEffect(() => {
    if (hasToken) {
      checkAuth();
    }
  }, []);

  return {
    isLoading: isLoginPending || isLogoutPending || isLoading,
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
}
