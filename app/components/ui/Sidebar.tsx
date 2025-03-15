import { cn } from "@utils/cn";
import { ChevronDown } from "lucide-react";
import { HTMLAttributes, forwardRef, useState } from "react";

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  items?: Omit<SidebarItem, "items">[];
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  items?: SidebarItem[];
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  children?: React.ReactNode;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({
    className,
    items = [],
    collapsed = false,
    onCollapse,
    headerContent,
    footerContent,
    children,
    ...props
  }, ref) => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const toggleItem = (label: string) => {
      setOpenItems((prev) => ({
        ...prev,
        [label]: !prev[label],
      }));
    };

    return (
      <aside
        ref={ref}
        className={cn(
          "flex h-screen flex-col border-r bg-white",
          collapsed ? "w-16" : "w-64",
          "transition-all duration-300",
          className,
        )}
        {...props}
      >
        {headerContent && (
          <div className="border-b p-4" data-testid="sidebar-header">
            {headerContent}
          </div>
        )}

        <nav className="flex-1 space-y-1 px-2 py-4">
          {children}
          {items.map((item) => {
            const hasSubItems = item.items && item.items.length > 0;
            const isOpen = openItems[item.label];

            return (
              <div key={item.label} data-testid="sidebar-item">
                {item.href && !hasSubItems ? (
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700",
                      "hover:bg-gray-50 hover:text-primary-600",
                      "transition-colors duration-200",
                    )}
                  >
                    {item.icon && (
                      <span className="mr-3 h-5 w-5">{item.icon}</span>
                    )}
                    {!collapsed && <span>{item.label}</span>}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleItem(item.label)}
                    className={cn(
                      "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700",
                      "hover:bg-gray-50 hover:text-primary-600",
                      "transition-colors duration-200",
                    )}
                  >
                    {item.icon && (
                      <span className="mr-3 h-5 w-5">{item.icon}</span>
                    )}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {hasSubItems && (
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isOpen && "rotate-180",
                            )}
                          />
                        )}
                      </>
                    )}
                  </button>
                )}

                {hasSubItems && isOpen && !collapsed && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.items?.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600",
                          "hover:bg-gray-50 hover:text-primary-600",
                          "transition-colors duration-200",
                        )}
                      >
                        {subItem.icon && (
                          <span className="mr-3 h-5 w-5">{subItem.icon}</span>
                        )}
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {footerContent && (
          <div className="border-t p-4" data-testid="sidebar-footer">
            {footerContent}
          </div>
        )}
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";
