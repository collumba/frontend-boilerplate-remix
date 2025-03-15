import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  itemClassName?: string;
  activeItemClassName?: string;
  separatorClassName?: string;
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      items,
      separator = "/",
      maxItems,
      itemClassName,
      activeItemClassName,
      separatorClassName,
      ...props
    },
    ref,
  ) => {
    const displayedItems =
      maxItems && items.length > maxItems
        ? [
            ...items.slice(0, Math.max(0, maxItems - 2)),
            { label: "..." },
            items[items.length - 1],
          ]
        : items;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumbs"
        className={cn("", className)}
        {...props}
      >
        <ol className="flex items-center space-x-2 custom-item">
          {displayedItems.map((item, index) => {
            const isLast = index === displayedItems.length - 1;

            return (
              <li
                key={index}
                className={cn("flex items-center", !isLast && "space-x-2")}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center hover:text-primary-600 text-sm font-medium text-gray-500",
                      itemClassName,
                    )}
                  >
                    {item.icon && <span className="mr-1.5">{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      "flex items-center text-sm font-medium",
                      isLast
                        ? cn("text-gray-900 custom-active", activeItemClassName)
                        : "text-gray-500",
                      itemClassName,
                    )}
                  >
                    {item.icon && <span className="mr-1.5">{item.icon}</span>}
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span
                    className={cn("text-gray-400 custom-separator", separatorClassName)}
                    aria-hidden="true"
                  >
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = "Breadcrumbs";
