import { useToast } from "@app/hooks/use-toast";
import type { LoaderMessage } from "@app/utils/toast-server";
import { useEffect } from "react";

/**
 * Hook que processa mensagens toast retornadas pelo loader ou action
 */
export function useLoaderToasts(data: unknown) {
  const { toast, success, error, warning, info } = useToast();

  useEffect(() => {
    if (!data || typeof data !== "object") return;

    const loaderData = data as LoaderMessage;

    if (
      loaderData.toasts &&
      Array.isArray(loaderData.toasts) &&
      loaderData.toasts.length > 0
    ) {
      loaderData.toasts.forEach((toastData) => {
        if (!toastData) return;

        const { variant, ...rest } = toastData;

        switch (variant) {
          case "success":
            success(rest);
            break;
          case "destructive":
            error(rest);
            break;
          case "warning":
            warning(rest);
            break;
          case "info":
            info(rest);
            break;
          default:
            toast({ variant, ...rest });
        }
      });
    }
  }, [data, toast, success, error, warning, info]);
}
