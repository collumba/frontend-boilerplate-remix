import { cn } from "@utils/cn";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Typography } from "./Typography";

export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  duration?: number;
  position?: ToastPosition;
  showProgress?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const variants = {
  info: "bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400",
  success: "bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-400",
  warning: "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400",
  error: "bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-400",
};

const positions = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = "info",
      title,
      description,
      isOpen = false,
      onClose,
      duration = 5000,
      position = "bottom-right",
      showProgress = true,
      icon,
      action,
      ...props
    },
    ref,
  ) => {
    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
      setIsVisible(isOpen);
      if (isOpen && duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, duration);

        const startTime = Date.now();
        const updateProgress = () => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, (duration - elapsed) / duration) * 100;
          setProgress(remaining);

          if (remaining > 0 && isVisible) {
            requestAnimationFrame(updateProgress);
          }
        };

        if (showProgress) {
          requestAnimationFrame(updateProgress);
        }

        return () => {
          clearTimeout(timer);
        };
      }
    }, [isOpen, duration, onClose, showProgress, isVisible]);

    if (!isVisible) return null;

    return createPortal(
      <div
        className={cn(
          "fixed z-50 m-4 w-full max-w-sm overflow-hidden rounded-lg border shadow-lg",
          variants[variant],
          positions[position],
          "animate-slide-in",
          className,
        )}
        ref={ref}
        role="alert"
        {...props}
      >
        <div className="p-4">
          <div className="flex items-start">
            {icon && (
              <div className="flex-shrink-0">
                {icon}
              </div>
            )}
            <div className={cn("flex-1", icon && "ml-3")}>
              {title && (
                <Typography variant="subtitle2" color={variant}>
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="body2" color={variant} className="mt-1">
                  {description}
                </Typography>
              )}
              {action && (
                <div className="mt-3 flex space-x-4">
                  {action}
                </div>
              )}
            </div>
            {onClose && (
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex rounded-md hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        {showProgress && (
          <div className="h-1 w-full bg-black/5">
            <div
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className={cn(
                "h-full transition-all duration-100",
                variants[variant]
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>,
      document.body,
    );
  },
);

export interface ToastProviderProps {
  children: ReactNode;
}

export interface ToastContextValue {
  show: (props: Omit<ToastProps, "isOpen">) => void;
  close: () => void;
}

export const ToastContext = createContext<ToastContextValue>({
  show: () => {},
  close: () => {},
});

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const show = (props: Omit<ToastProps, "isOpen">) => {
    setToast({ ...props, isOpen: true });
  };

  const close = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ show, close }}>
      {children}
      {toast && <Toast {...toast} onClose={close} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

Toast.displayName = "Toast";
