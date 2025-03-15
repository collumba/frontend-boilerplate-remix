import { cn } from "@utils/cn";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface TabsContextValue {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultTab?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "line" | "enclosed" | "pill";
  children: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      defaultTab,
      value,
      onChange,
      variant = "line",
      children,
      ...props
    },
    ref,
  ) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab || "");
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const currentTab = value ?? selectedTab;
    const handleTabChange = (tabId: string) => {
      if (!value) {
        setSelectedTab(tabId);
      }
      onChange?.(tabId);
    };

    return (
      <TabsContext.Provider
        value={{ selectedTab: currentTab, setSelectedTab: handleTabChange }}
      >
        <div ref={containerRef} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
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
