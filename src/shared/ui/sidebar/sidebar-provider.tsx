'use client';

import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/ui/cn';
import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SidebarContext,
  SidebarContextProps,
} from '@shared/ui/sidebar/sidebar-context';
import { TooltipProvider } from '@shared/ui/tooltip';
import * as React from 'react';

interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Custom hook to handle sidebar state and toggle
function useSidebarState(
  defaultOpen: boolean,
  openProp?: boolean,
  setOpenProp?: (open: boolean) => void
) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  // Store previous isMobile value for transition handling
  const prevIsMobileRef = React.useRef(isMobile);

  // Create a stable setOpen function
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // Set cookie to persist sidebar state
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  // Handle transition between mobile and desktop modes
  React.useEffect(() => {
    // If transitioning from mobile to desktop
    if (prevIsMobileRef.current && !isMobile) {
      // Preserve open state when transitioning from mobile to desktop
      if (openMobile) {
        setOpen(true);
      }
    }
    // Update ref with current value
    prevIsMobileRef.current = isMobile;
  }, [isMobile, openMobile, setOpen]);

  // Create a stable toggle function that works for both mobile and desktop
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev);
    } else {
      setOpen((prev) => !prev);
    }
  }, [isMobile, setOpen, setOpenMobile]);

  return { isMobile, open, setOpen, openMobile, setOpenMobile, toggleSidebar };
}

// Setup keyboard shortcuts for the sidebar
function useKeyboardShortcut(toggleSidebar: () => void) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const { isMobile, open, setOpen, openMobile, setOpenMobile, toggleSidebar } = useSidebarState(
    defaultOpen,
    openProp,
    setOpenProp
  );

  // Setup keyboard shortcuts
  useKeyboardShortcut(toggleSidebar);

  // State for CSS styling
  const state = open ? 'expanded' : 'collapsed';

  // Create context value
  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}
