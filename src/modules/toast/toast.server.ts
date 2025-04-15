import { json, redirect } from "@remix-run/node";
import { env } from "env";
import {
  ToastMessage,
  commitToastSession,
  getToastSession,
} from "src/modules/toast/session.server";

type ToastOptions = Omit<ToastMessage, "id" | "createdAt">;

/**
 * Function to return a JSON response with a toast notification
 */
export async function jsonWithToastNotification<T>(
  data: T,
  options: ToastOptions,
  init?: ResponseInit
) {
  // Create a session directly
  const session = await getToastSession(new Request(env.DOMAIN));

  // Add the toast message to the session
  const newMessage: ToastMessage = {
    ...options,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  const messages = session.get("toastMessages") || [];
  session.set("toastMessages", [...messages, newMessage]);

  // Get the session cookie
  const toastCookie = await commitToastSession(session);

  const headers = new Headers(init?.headers);
  headers.append("Set-Cookie", toastCookie);

  return json(data, {
    ...init,
    headers,
  });
}

/**
 * Function to redirect with a toast notification
 */
export async function redirectWithToastNotification(
  url: string,
  options: ToastOptions,
  init?: ResponseInit
) {
  // Create a session directly
  const session = await getToastSession(new Request("http://localhost"));

  // Add the toast message to the session
  const newMessage: ToastMessage = {
    ...options,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  const messages = session.get("toastMessages") || [];
  session.set("toastMessages", [...messages, newMessage]);

  // Get the session cookie
  const toastCookie = await commitToastSession(session);

  const headers = new Headers(init?.headers);
  headers.append("Set-Cookie", toastCookie);

  return redirect(url, {
    ...init,
    headers,
  });
}
