import { cn } from "@utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { Container } from "./Container";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navigation?: {
    title: string;
    items: {
      label: string;
      href: string;
    }[];
  }[];
  social?: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
  copyright?: React.ReactNode;
  children?: React.ReactNode;
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      logo,
      navigation = [],
      social = [],
      copyright,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <footer
        ref={ref}
        className={cn("border-t bg-white py-12 md:py-16", className)}
        {...props}
      >
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and description */}
            <div className="space-y-4">
              {logo}
              {children}
            </div>

            {/* Navigation */}
            {navigation?.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items?.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-primary-600"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="mt-12 flex flex-col items-center justify-between space-y-4 border-t pt-8 md:flex-row md:space-y-0">
            <div className="text-sm text-gray-600">
              {copyright}
            </div>

            {/* Social links */}
            {social?.length > 0 && (
              <div className="flex space-x-6">
                {social.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-primary-600"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Container>
      </footer>
    );
  },
);

Footer.displayName = "Footer";
