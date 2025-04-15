import { redirect } from "@remix-run/node";
import { ROUTES } from "src/shared/config/routes";
import { hasAuthToken } from "src/shared/lib/cookie";

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
