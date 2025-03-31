import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import * as React from "react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
} from "@app/components/ui/toast";
import { useTranslation } from "react-i18next";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

export type ToastActionProps = {
  altText: string;
  action: ToastActionElement;
  cancel: string;
};

export type ToastIconProps = {
  icon?: React.ReactNode;
};

export type ToastT = {
  id: string;
  title?: string;
  titleParams?: Record<string, string>;
  description?: string;
  descriptionParams?: Record<string, string>;
  action?: ToastActionProps;
  icon?: React.ReactNode;
  variant?: ToastProps["variant"];
  duration?: number;
  open?: boolean;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return `toast-${count}`;
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToastT;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToastT> & Pick<ToastT, "id">;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToastT[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string, duration = TOAST_REMOVE_DELAY) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.DISMISS_TOAST,
      toastId,
    });
  }, duration);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({
            ...t,
            open: false,
          })),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      };
    }

    case actionTypes.REMOVE_TOAST: {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }
  }
};

const listeners: ((state: State) => void)[] = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

interface ToastCtx extends State {
  toast: (props: Omit<ToastT, "id" | "open">) => void;
  success: (props: Omit<ToastT, "id" | "open" | "variant" | "icon">) => void;
  error: (props: Omit<ToastT, "id" | "open" | "variant" | "icon">) => void;
  warning: (props: Omit<ToastT, "id" | "open" | "variant" | "icon">) => void;
  info: (props: Omit<ToastT, "id" | "open" | "variant" | "icon">) => void;
  update: (id: string, props: Partial<ToastT>) => void;
  dismiss: (id?: string) => void;
  clearAll: () => void;
}

export const ToastContext = React.createContext<ToastCtx>({
  toasts: [],
  toast: () => {},
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
  update: () => {},
  dismiss: () => {},
  clearAll: () => {},
});

export function useToast() {
  return React.useContext(ToastContext);
}

export function ToastContainer() {
  const { t } = useTranslation();
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return (
    <ToastProvider>
      {state.toasts.map(function ({
        id,
        title,
        titleParams,
        description,
        descriptionParams,
        variant,
        action,
        open,
        icon,
        ...props
      }) {
        return (
          <Toast
            key={id}
            open={open}
            variant={variant}
            onOpenChange={(open: boolean) => {
              if (!open) {
                dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });
              }
            }}
            {...props}
          >
            <div className="flex">
              {icon && <div className="mr-3 pt-0.5">{icon}</div>}
              <div className="grid gap-1">
                {title && <ToastTitle>{t(title, titleParams)}</ToastTitle>}
                {description && (
                  <ToastDescription>
                    {t(description, descriptionParams)}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action && action.action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const toast = React.useCallback((props: Omit<ToastT, "id" | "open">) => {
    const id = genId();
    const toast = {
      id,
      open: true,
      ...props,
      duration: props.duration || TOAST_REMOVE_DELAY,
    };

    dispatch({ type: actionTypes.ADD_TOAST, toast });

    // Auto-dismiss toast after duration
    addToRemoveQueue(id, toast.duration);

    return id;
  }, []);

  const success = React.useCallback(
    (props: Omit<ToastT, "id" | "open" | "variant" | "icon">) => {
      return toast({
        ...props,
        variant: "success",
        icon: <CheckCircle className="h-5 w-5" />,
      });
    },
    [toast]
  );

  const error = React.useCallback(
    (props: Omit<ToastT, "id" | "open" | "variant" | "icon">) => {
      return toast({
        ...props,
        variant: "destructive",
        icon: <XCircle className="h-5 w-5" />,
      });
    },
    [toast]
  );

  const warning = React.useCallback(
    (props: Omit<ToastT, "id" | "open" | "variant" | "icon">) => {
      return toast({
        ...props,
        variant: "warning",
        icon: <AlertCircle className="h-5 w-5" />,
      });
    },
    [toast]
  );

  const info = React.useCallback(
    (props: Omit<ToastT, "id" | "open" | "variant" | "icon">) => {
      return toast({
        ...props,
        variant: "info",
        icon: <Info className="h-5 w-5" />,
      });
    },
    [toast]
  );

  const update = React.useCallback((id: string, props: Partial<ToastT>) => {
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: {
        id,
        ...props,
      },
    });
  }, []);

  const dismiss = React.useCallback((id?: string) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });
  }, []);

  const clearAll = React.useCallback(() => {
    dispatch({ type: actionTypes.REMOVE_TOAST });
  }, []);

  const ctx = React.useMemo(
    () => ({
      toasts: state.toasts,
      toast,
      success,
      error,
      warning,
      info,
      update,
      dismiss,
      clearAll,
    }),
    [state, toast, success, error, warning, info, update, dismiss, clearAll]
  );

  return <ToastContext.Provider value={ctx}>{children}</ToastContext.Provider>;
}
