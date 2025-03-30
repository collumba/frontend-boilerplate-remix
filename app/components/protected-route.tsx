import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { Navigate, useLocation } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enquanto verificamos o estado de autenticação, mostramos um indicador de carregamento
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        {isMounted ? (
          <Loader2 className="h-10 w-10 animate-spin" />
        ) : (
          <div className="h-10 w-10" /> /* Placeholder with same dimensions */
        )}
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.auth.login}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Se estiver autenticado, renderiza os filhos (conteúdo protegido)
  return <>{children}</>;
}
