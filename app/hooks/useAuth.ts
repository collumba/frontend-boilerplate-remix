import { ROUTES } from "@app/config/routes";
import { authService } from "@app/services/auth";
import { useNavigate } from "@remix-run/react";
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Verificar se o usuário está autenticado
  const { data: authData, refetch: checkAuth } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const isAuthValid = authService.isAuthenticated();

        if (isAuthValid) {
          const userData = await authService.me();
          setIsAuthenticated(true);
          setUser(userData);
          return {
            isAuthenticated: true,
            user: userData,
          };
        }

        setIsAuthenticated(false);
        setUser(null);
        return {
          isAuthenticated: false,
          user: null,
        };
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        throw error;
      }
    },
  });

  const { mutate: login } = useMutation({
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
      navigate(ROUTES.app.root);
      return response;
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);
      navigate(ROUTES.auth.login);
    },
  });

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
}
