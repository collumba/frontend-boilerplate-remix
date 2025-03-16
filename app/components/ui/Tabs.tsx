import { cn } from "@utils/cn";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef
} from "react";
import { Typography } from "./Typography";

interface TabsContextValue {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  vertical?: boolean;
}

const variants = {
  default: {
    list: "border-b border-gray-200 dark:border-gray-800",
    tab: {
      base: "inline-flex items-center px-4 py-2 -mb-px border-b-2",
      active: "border-primary-600 text-primary-600",
      inactive: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
      disabled: "border-transparent text-gray-400 cursor-not-allowed",
    },
  },
  pills: {
    list: "space-x-2",
    tab: {
      base: "inline-flex items-center px-3 py-2 rounded-md",
      active: "bg-primary-100 text-primary-700",
      inactive: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      disabled: "text-gray-400 cursor-not-allowed",
    },
  },
  underline: {
    list: "space-x-8",
    tab: {
      base: "inline-flex items-center px-1 py-4 border-b-2",
      active: "border-primary-600 text-primary-600",
      inactive: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
      disabled: "border-transparent text-gray-400 cursor-not-allowed",
    },
  },
};

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      tabs,
      activeTab,
      onTabChange,
      variant = "default",
      size = "md",
      fullWidth = false,
      vertical = false,
      ...props
    },
    ref,
  ) => {
    const variantStyles = variants[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          vertical && "flex",
          className
        )}
        {...props}
      >
        <div
          role="tablist"
          className={cn(
            vertical ? "flex-col space-y-2" : "flex",
            !vertical && variantStyles.list,
            !vertical && fullWidth && "w-full"
          )}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const isDisabled = tab.disabled;

            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                disabled={isDisabled}
                onClick={() => !isDisabled && onTabChange(tab.id)}
                className={cn(
                  variantStyles.tab.base,
                  sizes[size],
                  isDisabled
                    ? variantStyles.tab.disabled
                    : isActive
                    ? variantStyles.tab.active
                    : variantStyles.tab.inactive,
                  !vertical && fullWidth && "flex-1 justify-center",
                  vertical && "w-full justify-start"
                )}
              >
                {tab.icon && (
                  <span className="mr-2" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                <Typography
                  variant="body2"
                  color={isActive ? "primary" : isDisabled ? "secondary" : undefined}
                  className="font-medium"
                >
                  {tab.label}
                </Typography>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    const listRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => listRef.current!);

    const baseStyles = "flex border-b border-gray-200";
    return (
      <div
        ref={listRef}
        role="tablist"
        className={cn(baseStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabList.displayName = "TabList";

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  id: string;
  disabled?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ className, id, disabled = false, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error("Tab must be used within Tabs");
    }

    const { selectedTab, setSelectedTab } = context;
    const isSelected = selectedTab === id;
    const buttonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => buttonRef.current!);

    const baseStyles =
      "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
    const variants = {
      selected:
        "text-primary-600 border-primary-500 border-b-2 -mb-px bg-white",
      default:
        "text-gray-500 hover:text-gray-700 border-transparent border-b-2",
      disabled: "text-gray-300 cursor-not-allowed",
    };

    return (
      <button
        ref={buttonRef}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`panel-${id}`}
        id={`tab-${id}`}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          baseStyles,
          isSelected ? variants.selected : variants.default,
          disabled && variants.disabled,
          className,
        )}
        onClick={() => !disabled && setSelectedTab(id)}
        disabled={disabled}
        type="button"
        {...props}
      >
        {children}
      </button>
    );
  },
);

Tab.displayName = "Tab";

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  children: ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, id, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error("TabPanel must be used within Tabs");
    }

    const { selectedTab } = context;
    const isSelected = selectedTab === id;
    const panelRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => panelRef.current!);

    if (!isSelected) return null;

    return (
      <div
        ref={panelRef}
        role="tabpanel"
        id={`panel-${id}`}
        aria-labelledby={`tab-${id}`}
        tabIndex={0}
        className={cn("focus:outline-none", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabPanel.displayName = "TabPanel";
