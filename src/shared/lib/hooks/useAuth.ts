import { useToast } from "@/app/providers/toast-context";
import { authService } from "@/shared/api/auth";
import { ROUTES } from "@/shared/config/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { actions } = useToast();
  const { t } = useTranslation();
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
        actions.addToast({
          title: t("auth.error.checkAuth"),
          description: t("auth.error.checkAuthDescription"),
          type: "error",
        });
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
    onError: () => {
      actions.addToast({
        title: t("auth.error.login"),
        description: t("auth.error.loginDescription"),
        type: "error",
      });
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
    onError: () => {
      actions.addToast({
        title: t("auth.error.logout"),
        description: t("auth.error.logoutDescription"),
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (hasToken) {
      checkAuth();
    }
  }, [checkAuth, hasToken]);

  return {
    isLoading: isLoginPending || isLogoutPending || isLoading,
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
}
