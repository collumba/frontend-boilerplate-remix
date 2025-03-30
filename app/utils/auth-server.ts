import { ROUTES } from "@app/config/routes";
import { redirect } from "@remix-run/node";
import { hasAuthToken } from "./cookie";

/**
 * Verifica se o usuário está autenticado no servidor e redireciona para login se não estiver
 */
export async function requireAuth(request: Request) {
  if (!hasAuthToken(request)) {
    throw redirect(ROUTES.auth.login);
  }
}

/**
 * Verifica se o usuário está autenticado no servidor e redireciona para área protegida se estiver
 */
export async function requireGuest(request: Request) {
  if (hasAuthToken(request)) {
    throw redirect(ROUTES.app.root);
  }
}
