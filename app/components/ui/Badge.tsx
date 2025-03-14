import { HTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  isOutline?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isOutline = false,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full";

    const variants = {
      solid: {
        primary: "bg-primary-100 text-primary-800",
        secondary: "bg-secondary-100 text-secondary-800",
        success: "bg-success-100 text-success-800",
        error: "bg-error-100 text-error-800",
        warning: "bg-warning-100 text-warning-800",
        info: "bg-info-100 text-info-800",
      },
      outline: {
        primary: "border border-primary-200 text-primary-800",
        secondary: "border border-secondary-200 text-secondary-800",
        success: "border border-success-200 text-success-800",
        error: "border border-error-200 text-error-800",
        warning: "border border-warning-200 text-warning-800",
        info: "border border-info-200 text-info-800",
      },
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm",
      lg: "px-3 py-1 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          isOutline ? variants.outline[variant] : variants.solid[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
