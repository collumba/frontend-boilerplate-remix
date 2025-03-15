import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef, useMemo } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarVariant = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "away" | "busy";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = "",
      fallback,
      size = "md",
      variant = "circle",
      status,
      ...props
    },
    ref,
  ) => {
    const getInitials = (name: string): string => {
      if (!name) return "";
      
      const parts = name.split(" ");
      if (parts.length === 1) {
        return name.substring(0, 2).toUpperCase();
      }
      
      return (
        (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")
      ).toUpperCase();
    };

    const sizeClasses = {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
    };

    const variantClasses = {
      circle: "rounded-full",
      square: "rounded-md",
    };

    const statusClasses = {
      online: "bg-success-500",
      offline: "bg-gray-400",
      away: "bg-warning-500",
      busy: "bg-error-500",
    };

    const statusSizeClasses = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
    };

    const initials = useMemo(() => {
      if (fallback) return fallback;
      return getInitials(alt);
    }, [fallback, alt]);

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden bg-gray-200 text-gray-600",
            sizeClasses[size],
            variantClasses[variant],
          )}
          aria-label={alt}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="font-medium">{initials}</span>
          )}
        </div>

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
              statusClasses[status],
              statusSizeClasses[size],
            )}
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
