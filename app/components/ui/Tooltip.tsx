import { cn } from "@utils/cn";
import {
  HTMLAttributes,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content" | "children"> {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  maxWidth?: number;
  arrow?: boolean;
  disabled?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      content,
      children,
      position = "top",
      delay = 0,
      maxWidth = 200,
      arrow = true,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({
      top: 0,
      left: 0,
    });
    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number>();

    const showTooltip = () => {
      if (disabled) return;
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const hideTooltip = () => {
      clearTimeout(timeoutRef.current);
      setIsVisible(false);
    };

    useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, []);

    useEffect(() => {
      if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

      const trigger = triggerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();
      const spacing = 8;

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = trigger.top - tooltip.height - spacing;
          left = trigger.left + (trigger.width - tooltip.width) / 2;
          break;
        case "right":
          top = trigger.top + (trigger.height - tooltip.height) / 2;
          left = trigger.right + spacing;
          break;
        case "bottom":
          top = trigger.bottom + spacing;
          left = trigger.left + (trigger.width - tooltip.width) / 2;
          break;
        case "left":
          top = trigger.top + (trigger.height - tooltip.height) / 2;
          left = trigger.left - tooltip.width - spacing;
          break;
      }

      // Adjust for scroll position
      top += window.scrollY;
      left += window.scrollX;

      setTooltipPosition({ top, left });
    }, [isVisible, position]);

    const positions = {
      top: "-translate-y-1",
      right: "translate-x-1",
      bottom: "translate-y-1",
      left: "-translate-x-1",
    };

    const arrowPositions = {
      top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-900",
      right:
        "left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-gray-900",
      bottom:
        "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-900",
      left: "right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-gray-900",
    };

    const trigger = isValidElement(children)
      ? cloneElement(children as React.ReactElement, {
          ref: triggerRef,
          onMouseEnter: showTooltip,
          onMouseLeave: hideTooltip,
          onFocus: showTooltip,
          onBlur: hideTooltip,
        })
      : children;

    return (
      <>
        {trigger}
        {isVisible &&
          createPortal(
            <div
              ref={tooltipRef}
              className={cn(
                "fixed z-50 rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-sm",
                `transform transition-transform duration-100`,
                positions[position],
                className,
              )}
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left,
                maxWidth,
              }}
              role="tooltip"
              {...props}
            >
              {content}
              {arrow && (
                <div
                  className={cn(
                    "absolute border-4 border-transparent",
                    arrowPositions[position],
                  )}
                />
              )}
            </div>,
            document.body,
          )}
      </>
    );
  },
);
