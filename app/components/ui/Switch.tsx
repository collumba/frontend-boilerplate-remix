import { cn } from "@utils/cn";
import { forwardRef, InputHTMLAttributes } from "react";

export interface SwitchProps {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps & Omit<InputHTMLAttributes<HTMLInputElement>, "size">>(
  (
    { className, label, error, helperText, size = "md", disabled, ...props },
    ref,
  ) => {
    const baseStyles =
      "relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2";
    const sizes = {
      sm: "h-5 w-9",
      md: "h-6 w-11",
      lg: "h-7 w-14",
    };
    const thumbSizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };
    const variants = {
      default: "bg-gray-200 peer-checked:bg-primary-600",
      error: "bg-error-100 peer-checked:bg-error-600",
      disabled: "bg-gray-100 cursor-not-allowed peer-checked:bg-gray-400",
    };

    return (
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            type="checkbox"
            ref={ref}
            className={cn("peer sr-only", disabled && "cursor-not-allowed")}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${props.id}-error`
                : helperText
                  ? `${props.id}-description`
                  : undefined
            }
            {...props}
          />
          <div
            className={cn(
              baseStyles,
              sizes[size as keyof typeof sizes],
              error ? variants.error : variants.default,
              disabled && variants.disabled,
              className,
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                thumbSizes[size as keyof typeof thumbSizes],
                "translate-x-0.5 peer-checked:translate-x-[18px]",
                size === "sm" && "peer-checked:translate-x-[14px]",
                size === "lg" && "peer-checked:translate-x-[22px]",
              )}
            />
          </div>
        </div>
        {(label || error || helperText) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={props.id}
                className={cn(
                  "text-sm font-medium",
                  error ? "text-error-900" : "text-gray-900",
                  disabled && "text-gray-500",
                )}
              >
                {label}
              </label>
            )}
            {(error || helperText) && (
              <p
                className={cn(
                  "text-sm",
                  error ? "text-error-600" : "text-gray-500",
                )}
                id={error ? `${props.id}-error` : `${props.id}-description`}
              >
                {error || helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);
