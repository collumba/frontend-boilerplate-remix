import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef, useEffect, useRef, useState } from "react";
import { Typography } from "./Typography";

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  showTooltip?: boolean;
  formatTooltip?: (value: number) => string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onChange,
      disabled = false,
      showTooltip = false,
      formatTooltip = (value) => `${value}`,
      size = "md",
      label,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState(
      value ?? defaultValue ?? min
    );
    const [isDragging, setIsDragging] = useState(false);
    const [showTooltipValue, setShowTooltipValue] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (value !== undefined && value !== currentValue) {
        setCurrentValue(value);
      }
    }, [value]);

    const getPercentage = (value: number) => {
      return ((value - min) / (max - min)) * 100;
    };

    const getValueFromPosition = (position: number) => {
      const percentage = position;
      const rawValue = (percentage * (max - min)) / 100 + min;
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.min(Math.max(steppedValue, min), max);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const position = ((event.clientX - rect.left) / rect.width) * 100;
      const newValue = getValueFromPosition(position);

      setCurrentValue(newValue);
      onChange?.(newValue);
      setIsDragging(true);
      setShowTooltipValue(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || disabled) return;

      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const position = ((event.clientX - rect.left) / rect.width) * 100;
      const newValue = getValueFromPosition(position);

      setCurrentValue(newValue);
      onChange?.(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setShowTooltipValue(false);
    };

    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging]);

    const sizes = {
      sm: {
        track: "h-1",
        thumb: "h-3 w-3",
        thumbOffset: "-top-1",
      },
      md: {
        track: "h-2",
        thumb: "h-4 w-4",
        thumbOffset: "-top-1",
      },
      lg: {
        track: "h-3",
        thumb: "h-5 w-5",
        thumbOffset: "-top-1",
      },
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative py-4",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {label && <Typography variant="body2">{label}</Typography>}
        <div
          ref={trackRef}
          className={cn(
            "relative w-full rounded-full bg-gray-200",
            sizes[size].track
          )}
          onMouseDown={handleMouseDown}
          role="presentation"
        >
          <div
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-disabled={disabled}
            aria-label={label || "Slider"}
            tabIndex={disabled ? -1 : 0}
            className={cn(
              "absolute rounded-full bg-primary-600",
              sizes[size].track
            )}
            style={{ width: `${getPercentage(currentValue)}%` }}
          />
          <div
            className={cn(
              "absolute rounded-full bg-white border-2 border-primary-600 transition-transform",
              disabled
                ? "cursor-not-allowed"
                : "cursor-grab active:cursor-grabbing",
              sizes[size].thumb,
              sizes[size].thumbOffset
            )}
            style={{
              left: `${getPercentage(currentValue)}%`,
              transform: "translateX(-50%)",
            }}
          >
            {(showTooltip || showTooltipValue) && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2">
                <div className="rounded bg-gray-900 px-2 py-1 text-xs text-white">
                  {formatTooltip(currentValue)}
                </div>
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
