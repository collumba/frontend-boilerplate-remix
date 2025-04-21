'use client';

import { Slot } from '@radix-ui/react-slot';
import { Button } from '@shared/ui/button';
import { cn } from '@shared/ui/cn';
import { Input } from '@shared/ui/input';
import { Separator } from '@shared/ui/separator';
import { useSidebar } from '@shared/ui/sidebar/sidebar-context';
import { Skeleton } from '@shared/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui/tooltip';
import { cva, VariantProps } from 'class-variance-authority';
import { PanelLeftIcon } from 'lucide-react';
import * as React from 'react';

// SidebarTrigger component
export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(e) => {
        toggleSidebar();
        onClick?.(e);
      }}
      {...props}
    >
      <PanelLeftIcon className="size-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}

// SidebarRail component
export function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      className={cn(
        'bg-sidebar-accent/25 hover:bg-sidebar-accent/40 absolute right-0 top-1/2 z-[9999] block h-12 w-1 translate-x-full -translate-y-1/2 rounded-r-lg transition',
        'data-[collapsed=false]:opacity-100 md:hidden',
        'data-[state=expanded]:opacity-0 data-[collapsible=icon]:opacity-0',
        className
      )}
      onClick={() => toggleSidebar()}
      {...props}
    />
  );
}

// SidebarInset component
export function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'flex h-full flex-1 flex-col',
        'p-4 group-data-[variant=inset]:ml-(--sidebar-width) transition-[margin] duration-200 ease-linear',
        'group-data-[collapsible=offcanvas]:ml-0',
        'group-data-[collapsible=icon]:ml-(--sidebar-width-icon)',
        className
      )}
      {...props}
    />
  );
}

// SidebarInput component
export function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-sidebar="input"
      data-slot="sidebar-input"
      className={cn('bg-sidebar-muted', className)}
      {...props}
    />
  );
}

// SidebarHeader component
export function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="header"
      data-slot="sidebar-header"
      className={cn('flex flex-col justify-start gap-1 px-4 py-2', className)}
      {...props}
    />
  );
}

// SidebarFooter component
export function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="footer"
      data-slot="sidebar-footer"
      className={cn('mt-auto flex flex-col gap-3 px-4 py-2', className)}
      {...props}
    />
  );
}

// SidebarSeparator component
export function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-sidebar="separator"
      data-slot="sidebar-separator"
      className={cn('bg-sidebar-muted/50', className)}
      {...props}
    />
  );
}

// SidebarContent component
export function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="content"
      data-slot="sidebar-content"
      className={cn('flex-1 overflow-y-auto overflow-x-hidden py-2', className)}
      {...props}
    />
  );
}

// SidebarGroup component
export function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="group"
      data-slot="sidebar-group"
      className={cn('mb-5 px-2', className)}
      {...props}
    />
  );
}

// SidebarGroupLabel component
export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  const { state } = useSidebar();

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      data-slot="sidebar-group-label"
      className={cn(
        'text-sidebar-muted-foreground group-data-[variant=floating]:text-sidebar-muted mx-2 mb-2 text-xs font-medium uppercase tracking-wider group-data-[state=collapsed]:mb-2 group-data-[collapsible=icon]:justify-center',
        state === 'collapsed' ? 'hidden md:flex' : 'flex',
        className
      )}
      {...props}
    />
  );
});

SidebarGroupLabel.displayName = 'SidebarGroupLabel';

// SidebarGroupAction component
export const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { state } = useSidebar();

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      data-slot="sidebar-group-action"
      className={cn(
        'text-sidebar-muted-foreground hover:text-sidebar-foreground flex h-6 w-6 items-center justify-center rounded-md transition-colors group-data-[state=collapsed]:hidden',
        state === 'collapsed' ? 'hidden md:flex' : 'flex',
        className
      )}
      {...props}
    />
  );
});

SidebarGroupAction.displayName = 'SidebarGroupAction';

// SidebarGroupContent component
export function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      className={cn('', className)}
      {...props}
    />
  );
}

// SidebarMenu component
export function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-sidebar="menu"
      data-slot="sidebar-menu"
      className={cn('flex list-none flex-col gap-1', className)}
      {...props}
    />
  );
}

// SidebarMenuItem component
export function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      className={cn('flex w-full', className)}
      {...props}
    />
  );
}

// Define the styles for the SidebarMenuButton
const sidebarMenuButtonVariants = cva(
  [
    'group/button relative flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-expanded:bg-sidebar-accent data-[state=active]:bg-sidebar-accent',
    'ring-offset-background hover:bg-sidebar-accent/80 data-[state=active]:hover:bg-sidebar-accent/90',
    'transition-colors data-[state=active]:text-sidebar-accent-foreground',
  ],
  {
    variants: {
      size: {
        sm: 'h-8',
        md: 'h-10',
        lg: 'min-h-12 flex-col items-start justify-center gap-1 px-3 py-2',
      },
      collapsed: {
        true: 'group-data-[state=collapsed]:justify-center',
      },
    },
    defaultVariants: {
      size: 'md',
      collapsed: true,
    },
  }
);

// SidebarMenuButton component
export interface SidebarMenuButtonProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, 'size'>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  tooltip?: string;
  isActive?: boolean;
}

export const SidebarMenuButton = React.forwardRef<HTMLAnchorElement, SidebarMenuButtonProps>(
  (
    {
      asChild = false,
      className,
      tooltip,
      isActive = false,
      size,
      collapsed,
      ...props
    }: SidebarMenuButtonProps,
    ref
  ) => {
    const Comp = asChild ? Slot : 'a';
    const { state } = useSidebar();

    const isTooltipRequired = state === 'collapsed' && tooltip && collapsed !== false;

    if (isTooltipRequired) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              ref={ref}
              data-sidebar="menu-button"
              data-slot="sidebar-menu-button"
              data-state={isActive ? 'active' : 'inactive'}
              className={cn(sidebarMenuButtonVariants({ size, collapsed, className }))}
              {...props}
            />
          </TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-slot="sidebar-menu-button"
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(sidebarMenuButtonVariants({ size, collapsed, className }))}
        {...props}
      />
    );
  }
);

SidebarMenuButton.displayName = 'SidebarMenuButton';

// SidebarMenuSkeleton component
export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  return (
    <div
      data-sidebar="menu-skeleton"
      data-slot="sidebar-menu-skeleton"
      className={cn('flex w-full items-center gap-2 px-3 py-2', className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-5 shrink-0 rounded-md" />}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-4 w-10 rounded-md" />
      </div>
    </div>
  );
}

// SidebarMenuSub component
export function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-sidebar="menu-sub"
      data-slot="sidebar-menu-sub"
      className={cn(
        'group-data-[state=collapsed]:invisible group-data-[state=collapsed]:h-0 group-data-[state=collapsed]:overflow-hidden',
        className
      )}
      {...props}
    />
  );
}

// SidebarMenuSubItem component
export function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      className={cn('pl-7', className)}
      {...props}
    />
  );
}

// SidebarMenuSubButton component
export const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
  }
>(({ asChild = false, size = 'md', isActive = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-slot="sidebar-menu-sub-button"
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'hover:text-sidebar-foreground text-sidebar-muted-foreground aria-expanded:text-sidebar-foreground group/button flex w-full items-center gap-2 rounded-md py-2 text-sm transition-colors',
        size === 'sm' ? 'h-8' : 'h-9',
        isActive ? 'text-sidebar-foreground font-medium' : '',
        className
      )}
      {...props}
    />
  );
});

SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';
