import type { ToastT } from "@app/hooks/use-toast";

export interface LoaderMessage {
  toasts?: Omit<ToastT, "id" | "open">[];
}

/**
 * Adiciona mensagens toast aos dados do loader
 */
export function createLoaderMessages<T>(
  data: T,
  toasts: Omit<ToastT, "id" | "open">[] = []
): T & LoaderMessage {
  if (toasts.length === 0) {
    return { ...data } as T & LoaderMessage;
  }

  return {
    ...data,
    toasts,
  };
}

/**
 * Adiciona uma mensagem de sucesso aos dados do loader
 */
export function withSuccessMessage<T>(
  data: T,
  title?: string,
  description?: string,
  titleParams?: Record<string, string>,
  descriptionParams?: Record<string, string>
): T & LoaderMessage {
  return createLoaderMessages(data, [
    {
      title,
      description,
      titleParams,
      descriptionParams,
      variant: "success",
    },
  ]);
}

/**
 * Adiciona uma mensagem de erro aos dados do loader
 */
export function withErrorMessage<T>(
  data: T,
  title?: string,
  description?: string,
  titleParams?: Record<string, string>,
  descriptionParams?: Record<string, string>
): T & LoaderMessage {
  return createLoaderMessages(data, [
    {
      title,
      description,
      titleParams,
      descriptionParams,
      variant: "destructive",
    },
  ]);
}

/**
 * Adiciona uma mensagem de aviso aos dados do loader
 */
export function withWarningMessage<T>(
  data: T,
  title?: string,
  description?: string,
  titleParams?: Record<string, string>,
  descriptionParams?: Record<string, string>
): T & LoaderMessage {
  return createLoaderMessages(data, [
    {
      title,
      description,
      titleParams,
      descriptionParams,
      variant: "warning",
    },
  ]);
}

/**
 * Adiciona uma mensagem informativa aos dados do loader
 */
export function withInfoMessage<T>(
  data: T,
  title?: string,
  description?: string,
  titleParams?: Record<string, string>,
  descriptionParams?: Record<string, string>
): T & LoaderMessage {
  return createLoaderMessages(data, [
    {
      title,
      description,
      titleParams,
      descriptionParams,
      variant: "info",
    },
  ]);
}
