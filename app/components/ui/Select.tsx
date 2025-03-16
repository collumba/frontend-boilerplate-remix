import { cn } from "@utils/cn";
import { forwardRef, useId } from "react";
import { Typography } from "./Typography";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, label, error, helperText, id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

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
        <select
          id={id}
          className={cn(
            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <Typography
            id={errorId}
            variant="body2"
            color="error"
            className="mt-2"
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

Select.displayName = "Select";
