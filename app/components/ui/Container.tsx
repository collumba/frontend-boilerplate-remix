import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padding?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, size = "lg", padding = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          {
            "max-w-screen-sm": size === "sm",
            "max-w-screen-md": size === "md",
            "max-w-screen-lg": size === "lg",
            "max-w-screen-xl": size === "xl",
            "max-w-screen-2xl": size === "2xl",
            "max-w-none": size === "full",
            "px-4 sm:px-6 lg:px-8": padding,
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
