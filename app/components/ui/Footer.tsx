import { cn } from "@utils/cn";
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { HTMLAttributes, forwardRef } from "react";
import { Container } from "./Container";

export interface FooterNavItem {
  label: string;
  href: string;
}

export interface FooterSocialItem {
  icon: string;
  href: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  copyright?: string;
  navigation?: FooterNavItem[];
  socials?: FooterSocialItem[];
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, children, copyright, navigation, socials, ...props }, ref) => {
    const currentYear = new Date().getFullYear();

    const renderSocialIcon = (icon: string) => {
      switch (icon.toLowerCase()) {
        case "twitter":
          return <Twitter className="h-5 w-5" />;
        case "facebook":
          return <Facebook className="h-5 w-5" />;
        case "instagram":
          return <Instagram className="h-5 w-5" />;
        case "linkedin":
          return <Linkedin className="h-5 w-5" />;
        case "github":
          return <Github className="h-5 w-5" />;
        case "youtube":
          return <Youtube className="h-5 w-5" />;
        default:
          return null;
      }
    };

    return (
      <footer
        ref={ref}
        className={cn("border-t bg-white", className)}
        {...props}
      >
        <Container>
          <div className="flex flex-col py-8 md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">{children}</div>

            <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
              {navigation && navigation.length > 0 && (
                <nav className="flex flex-wrap gap-x-6 gap-y-2">
                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}

              {socials && socials.length > 0 && (
                <div className="flex space-x-4">
                  {socials.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="text-gray-400 hover:text-gray-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {renderSocialIcon(item.icon)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {copyright && (
            <div className="border-t border-gray-200 py-4 text-sm text-gray-500">
              © {currentYear} {copyright}
            </div>
          )}
        </Container>
      </footer>
    );
  },
);

Footer.displayName = "Footer";
