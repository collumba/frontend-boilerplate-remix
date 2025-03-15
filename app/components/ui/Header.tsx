import { cn } from "@utils/cn";
import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Container } from "./Container";

export interface HeaderNavItem {
  label: string;
  href: string;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  navigation?: HeaderNavItem[];
  actions?: ReactNode;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className, children, logo, navigation, actions, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn("border-b bg-white", className)}
        {...props}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {logo && <div className="mr-4">{logo}</div>}
              
              {navigation && navigation.length > 0 && (
                <nav className="hidden space-x-8 md:flex">
                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {actions}
              {children}
            </div>
          </div>
        </Container>
      </header>
    );
  },
);

Header.displayName = "Header";
