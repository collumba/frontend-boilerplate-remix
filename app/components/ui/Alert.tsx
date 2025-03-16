import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { Typography } from "./Typography";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant = "info", title, icon, children, onClose, ...props },
    ref,
  ) => {
    const baseStyles = "relative rounded-lg p-4";

    const variants = {
      info: "bg-primary-50 text-primary-800 border border-primary-200",
      success: "bg-success-50 text-success-800 border border-success-200",
      warning: "bg-warning-50 text-warning-800 border border-warning-200",
      error: "bg-error-50 text-error-800 border border-error-200",
    };

    const iconColors = {
      info: "text-primary-500",
      success: "text-success-500",
      warning: "text-warning-500",
      error: "text-error-500",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        role="alert"
        {...props}
      >
        <div className="flex">
          {icon && (
            <div className={cn("mr-3 flex-shrink-0", iconColors[variant])}>
              {icon}
            </div>
          )}
          <div className="w-full">
            {title && (
              <Typography variant="subtitle1" className="mb-1">
                {title}
              </Typography>
            )}
            <Typography variant="body2" className="opacity-90">
              {children}
            </Typography>
          </div>
          {onClose && (
            <button
              type="button"
              className={cn(
                "ml-3 inline-flex flex-shrink-0 items-center justify-center rounded-md p-1.5 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                `focus:ring-${variant}-500`,
              )}
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";
