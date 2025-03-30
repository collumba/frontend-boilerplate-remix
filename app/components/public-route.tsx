import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { ReactNode, useEffect } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuthContext();

  // Verificação única na montagem do componente
  useEffect(() => {
    // Verifica apenas no lado do cliente
    if (typeof window !== "undefined") {
      // Se estiver autenticado, redireciona diretamente
      if (isAuthenticated) {
        window.location.href = ROUTES.app.root;
      }
    }
  }, []);

  // Renderiza os filhos diretamente
  return <>{children}</>;
}
