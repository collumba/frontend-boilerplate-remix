import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { Navigate, useLocation } from "@remix-run/react";
import { ReactNode, useEffect, useState } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
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

  // No cliente, se já estiver autenticado, redirecionar para a página principal
  if (isAuthenticated) {
    // Verificar se há uma rota de retorno salva no estado de navegação
    const from = location.state?.from || ROUTES.app.root;
    return <Navigate to={from} replace />;
  }

  // Não autenticado, renderizar conteúdo público normalmente
  return <>{children}</>;
}
