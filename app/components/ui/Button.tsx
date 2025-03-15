import { cn } from "@utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Spinner } from "./Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300",
      secondary:
        "bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-500 disabled:bg-secondary-100",
      link: "bg-transparent text-primary-600 hover:text-primary-700 hover:underline focus:ring-primary-500 disabled:text-primary-300",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "opacity-70 cursor-not-allowed",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Spinner
            className={cn(
              "mr-2",
              size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
            )}
          />
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  },
);
