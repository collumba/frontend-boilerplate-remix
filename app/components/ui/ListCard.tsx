import { cn } from "@utils/cn";
import { forwardRef } from "react";
import { Typography } from "./Typography";

export interface ListCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  divider?: boolean;
}

export const ListCard = forwardRef<HTMLDivElement, ListCardProps>(
  (
    { className, title, subtitle, icon, action, footer, divider, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
          className
        )}
        {...props}
      >
        <div className="p-4">
          {(title || subtitle || icon || action) && (
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {icon && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800">
                    {icon}
                  </div>
                )}
                <div>
                  {title && (
                    <Typography variant="subtitle1" color="primary">
                      {title}
                    </Typography>
                  )}
                  {subtitle && (
                    <Typography variant="body2" color="secondary">
                      {subtitle}
                    </Typography>
                  )}
                </div>
              </div>
              {action && <div>{action}</div>}
            </div>
          )}
          <div className={cn("space-y-4", divider && "divide-y divide-gray-200 dark:divide-gray-800")}>
            {children}
          </div>
        </div>
        {footer && (
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800/50">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

ListCard.displayName = "ListCard";
