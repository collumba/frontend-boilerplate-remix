'use client';

import { CaretSortIcon, PlusIcon } from '@radix-ui/react-icons';
import { cn } from '@shared/ui/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@shared/ui/sidebar';
import * as React from 'react';

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile, state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  const teamIcon = (
    <div
      className={cn(
        'flex items-center justify-center rounded-md',
        isCollapsed ? 'h-10 w-10' : 'h-8 w-8'
      )}
    >
      <activeTeam.logo className={cn('text-foreground', isCollapsed ? 'h-5 w-5' : 'h-4 w-4')} />
    </div>
  );

  const teamContent = (
    <>
      {teamIcon}
      {!isCollapsed && (
        <>
          <div className="grid flex-1 text-left leading-none">
            <span className="truncate text-sm font-medium">{activeTeam.name}</span>
            <span className="truncate text-xs text-muted-foreground">{activeTeam.plan}</span>
          </div>
          <CaretSortIcon className="ml-auto h-4 w-4 opacity-50" />
        </>
      )}
    </>
  );

  const triggerButton = (
    <SidebarMenuButton
      tooltip={isCollapsed ? activeTeam.name : undefined}
      className={cn(
        'data-[state=open]:bg-accent gap-3',
        isCollapsed ? 'justify-center h-auto py-2' : 'p-2'
      )}
    >
      {teamContent}
    </SidebarMenuButton>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-[14rem] rounded-md p-1"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={8}
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>

            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="flex items-center gap-2 px-2 py-1.5"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md border">
                  <team.logo className="h-3.5 w-3.5 shrink-0" />
                </div>
                <span>{team.name}</span>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-transparent">
                <PlusIcon className="h-4 w-4" />
              </div>
              <span className="font-medium text-muted-foreground">Add team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
