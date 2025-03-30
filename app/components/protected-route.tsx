import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { Navigate, useLocation } from "@remix-run/react";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const [isClient, setIsClient] = useState(false);

  // Executar apenas uma vez quando o componente for montado
  useEffect(() => {
    setIsClient(true);
  }, []);

  // No lado do servidor, apenas renderizar as crianças sem verificação
  if (!isClient) {
    return <>{children}</>;
  }

  // No cliente, verificar autenticação
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.auth.login}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Autenticado, renderizar conteúdo protegido
  return <>{children}</>;
}
