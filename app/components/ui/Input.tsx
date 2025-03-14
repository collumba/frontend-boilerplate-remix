import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "~/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, label, helperText, type = "text", disabled, ...props },
    ref,
  ) => {
    const baseStyles =
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6";
    const variants = {
      default: "ring-gray-300 placeholder:text-gray-400 focus:ring-primary-600",
      error: "ring-error-300 placeholder:text-error-400 focus:ring-error-500",
      disabled: "bg-gray-50 text-gray-500 cursor-not-allowed",
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "block text-sm font-medium leading-6 mb-1",
              error ? "text-error-700" : "text-gray-900",
              disabled && "text-gray-500",
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={cn(
              baseStyles,
              error ? variants.error : variants.default,
              disabled && variants.disabled,
              className,
            )}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              "mt-1 text-sm",
              error ? "text-error-600" : "text-gray-500",
            )}
            id={error ? `${props.id}-error` : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);
