import { ROUTES } from "@app/shared/config/routes";
import { hasAuthToken } from "@app/shared/lib/cookie";
import { redirect } from "@remix-run/node";

/**
 * Checks if the user is authenticated on the server and redirects to login if not
 */
export async function requireAuth(request: Request) {
  if (!hasAuthToken(request)) {
    throw redirect(ROUTES.auth.login);
  }
}

/**
 * Checks if the user is authenticated on the server and redirects to the protected area if they are
 */
export async function requireGuest(request: Request) {
  if (hasAuthToken(request)) {
    throw redirect(ROUTES.app.root);
  }
}
