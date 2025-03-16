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
      "h-5 w-5 rounded border-2 text-primary-600 focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 transition-colors duration-200";
    const variants = {
      default: "border-border-300 hover:border-primary-400",
      error: "border-error-300 hover:border-error-400",
      disabled: "bg-background-100 border-border-200 cursor-not-allowed",
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
      <div className="relative flex items-start gap-3">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            ref={inputRef}
            className={cn(
              baseStyles,
              error ? variants.error : variants.default,
              disabled && variants.disabled,
              className
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
          <div className="flex flex-col gap-0.5">
            {label && (
              <Typography
                component="label"
                htmlFor={props.id}
                variant="body2"
                className={cn(
                  "font-medium cursor-pointer",
                  error ? "text-error-700" : "text-secondary-700",
                  disabled && "text-secondary-400 cursor-not-allowed"
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
                className={cn(
                  error ? "text-error-600" : "text-secondary-500",
                  disabled && "text-secondary-400"
                )}
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
