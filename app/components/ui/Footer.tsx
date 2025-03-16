import { cn } from "app/lib/utils";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  navigation?: Array<{
    label: string;
    href: string;
  }>;
}

export function Footer({
  className,
  navigation,
  children,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:gap-0",
        className
      )}
      {...props}
    >
      <div>{children}</div>

      {navigation && navigation.length > 0 && (
        <nav className="flex gap-6">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </footer>
  );
}
