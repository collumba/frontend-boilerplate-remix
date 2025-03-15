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

const variants = {
  info: {
    container: "bg-blue-50 border-blue-200",
    title: "text-blue-900",
    description: "text-blue-800",
    progress: "bg-blue-200",
  },
  success: {
    container: "bg-green-100 border-green-200",
    title: "text-green-900",
    description: "text-green-800",
    progress: "bg-green-200",
  },
  warning: {
    container: "bg-yellow-100 border-yellow-200",
    title: "text-yellow-900",
    description: "text-yellow-800",
    progress: "bg-yellow-200",
  },
  error: {
    container: "bg-red-100 border-red-200",
    title: "text-red-900",
    description: "text-red-800",
    progress: "bg-red-200",
  },
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
          variants[variant].container,
          positions[position],
          "animate-slide-in",
          className,
        )}
        ref={ref}
        role="alert"
        {...props}
      >
        <div className="p-4">
          {title && (
            <h4 className={cn("mb-1 font-medium", variants[variant].title)}>
              {title}
            </h4>
          )}
          {description && (
            <p className={cn("text-sm", variants[variant].description)}>
              {description}
            </p>
          )}
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
                variants[variant].progress
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
