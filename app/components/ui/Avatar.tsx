import { HTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils/cn";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "circle" | "square";
  status?: "online" | "offline" | "away" | "busy";
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      size = "md",
      variant = "circle",
      status,
      ...props
    },
    ref,
  ) => {
    const baseStyles = "relative inline-block flex-shrink-0";

    const sizes = {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-14 w-14 text-xl",
    };

    const variants = {
      circle: "rounded-full",
      square: "rounded-md",
    };

    const statusColors = {
      online: "bg-success-500",
      offline: "bg-gray-500",
      away: "bg-warning-500",
      busy: "bg-error-500",
    };

    const statusSizes = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
    };

    const getFallbackText = () => {
      if (fallback) return fallback;
      if (alt) {
        const words = alt.split(" ");
        if (words.length === 1) {
          return words[0].substring(0, 2).toUpperCase();
        }
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
      }
      return "";
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className={cn("h-full w-full object-cover", variants[variant])}
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gray-200",
              variants[variant],
            )}
            aria-label={alt}
          >
            <span className="font-medium text-gray-600">
              {getFallbackText()}
            </span>
          </div>
        )}
        {status && (
          <span
            className={cn(
              "absolute right-0 top-0 block -translate-y-1/4 translate-x-1/4 transform rounded-full ring-2 ring-white",
              statusColors[status],
              statusSizes[size],
            )}
          />
        )}
      </div>
    );
  },
);
