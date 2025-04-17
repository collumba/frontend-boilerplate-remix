'use client';

import { cn } from '@shared/ui/cn';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@shared/ui/sheet';
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from '@shared/ui/sidebar/sidebar-context';
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
        'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
        className
      )}
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
        className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties
        }
        side={side}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
        <div className="flex h-full w-full flex-col">{children}</div>
      </SheetContent>
    </Sheet>
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

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* Sidebar gap for desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust padding for variants
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
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

  // Non-collapsible sidebar
  if (collapsible === 'none') {
    return (
      <StaticSidebar className={className} {...props}>
        {children}
      </StaticSidebar>
    );
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
