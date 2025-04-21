'use client';

import { LocaleToggle } from '@app/ui/locale-toggle';
import { NavUser } from '@app/ui/nav-user';
import { cn } from '@shared/ui/cn';
import { NavResources } from '@shared/ui/nav-resources';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@shared/ui/sidebar';
import { TeamSwitcher } from '@shared/ui/team-switcher';
import { ThemeToggle } from '@shared/ui/theme-toggle';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import * as React from 'react';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader className="px-3 py-3">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavResources />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
        <div
          className={cn(
            'flex gap-2 mx-auto mb-3',
            isCollapsed ? 'flex-col items-center' : 'w-full px-3 items-center justify-between'
          )}
        >
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
