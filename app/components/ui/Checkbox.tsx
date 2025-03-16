import { cn } from "@utils/cn";
import { forwardRef, InputHTMLAttributes } from "react";
import { Typography } from "./Typography";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, error, helperText, indeterminate, disabled, ...props },
    ref,
  ) => {
    const baseStyles =
      "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600";
    const variants = {
      default: "border-gray-300",
      error: "border-error-300",
      disabled: "bg-gray-100 border-gray-200",
    };

    // Handle indeterminate state
    const inputRef = (element: HTMLInputElement | null) => {
      if (element) {
        element.indeterminate = !!indeterminate;
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      }
    };

    return (
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            ref={inputRef}
            className={cn(
              baseStyles,
              error ? variants.error : variants.default,
              disabled && variants.disabled,
              className,
            )}
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
        </div>
        {(label || error || helperText) && (
          <div className="ml-2">
            {label && (
              <Typography
                component="label"
                htmlFor={props.id}
                variant="body2"
                className={cn(
                  "font-medium",
                  error ? "text-error-900" : "text-gray-900",
                  disabled && "text-gray-500"
                )}
              >
                {label}
              </Typography>
            )}
            {(error || helperText) && (
              <Typography
                variant="body2"
                color={error ? "error" : "secondary"}
                id={error ? `${props.id}-error` : `${props.id}-description`}
              >
                {error || helperText}
              </Typography>
            )}
          </div>
        )}
      </div>
    );
  },
);
