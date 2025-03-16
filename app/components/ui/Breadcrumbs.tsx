import { cn } from "@utils/cn";
import { forwardRef } from "react";
import { Typography } from "./Typography";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
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
            ...items.slice(-1),
          ]
        : items;

    return (
      <nav
        ref={ref}
        className={cn("flex", className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol
          className="flex flex-wrap items-center space-x-2"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {displayedItems.map((item, index) => {
            const isLast = index === displayedItems.length - 1;
            const position = index + 1;

            return (
              <li
                key={index}
                className={cn("flex items-center", !isLast && "space-x-2")}
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                {item.href ? (
                  <Typography
                    component="a"
                    href={item.href}
                    variant="body2"
                    color="secondary"
                    className={cn(
                      "flex items-center hover:text-primary-600",
                      itemClassName
                    )}
                    itemProp="item"
                  >
                    {item.icon && (
                      <span className="mr-1.5" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span itemProp="name">{item.label}</span>
                    <meta itemProp="position" content={position.toString()} />
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    color={isLast ? "primary" : "secondary"}
                    className={cn(
                      "flex items-center",
                      isLast && activeItemClassName,
                      itemClassName
                    )}
                    aria-current={isLast ? "page" : undefined}
                    itemProp="name"
                  >
                    {item.icon && (
                      <span className="mr-1.5" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                    <meta itemProp="position" content={position.toString()} />
                  </Typography>
                )}
                {!isLast && (
                  <Typography
                    variant="body2"
                    color="secondary"
                    className={cn("mx-2", separatorClassName)}
                    aria-hidden="true"
                  >
                    {separator}
                  </Typography>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";
