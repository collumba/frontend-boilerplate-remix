import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthContext();

  // Use um useEffect para redirecionar em vez de render-time redirect
  useEffect(() => {
    // Certifique-se de que estamos no navegador e não no servidor
    if (typeof window !== "undefined") {
      // Redirecione somente se NÃO estiver autenticado
      if (!isAuthenticated) {
        // Guarde o caminho atual para retornar depois do login
        const currentPath = window.location.pathname;
        sessionStorage.setItem("returnTo", currentPath);

        // Use redirecionamento direto em vez de Navigate
        window.location.href = ROUTES.auth.login;
      }
    }
  }, [isAuthenticated]);

  // Sempre renderize os filhos, o redirecionamento acontece via useEffect
  return <>{children}</>;
}
