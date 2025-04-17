import { LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/cn";

import { Typography } from "./typography";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon: Icon, title, description, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
          className
        )}
        {...props}
      >
        {Icon && (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Icon className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        {description && (
          <Typography
            as="p"
            className="mb-4 mt-2 text-sm text-muted-foreground"
          >
            {description}
          </Typography>
        )}
        {children}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
