import { Link as RemixLink } from "@remix-run/react";
import React from "react";

import { cn } from "@/shared/lib/cn";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "muted" | "underline" | "hover";
  external?: boolean;
  to?: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, variant = "default", external, to, href, children, ...props },
    ref
  ) => {
    const styles = cn(
      "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
      {
        // Default variant
        "text-primary hover:text-primary/80": variant === "default",
        // Muted variant
        "text-muted-foreground hover:text-foreground": variant === "muted",
        // Underline variant
        "underline underline-offset-4 hover:text-primary":
          variant === "underline",
        // Hover variant
        "no-underline hover:underline hover:underline-offset-4":
          variant === "hover",
      },
      className
    );

    // Handle external links
    if (external || (!to && href?.startsWith("http"))) {
      return (
        <a
          ref={ref}
          href={to || href}
          className={styles}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    // Handle internal links using Remix Link
    if (to) {
      return (
        <RemixLink ref={ref} to={to} className={styles} {...props}>
          {children}
        </RemixLink>
      );
    }

    // Default anchor tag for other cases
    return (
      <a ref={ref} href={href} className={styles} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

// Convenience components for common link variants
export const MutedLink = (props: Omit<LinkProps, "variant">) => (
  <Link variant="muted" {...props} />
);

export const UnderlineLink = (props: Omit<LinkProps, "variant">) => (
  <Link variant="underline" {...props} />
);

export const HoverLink = (props: Omit<LinkProps, "variant">) => (
  <Link variant="hover" {...props} />
);
