import { cn } from "app/lib/utils";
import { HTMLAttributes, ReactNode, forwardRef } from "react";
export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  actions?: ReactNode;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className, children, logo, actions, ...props }, ref) => {
    return (
      <header ref={ref} className={cn("border-b ", className)} {...props}>
        <div>
          <div className="flex h-16 items-center justify-between ml-2">
            <div className="flex items-center">
              {logo && <div className="ml-6">{logo}</div>}
            </div>
            <div className="flex items-center space-x-4">
              {actions}
              {children}
            </div>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";
