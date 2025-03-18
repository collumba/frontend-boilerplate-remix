import { cn } from "@app/lib/utils";
import { Typography } from "@components/ui/Typography";
import { forwardRef } from "react";

export interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: SidebarItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: SidebarItem[];
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    { className, children, items, headerContent, footerContent, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-screen flex-col border-r", className)}
        {...props}
      >
        {headerContent && (
          <div className="border-b p-4" data-testid="sidebar-header">
            {headerContent}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">
          {items && items.length > 0 && (
            <nav className="space-y-1">
              {items.map((item, index) => (
                <div key={index} data-testid="sidebar-item">
                  <a
                    href={item.href}
                    className="flex items-center rounded-lg px-4 py-2 text-sm font-medium hover:hover:bg-primary/90"
                  >
                    <span className="mr-3">{item.icon}</span>
                    <Typography variant="body2">{item.label}</Typography>
                  </a>
                  {item.subItems && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="flex items-center rounded-lg px-4 py-2 text-sm font-medium hover:hover:bg-primary/90"
                        >
                          <span className="mr-3">{item.icon}</span>
                          <Typography variant="body2">{item.label}</Typography>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}
          {children}
        </div>
        {footerContent && (
          <div className="border-t p-4" data-testid="sidebar-footer">
            {footerContent}
          </div>
        )}
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";
