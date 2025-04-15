import {
  ToastMessage,
  commitToastSession,
  getToastSession,
} from "@app/modules/toast/session.server";
import { json, redirect } from "@remix-run/node";

type ToastOptions = Omit<ToastMessage, "id" | "createdAt">;

/**
 * Função para retornar um JSON com headers para configurar uma mensagem de toast
 */
export async function jsonWithToast<T>(
  data: T,
  options: ToastOptions,
  init?: ResponseInit
) {
  // Cria uma sessão diretamente
  const session = await getToastSession(new Request("http://localhost"));

  // Adiciona a mensagem de toast à sessão
  const newMessage: ToastMessage = {
    ...options,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  const messages = session.get("toastMessages") || [];
  session.set("toastMessages", [...messages, newMessage]);

  // Obtém o cookie da sessão
  const toastCookie = await commitToastSession(session);

  const headers = new Headers(init?.headers);
  headers.append("Set-Cookie", toastCookie);

  return json(data, {
    ...init,
    headers,
  });
}

/**
 * Função para redirecionar com uma mensagem de toast
 */
export async function redirectWithToast(
  url: string,
  options: ToastOptions,
  init?: ResponseInit
) {
  // Cria uma sessão diretamente
  const session = await getToastSession(new Request("http://localhost"));

  // Adiciona a mensagem de toast à sessão
  const newMessage: ToastMessage = {
    ...options,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  const messages = session.get("toastMessages") || [];
  session.set("toastMessages", [...messages, newMessage]);

  // Obtém o cookie da sessão
  const toastCookie = await commitToastSession(session);

  const headers = new Headers(init?.headers);
  headers.append("Set-Cookie", toastCookie);

  return redirect(url, {
    ...init,
    headers,
  });
}
