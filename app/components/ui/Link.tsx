import type { LinkProps as RemixLinkProps } from "@remix-run/react";
import { Link as RemixLink } from "@remix-run/react";
import { cn } from "@utils/cn";
import { forwardRef } from "react";
import { Typography } from "./Typography";

export interface LinkProps extends Omit<RemixLinkProps, 'className'> {
  variant?: "default" | "button" | "underline";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "error" | "warning" | "success" | "info";
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

const variants = {
  default: "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  button: "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  underline: "underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
};

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const colors = {
  primary: {
    default: "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300",
    button: "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400",
  },
  secondary: {
    default: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
    button: "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400",
  },
  error: {
    default: "text-error-600 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300",
    button: "bg-error-600 text-white hover:bg-error-700 dark:bg-error-500 dark:hover:bg-error-400",
  },
  warning: {
    default: "text-warning-600 hover:text-warning-700 dark:text-warning-400 dark:hover:text-warning-300",
    button: "bg-warning-600 text-white hover:bg-warning-700 dark:bg-warning-500 dark:hover:bg-warning-400",
  },
  success: {
    default: "text-success-600 hover:text-success-700 dark:text-success-400 dark:hover:text-success-300",
    button: "bg-success-600 text-white hover:bg-success-700 dark:bg-success-500 dark:hover:bg-success-400",
  },
  info: {
    default: "text-info-600 hover:text-info-700 dark:text-info-400 dark:hover:text-info-300",
    button: "bg-info-600 text-white hover:bg-info-700 dark:bg-info-500 dark:hover:bg-info-400",
  },
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      color = "primary",
      disabled = false,
      external = false,
      icon,
      iconPosition = "left",
      to,
      children,
      ...props
    },
    ref
  ) => {
    const colorStyle = variant === "button" ? colors[color].button : colors[color].default;
    const commonProps = {
      className: cn(
        variants[variant],
        sizes[size],
        colorStyle,
        "inline-flex items-center gap-2",
        disabled && "pointer-events-none opacity-50",
        className
      ),
      ref,
      ...props,
    };

    // For external links, use a regular anchor tag
    if (external) {
      return (
        <Typography
          component="a"
          href={disabled ? undefined : (to as string)}
          target="_blank"
          rel="noopener noreferrer"
          {...commonProps}
        >
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
          <svg
            className={cn("h-4 w-4", size === "sm" && "h-3 w-3", size === "lg" && "h-5 w-5")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Typography>
      );
    }

    // For internal links, use Remix's Link component
    return (
      <Typography
        component={RemixLink}
        to={disabled ? "" : to}
        {...commonProps}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </Typography>
    );
  }
);

Link.displayName = "Link"; 