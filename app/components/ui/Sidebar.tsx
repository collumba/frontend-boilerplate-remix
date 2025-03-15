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
  items: SidebarItem[];
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ className, items, collapsed = false, onCollapse, ...props }, ref) => {
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
        <nav className="flex-1 space-y-1 px-2 py-4">
          {items.map((item) => {
            const hasSubItems = item.items && item.items.length > 0;
            const isOpen = openItems[item.label];

            return (
              <div key={item.label}>
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
                    {!collapsed && item.label}
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

                {/* Sub items */}
                {hasSubItems && isOpen && !collapsed && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.items?.map((subItem) => (
                      <a
                        key={subItem.href}
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

        {/* Collapse button */}
        <div className="border-t p-2">
          <button
            type="button"
            onClick={() => onCollapse?.(!collapsed)}
            className={cn(
              "flex w-full items-center justify-center rounded-md p-2 text-gray-500",
              "hover:bg-gray-50 hover:text-primary-600",
              "transition-colors duration-200",
            )}
          >
            <ChevronDown
              className={cn(
                "h-5 w-5 rotate-90 transition-transform",
                collapsed && "-rotate-90",
              )}
            />
          </button>
        </div>
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";
