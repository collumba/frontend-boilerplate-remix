import { cn } from "@utils/cn";
import { X } from "lucide-react";
import { HTMLAttributes, forwardRef } from "react";
import { Typography } from "./Typography";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const variants = {
  info: "bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400",
  success:
    "bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-400",
  warning:
    "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400",
  error: "bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-400",
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant = "info", title, icon, onClose, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex w-full rounded-lg p-4",
          variants[variant],
          className
        )}
        {...props}
      >
        {icon && <span className="mr-3 inline-flex">{icon}</span>}
        <div className="flex-1">
          {title && (
            <Typography variant="subtitle2" color={variant}>
              {title}
            </Typography>
          )}
          {children && (
            <Typography variant="body2" color={variant} className="mt-1">
              {children}
            </Typography>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-3 inline-flex items-center rounded-lg p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
