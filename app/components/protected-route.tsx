import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthContext();

  // Verificação única na montagem do componente
  useEffect(() => {
    // Verifica apenas no lado do cliente
    if (typeof window !== "undefined") {
      // Se não estiver autenticado, redireciona diretamente
      if (!isAuthenticated) {
        window.location.href = ROUTES.auth.login;
      }
    }
  }, []);

  // Renderiza os filhos diretamente
  return <>{children}</>;
}
