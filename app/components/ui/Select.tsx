import { cn } from "@utils/cn";
import { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  error?: string | boolean;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, placeholder, value, disabled, ...props }, ref) => {
    const errorMessage = typeof error === "string" ? error : "Please select an option";

    return (
      <div className="w-full">
        {props.label && (
          <label
            htmlFor={props.id}
            className={cn(
              "block text-sm font-medium leading-6 mb-1",
              error ? "text-error-700" : "text-gray-900",
              disabled && "text-gray-500",
            )}
          >
            {props.label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
              error
                ? "ring-error-300 focus:ring-error-600"
                : "ring-gray-300 focus:ring-primary-600",
              disabled && "bg-gray-50 text-gray-500 cursor-not-allowed",
              className,
            )}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            value={value || ""}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={disabled || option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {(error || props.helperText) && (
          <p
            className={cn(
              "mt-1 text-sm",
              error ? "text-error-600" : "text-gray-500",
            )}
            id={error ? `${props.id}-error` : undefined}
          >
            {error ? errorMessage : props.helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
