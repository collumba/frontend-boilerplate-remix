import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { Typography } from "./Typography";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  isHoverable?: boolean;
  isClickable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      isHoverable = false,
      isClickable = false,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles = "rounded-lg bg-background-800";
    const variants = {
      default: "border border-border-200 p-4",
      bordered: "border-2 border-border-300",
      elevated: "shadow-lg",
    };
    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };
    const interactionStyles = cn(
      isHoverable && "hover:shadow-md",
      isClickable && "cursor-pointer",
    );

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          interactionStyles,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-between", className)}
        {...props}
      >
        <div>
          <Typography variant="h4" color="primary">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="secondary" className="mt-1">
              {subtitle}
            </Typography>
          )}
        </div>
        {action && <div className="ml-4">{action}</div>}
      </div>
    );
  },
);

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(className)}
        {...props}
      >
        <Typography variant="body1" color="secondary">
          {children}
        </Typography>
      </div>
    );
  },
);

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-t pt-4 mt-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
