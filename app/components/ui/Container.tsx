import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", padding = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          {
            "mx-auto w-full": true,
            "px-4 sm:px-6 lg:px-8": padding,
            "max-w-screen-sm": size === "sm",
            "max-w-screen-md": size === "md",
            "max-w-screen-lg": size === "lg",
            "max-w-screen-xl": size === "xl",
            "max-w-screen-2xl": size === "2xl",
            "max-w-none": size === "full",
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
