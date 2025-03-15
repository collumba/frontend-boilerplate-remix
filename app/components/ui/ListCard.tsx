import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { Grid } from "./Grid";

export interface ListCardProps<T> extends HTMLAttributes<HTMLDivElement> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: number;
  layout?: "grid" | "list";
  loading?: boolean;
  emptyState?: React.ReactNode;
}

export const ListCard = forwardRef<HTMLDivElement, ListCardProps<any>>(
  (
    {
      className,
      items,
      renderItem,
      cols = 3,
      gap = 4,
      layout = "grid",
      loading = false,
      emptyState,
      ...props
    },
    ref,
  ) => {
    if (loading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <div
            data-testid="loading-skeleton"
            className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"
            role="status"
          />
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="flex h-64 items-center justify-center text-gray-500">
          {emptyState || "No items to display"}
        </div>
      );
    }

    if (layout === "list") {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col", className)}
          {...props}
        >
          <div className="divide-y rounded-lg border bg-white">
            {items.map((item, index) => (
              <div key={index} className="p-4">
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      >
        <div className={cn(
          "grid grid-cols-3 gap-4 custom-class"
        )}>
          {items.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border bg-white p-4 shadow-sm"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

ListCard.displayName = "ListCard";
