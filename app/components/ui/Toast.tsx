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
import { cn } from "~/utils/cn";

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
}

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
          onClose?.();
        }, duration);

        const startTime = Date.now();
        const updateProgress = () => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, (duration - elapsed) / duration) * 100;
          setProgress(remaining);

          if (remaining > 0) {
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
    }, [isOpen, duration, onClose, showProgress]);

    const variants = {
      info: "bg-primary-50 text-primary-900 border-primary-200",
      success: "bg-success-50 text-success-900 border-success-200",
      warning: "bg-warning-50 text-warning-900 border-warning-200",
      error: "bg-error-50 text-error-900 border-error-200",
    };

    const progressColors = {
      info: "bg-primary-200",
      success: "bg-success-200",
      warning: "bg-warning-200",
      error: "bg-error-200",
    };

    const positions = {
      "top-left": "top-0 left-0",
      "top-right": "top-0 right-0",
      "top-center": "top-0 left-1/2 -translate-x-1/2",
      "bottom-left": "bottom-0 left-0",
      "bottom-right": "bottom-0 right-0",
      "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
    };

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
          {title && <h4 className="mb-1 font-medium">{title}</h4>}
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
        {showProgress && (
          <div className="h-1 w-full bg-black/10">
            <div
              className={cn(
                "h-full transition-all duration-100",
                progressColors[variant],
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
