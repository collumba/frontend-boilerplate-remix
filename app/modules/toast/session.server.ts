import { createCookieSessionStorage } from "@remix-run/node";
import { env } from "env";

export type ToastMessage = {
  id: string;
  type: "success" | "error" | "warning" | "info" | "default";
  title: string;
  description?: string;
  createdAt: number;
};

const isProduction = env.NODE_ENV === "production";

// Cria o storage de sessão para os toasts
const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "toast_messages",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["toast_secret"],
    // Define domínio e secure apenas em produção
    ...(isProduction
      ? { domain: "your-production-domain.com", secure: true }
      : {}),
  },
});

// Funções para gerenciar os toasts na sessão
export async function getToastSession(request: Request) {
  return toastSessionStorage.getSession(request.headers.get("Cookie"));
}

export async function commitToastSession(session: any) {
  return toastSessionStorage.commitSession(session);
}

// Funções para gerenciar os toasts na sessão
export async function getToastMessages(
  request: Request
): Promise<ToastMessage[]> {
  const session = await getToastSession(request);
  const messages = session.get("toastMessages") || [];
  return messages;
}

export async function setToastMessage(
  request: Request,
  message: Omit<ToastMessage, "id" | "createdAt">
): Promise<string> {
  const session = await getToastSession(request);
  const messages = session.get("toastMessages") || [];

  // Cria uma nova mensagem com ID único e timestamp
  const newMessage: ToastMessage = {
    ...message,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  // Adiciona a nova mensagem à lista
  session.set("toastMessages", [...messages, newMessage]);

  // Retorna um cookie com a sessão atualizada
  return await commitToastSession(session);
}

export async function clearToastMessages(request: Request): Promise<string> {
  const session = await getToastSession(request);
  session.set("toastMessages", []);
  return await commitToastSession(session);
}
