'use client';

import * as React from 'react';

// Constants for sidebar
export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '260px';
export const SIDEBAR_WIDTH_MOBILE = '280px';
export const SIDEBAR_WIDTH_ICON = '64px';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

// Sidebar context type definition
export type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

// Create context with null as default value
export const SidebarContext = React.createContext<SidebarContextProps | null>(null);

// Hook to use sidebar context
export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}
