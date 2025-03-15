import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6;
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 8;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 1,
      gap = 4,
      colsSm,
      colsMd,
      colsLg,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          // Base columns
          {
            "grid-cols-1": cols === 1,
            "grid-cols-2": cols === 2,
            "grid-cols-3": cols === 3,
            "grid-cols-4": cols === 4,
            "grid-cols-5": cols === 5,
            "grid-cols-6": cols === 6,
            "grid-cols-7": cols === 7,
            "grid-cols-8": cols === 8,
            "grid-cols-9": cols === 9,
            "grid-cols-10": cols === 10,
            "grid-cols-11": cols === 11,
            "grid-cols-12": cols === 12,
          },
          // Gap
          {
            "gap-0": gap === 0,
            "gap-1": gap === 1,
            "gap-2": gap === 2,
            "gap-3": gap === 3,
            "gap-4": gap === 4,
            "gap-5": gap === 5,
            "gap-6": gap === 6,
            "gap-8": gap === 8,
            "gap-10": gap === 10,
            "gap-12": gap === 12,
            "gap-16": gap === 16,
          },
          // Small breakpoint (640px)
          {
            "sm:grid-cols-1": colsSm === 1,
            "sm:grid-cols-2": colsSm === 2,
            "sm:grid-cols-3": colsSm === 3,
            "sm:grid-cols-4": colsSm === 4,
            "sm:grid-cols-5": colsSm === 5,
            "sm:grid-cols-6": colsSm === 6,
          },
          // Medium breakpoint (768px)
          {
            "md:grid-cols-1": colsMd === 1,
            "md:grid-cols-2": colsMd === 2,
            "md:grid-cols-3": colsMd === 3,
            "md:grid-cols-4": colsMd === 4,
            "md:grid-cols-5": colsMd === 5,
            "md:grid-cols-6": colsMd === 6,
            "md:grid-cols-8": colsMd === 8,
          },
          // Large breakpoint (1024px)
          {
            "lg:grid-cols-1": colsLg === 1,
            "lg:grid-cols-2": colsLg === 2,
            "lg:grid-cols-3": colsLg === 3,
            "lg:grid-cols-4": colsLg === 4,
            "lg:grid-cols-5": colsLg === 5,
            "lg:grid-cols-6": colsLg === 6,
            "lg:grid-cols-8": colsLg === 8,
            "lg:grid-cols-10": colsLg === 10,
            "lg:grid-cols-12": colsLg === 12,
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = "Grid";
