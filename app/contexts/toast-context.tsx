import { ToastMessage } from "@app/modules/toast/session.server";
import { useMatches } from "@remix-run/react";
import * as React from "react";
import { useTranslation } from "react-i18next";

export type ToastAction = {
  addToast: (toast: Omit<ToastMessage, "id" | "createdAt">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
};

export const ToastContext = React.createContext<{
  toasts: ToastMessage[];
  actions: ToastAction;
}>({
  toasts: [],
  actions: {
    addToast: () => {},
    removeToast: () => {},
    clearToasts: () => {},
  },
});

export function useToast() {
  return React.useContext(ToastContext);
}

/**
 * Hook para adicionar toasts usando traduções
 */
export function useToastI18n() {
  const { actions } = useToast();
  const { t } = useTranslation();

  return {
    success: (
      key: string,
      options?: Record<string, any>,
      customTitle?: string
    ) => {
      actions.addToast({
        type: "success",
        title: customTitle || t("component.toast.success.title"),
        description: t(key, options),
      });
    },
    error: (
      key: string,
      options?: Record<string, any>,
      customTitle?: string
    ) => {
      actions.addToast({
        type: "error",
        title: customTitle || t("component.toast.error.title"),
        description: t(key, options),
      });
    },
    warning: (
      key: string,
      options?: Record<string, any>,
      customTitle?: string
    ) => {
      actions.addToast({
        type: "warning",
        title: customTitle || t("component.toast.warning.title"),
        description: t(key, options),
      });
    },
    info: (
      key: string,
      options?: Record<string, any>,
      customTitle?: string
    ) => {
      actions.addToast({
        type: "info",
        title: customTitle || t("component.toast.info.title"),
        description: t(key, options),
      });
    },
  };
}

interface LoaderData {
  toasts?: ToastMessage[];
  [key: string]: unknown;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // Estado para armazenar os toasts
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  // Referência para tracking de toasts já processados
  const processedToastIds = React.useRef(new Set<string>());

  // Busca mensagens do servidor a partir dos dados de loader
  const matches = useMatches();
  const rootData = matches[0]?.data as LoaderData | undefined;
  const serverToasts = rootData?.toasts || [];

  // Inicializa os toasts com as mensagens do servidor quando elas mudam
  React.useEffect(() => {
    if (serverToasts.length > 0) {
      const newToasts = serverToasts.filter(
        (toast) => !processedToastIds.current.has(toast.id)
      );

      if (newToasts.length > 0) {
        // Marcar como processados
        newToasts.forEach((toast) => {
          processedToastIds.current.add(toast.id);
        });

        // Adicionar à lista
        setToasts((prev) => [...prev, ...newToasts]);

        console.log("Toasts do servidor processados:", newToasts);
      }
    }
  }, [serverToasts]);

  const actions: ToastAction = {
    addToast: (toast) => {
      const newToast: ToastMessage = {
        ...toast,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      console.log("Toast adicionado pelo cliente:", newToast);
      setToasts((prev) => [...prev, newToast]);
    },
    removeToast: (id) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
    clearToasts: () => {
      setToasts([]);
      processedToastIds.current.clear();
    },
  };

  const value = {
    toasts,
    actions,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
