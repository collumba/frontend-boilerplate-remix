import { createCookieSessionStorage, redirect } from "@remix-run/node";

// Supported toast types
export type ToastType = "success" | "error" | "warning" | "info" | "default";

// Interface for toast messages
export interface ToastMessage {
  type: ToastType;
  title?: string;
  description?: string;
  titleParams?: Record<string, string>;
  descriptionParams?: Record<string, string>;
}

// Session storage configuration
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "app_flash_messages",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cr3t"], // Replace with a real secret in production
    secure: process.env.NODE_ENV === "production",
    maxAge: 60, // 60 seconds, since they are flash messages
  },
});

/**
 * Function to get the session from the request
 */
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

/**
 * Adds a flash message to the session and redirects to a URL
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
 * Gets all flash messages from the session and clears the session
 */
export async function getToastsAndCommit(request: Request) {
  const session = await getSession(request);

  // Get all messages
  const messages = (session.get("toasts") || []) as ToastMessage[];

  console.log(`Got ${messages.length} messages from the flash session`);
  if (messages.length > 0) {
    console.log(`Messages: ${JSON.stringify(messages)}`);
  }

  // Clear messages (flash)
  session.unset("toasts");

  // Return messages and a header to clear the session
  return {
    messages,
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  };
}

/**
 * Creates a generic toast in the session and returns the headers
 */
function setToastInSession(message: ToastMessage, session: any) {
  const messages = (session.get("toasts") || []) as ToastMessage[];
  messages.push(message);
  session.set("toasts", messages);
}

/**
 * Utilities to create specific toasts
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
