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
  // Inicializar o estado com base no token existente
  const hasToken =
    typeof window !== "undefined" ? !!authService.getToken() : false;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasToken);
  const [user, setUser] = useState<User | null>(null);

  // Verificar se o usuário está autenticado - usando staleTime para evitar consultas frequentes
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
        // Em caso de erro, limpar o token para evitar loops
        if (typeof window !== "undefined") {
          authService.logout();
        }
        return {
          isAuthenticated: false,
          user: null,
        };
      }
    },
    // Evita consultas excessivas
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    // Desativar execução automática para controlá-la manualmente
    enabled: false,
  });

  // Atualizar estado apenas quando dados mudarem
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
      // Redirecionamento feito pelo componente de login, não aqui
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
      // Redirecionamento direto, sem usar React Router
      window.location.href = ROUTES.auth.login;
    },
  });

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    if (hasToken) {
      checkAuth();
    }
  }, []); // Execute apenas uma vez

  return {
    isLoading: isLoginPending || isLogoutPending || isLoading,
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
}
