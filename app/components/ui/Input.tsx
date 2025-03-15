import { forwardRef, useId } from "react";
import { cn } from "@utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id: propId, type = "text", ...props }, ref) => {
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
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          role={
            getRole()
          }
          type={type}
          className={cn(
            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500",
            error && "border-error-300 ring-error-300 focus:border-error-300 focus:ring-error-300",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          ref={ref}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-2 text-sm text-error-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
