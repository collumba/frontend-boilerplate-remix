import { cn } from "@utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, id, disabled, type = "text", ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-1.5 block text-sm font-medium",
              error ? "text-error-600" : "text-gray-700",
              disabled && "opacity-60"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "w-full rounded-md border-0 px-3 py-1.5 text-sm text-gray-900 shadow-sm",
            "ring-1 ring-inset focus:ring-2 focus:ring-inset",
            error
              ? "ring-error-300 focus:ring-error-500"
              : "ring-gray-300 focus:ring-primary-500",
            disabled && "bg-gray-50 text-gray-500 opacity-60",
            className
          )}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          role={type === "number" ? "spinbutton" : "textbox"}
          {...props}
        />
        {error ? (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-xs text-error-600"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-xs text-gray-500"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
