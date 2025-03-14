import { HTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils/cn";

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
    const baseStyles = "rounded-lg bg-white";
    const variants = {
      default: "border border-gray-200",
      bordered: "border-2 border-gray-300",
      elevated: "shadow-lg",
    };
    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };
    const interactionStyles = cn(
      isHoverable && "transition-shadow duration-200 hover:shadow-md",
      isClickable && "cursor-pointer active:scale-[0.98] transition-transform",
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
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
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
        className={cn("text-sm text-gray-500", className)}
        {...props}
      >
        {children}
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
        className={cn(
          "flex items-center justify-end space-x-2 border-t border-gray-200 pt-4 mt-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
