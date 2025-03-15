import { cn } from "@utils/cn";
import { Menu, X } from "lucide-react";
import { HTMLAttributes, forwardRef, useState } from "react";
import { Container } from "./Container";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navigation?: {
    label: string;
    href: string;
  }[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className, logo, navigation = [], actions, children, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <header
        ref={ref}
        className={cn("border-b bg-white", className)}
        {...props}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              {logo}
              {children}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navigation?.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {actions}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="border-t py-4 md:hidden">
              <nav className="flex flex-col space-y-4">
                {navigation?.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              {actions && (
                <div className="mt-6 flex flex-col space-y-4">{actions}</div>
              )}
            </div>
          )}
        </Container>
      </header>
    );
  },
);

Header.displayName = "Header";
