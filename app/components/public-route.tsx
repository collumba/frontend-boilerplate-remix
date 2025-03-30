import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { ReactNode, useEffect } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuthContext();

  // Use um useEffect para redirecionar em vez de render-time redirect
  useEffect(() => {
    // Certifique-se de que estamos no navegador e não no servidor
    if (typeof window !== "undefined") {
      // Redirecione somente se estiver autenticado
      if (isAuthenticated) {
        // Verificar se há uma rota de retorno salva
        const returnTo = sessionStorage.getItem("returnTo") || ROUTES.app.root;

        // Limpar o valor salvo
        sessionStorage.removeItem("returnTo");

        // Use redirecionamento direto em vez de Navigate
        window.location.href = returnTo;
      }
    }
  }, [isAuthenticated]);

  // Sempre renderize os filhos, o redirecionamento acontece via useEffect
  return <>{children}</>;
}
