'use client';

import { cn } from '@shared/ui/cn';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@shared/ui/sheet';
import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_WIDTH_MOBILE,
  useSidebar,
} from '@shared/ui/sidebar/sidebar-context';
import * as React from 'react';

interface SidebarProps extends React.ComponentProps<'div'> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

// Renders static non-collapsible sidebar
function StaticSidebar({ className, children, ...props }: Omit<SidebarProps, 'collapsible'>) {
  return (
    <div
      data-slot="sidebar"
      className={cn(
        'bg-sidebar text-sidebar-foreground flex h-full flex-col border-r border-sidebar-border',
        'w-[var(--sidebar-width)]',
        className
      )}
      style={{ '--sidebar-width': SIDEBAR_WIDTH } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

// Renders mobile sidebar using Sheet component
function MobileSidebar({
  side,
  children,
  ...props
}: Omit<SidebarProps, 'collapsible' | 'variant'>) {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
      <SheetContent
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        className="bg-sidebar text-sidebar-foreground w-full max-w-[var(--sidebar-width)] p-0 [&>button]:hidden"
        style={{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
        side={side}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
        <div className="flex h-full w-full flex-col overflow-hidden">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

// Helper for rendering DesktopSidebar gap
function SidebarGap({
  isCollapsed,
  collapsible,
}: {
  isCollapsed: boolean;
  collapsible: string;
  side: 'left' | 'right';
}) {
  return (
    <div
      data-slot="sidebar-gap"
      className={cn(
        'relative bg-transparent transition-all duration-300 ease-in-out',
        {
          'w-0': isCollapsed && collapsible === 'offcanvas',
          'w-[var(--sidebar-width-icon)]': isCollapsed && collapsible === 'icon',
          'w-[var(--sidebar-width)]': !isCollapsed || collapsible === 'none',
        },
        'group-data-[side=right]:rotate-180'
      )}
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
          '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
        } as React.CSSProperties
      }
    />
  );
}

// Helper for rendering DesktopSidebar container
function SidebarContainer({
  isCollapsed,
  collapsible,
  side,
  variant,
  className,
  children,
  ...props
}: {
  isCollapsed: boolean;
  collapsible: string;
  side: 'left' | 'right';
  variant: string;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-container"
      className={cn(
        'fixed inset-y-0 z-10 flex flex-col h-screen transition-all duration-300 ease-in-out',
        {
          'w-[var(--sidebar-width)]': !isCollapsed || collapsible === 'none',
          'w-[var(--sidebar-width-icon)]': isCollapsed && collapsible === 'icon',
          'left-0': side === 'left',
          'right-0': side === 'right',
          'left-[calc(var(--sidebar-width)*-1)]':
            side === 'left' && isCollapsed && collapsible === 'offcanvas',
          'right-[calc(var(--sidebar-width)*-1)]':
            side === 'right' && isCollapsed && collapsible === 'offcanvas',
          'border-r border-sidebar-border': side === 'left' && variant !== 'floating',
          'border-l border-sidebar-border': side === 'right' && variant !== 'floating',
          'p-0': true,
          'p-2': variant === 'floating',
          'shadow-sm': variant !== 'floating',
        },
        className
      )}
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
          '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        className={cn('bg-sidebar flex h-full w-full flex-col overflow-hidden', {
          'rounded-lg border border-sidebar-border shadow-sm': variant === 'floating',
        })}
      >
        {children}
      </div>
    </div>
  );
}

// Renders desktop sidebar with variants and collapsible modes
function DesktopSidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: SidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={isCollapsed ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <SidebarGap isCollapsed={isCollapsed} collapsible={collapsible} side={side} />
      <SidebarContainer
        isCollapsed={isCollapsed}
        collapsible={collapsible}
        side={side}
        variant={variant}
        className={className}
        {...props}
      >
        {children}
      </SidebarContainer>
    </div>
  );
}

// Main Sidebar component that chooses appropriate rendering based on props
export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile } = useSidebar();

  // Use a ref to track if the component is mounted to avoid hydration issues
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Non-collapsible sidebar
  if (collapsible === 'none') {
    return (
      <StaticSidebar className={className} {...props}>
        {children}
      </StaticSidebar>
    );
  }

  // Only render based on isMobile after component is mounted
  // This prevents hydration mismatches and flickering
  if (!mounted) {
    return null;
  }

  // Mobile sidebar
  if (isMobile) {
    return (
      <MobileSidebar side={side} className={className} {...props}>
        {children}
      </MobileSidebar>
    );
  }

  // Desktop sidebar
  return (
    <DesktopSidebar
      side={side}
      variant={variant}
      collapsible={collapsible}
      className={className}
      {...props}
    >
      {children}
    </DesktopSidebar>
  );
}
