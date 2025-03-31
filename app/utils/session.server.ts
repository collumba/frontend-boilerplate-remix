import { createCookieSessionStorage, redirect } from "@remix-run/node";

// Tipos de toasts suportados
export type ToastType = "success" | "error" | "warning" | "info" | "default";

// Interface para toast messages
export interface ToastMessage {
  type: ToastType;
  title?: string;
  description?: string;
  titleParams?: Record<string, string>;
  descriptionParams?: Record<string, string>;
}

// Configuração do session storage
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "app_flash_messages",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cr3t"], // Trocar por um segredo real em produção
    secure: process.env.NODE_ENV === "production",
    maxAge: 60, // 60 segundos, já que são flash messages
  },
});

/**
 * Função para obter a session do request
 */
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

/**
 * Adiciona uma flash message na session e redireciona para uma URL
 */
export async function createToastAndRedirect(
  request: Request,
  message: ToastMessage,
  redirectTo: string
) {
  const session = await getSession(request);

  // Salva a mensagem na session
  const messages = (session.get("toasts") || []) as ToastMessage[];
  messages.push(message);
  session.set("toasts", messages);

  // Cria o cabeçalho Set-Cookie e redireciona
  const cookieHeader = await sessionStorage.commitSession(session);

  console.log(`Criando toast e redirecionando para ${redirectTo}`);
  console.log(`Cookie header: ${cookieHeader}`);
  console.log(`Mensagem: ${JSON.stringify(message)}`);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
}

/**
 * Obtém todas as flash messages da session e limpa a session
 */
export async function getToastsAndCommit(request: Request) {
  const session = await getSession(request);

  // Obtém todas as mensagens
  const messages = (session.get("toasts") || []) as ToastMessage[];

  console.log(`Obtidas ${messages.length} mensagens da flash session`);
  if (messages.length > 0) {
    console.log(`Mensagens: ${JSON.stringify(messages)}`);
  }

  // Limpa as mensagens (flash)
  session.unset("toasts");

  // Retorna as mensagens e um cabeçalho para limpar a session
  return {
    messages,
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  };
}

/**
 * Cria um toast genérico na session e retorna os headers
 */
function setToastInSession(message: ToastMessage, session: any) {
  const messages = (session.get("toasts") || []) as ToastMessage[];
  messages.push(message);
  session.set("toasts", messages);
}

/**
 * Utilitários para criar toasts específicos
 */
export async function createSuccessToast(
  request: Request,
  title: string,
  description?: string,
  titleParams?: Record<string, string>,
  descriptionParams?: Record<string, string>,
  redirectTo?: string
) {
  const message: ToastMessage = {
    type: "success",
    title,
    description,
    titleParams,
    descriptionParams,
  };

  if (redirectTo) {
    return createToastAndRedirect(request, message, redirectTo);
  }

  const session = await getSession(request);
  setToastInSession(message, session);

  return {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  };
}

export async function createErrorToast(
  request: Request,
  title: string,
  description?: string,
  titleParams?: Record<string, string>,
  descriptionParams?: Record<string, string>,
  redirectTo?: string
) {
  const message: ToastMessage = {
    type: "error",
    title,
    description,
    titleParams,
    descriptionParams,
  };

  if (redirectTo) {
    return createToastAndRedirect(request, message, redirectTo);
  }

  const session = await getSession(request);
  setToastInSession(message, session);

  return {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  };
}

export async function createWarningToast(
  request: Request,
  title: string,
  description?: string,
  titleParams?: Record<string, string>,
  descriptionParams?: Record<string, string>,
  redirectTo?: string
) {
  const message: ToastMessage = {
    type: "warning",
    title,
    description,
    titleParams,
    descriptionParams,
  };

  if (redirectTo) {
    return createToastAndRedirect(request, message, redirectTo);
  }

  const session = await getSession(request);
  setToastInSession(message, session);

  return {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  };
}

export async function createInfoToast(
  request: Request,
  title: string,
  description?: string,
  titleParams?: Record<string, string>,
  descriptionParams?: Record<string, string>,
  redirectTo?: string
) {
  const message: ToastMessage = {
    type: "info",
    title,
    description,
    titleParams,
    descriptionParams,
  };

  if (redirectTo) {
    return createToastAndRedirect(request, message, redirectTo);
  }

  const session = await getSession(request);
  setToastInSession(message, session);

  return {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  };
}
