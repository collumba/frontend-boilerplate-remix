import { ToastMessage } from "@/modules/toast/session.server";
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
 * Hook to add toasts using translations
 */
export function useToastI18n() {
  const { actions } = useToast();
  const { t } = useTranslation();

  return {
    success: (
      key: string,
      options?: Record<string, string | number | boolean>,
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
      options?: Record<string, string | number | boolean>,
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
      options?: Record<string, string | number | boolean>,
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
      options?: Record<string, string | number | boolean>,
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
  // State to store toasts
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  // Reference to track processed toasts
  const processedToastIds = React.useRef(new Set<string>());

  // Search for server toasts from loader data
  const matches = useMatches();
  const rootData = matches[0]?.data as LoaderData | undefined;

  // Initialize toasts with server toasts when they change
  React.useEffect(() => {
    const serverToasts = rootData?.toasts || [];
    
    if (serverToasts.length > 0) {
      const newToasts = serverToasts.filter(
        (toast) => !processedToastIds.current.has(toast.id)
      );

      if (newToasts.length > 0) {
        // Mark as processed
        newToasts.forEach((toast) => {
          processedToastIds.current.add(toast.id);
        });

        // Add to list
        setToasts((prev) => [...prev, ...newToasts]);
      }
    }
  }, [rootData]);

  const actions: ToastAction = {
    addToast: (toast) => {
      const newToast: ToastMessage = {
        ...toast,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
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
