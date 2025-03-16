import { cn } from "@utils/cn";
import { forwardRef, useId } from "react";
import { Typography } from "./Typography";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id: propId,
      type = "text",
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const getRole = () => {
      if (type === "number") return "spinbutton";
      if (type === "password") return "textbox";
      return undefined;
    };

    return (
      <div className="w-full">
        {label && (
          <Typography
            component="label"
            htmlFor={id}
            variant="body2"
            className="mb-2 block font-medium"
          >
            {label}
          </Typography>
        )}
        <div className="relative">
          {startIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {startIcon}
            </div>
          )}
          <input
            id={id}
            role={getRole()}
            type={type}
            className={cn(
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500",
              error &&
                "border-error-300 ring-error-300 focus:border-error-300 focus:ring-error-300",
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <Typography
            id={errorId}
            variant="body2"
            color="error"
            className="mt-2"
            role="alert"
          >
            {error}
          </Typography>
        )}
        {helperText && !error && (
          <Typography
            id={helperId}
            variant="body2"
            color="secondary"
            className="mt-2"
          >
            {helperText}
          </Typography>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
