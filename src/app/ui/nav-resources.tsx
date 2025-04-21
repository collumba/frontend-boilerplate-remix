'use client';

import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useNavigate } from '@remix-run/react';
import { ROUTES } from '@shared/config/routes';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shared/ui/sidebar';
import { AlertOctagon, Languages } from 'lucide-react';

export function NavResources() {
  const navigate = useNavigate();
  const items = [
    {
      title: 'Toasts',
      url: ROUTES.app.root + '/resources/toasts',
      icon: AlertOctagon,
      isActive: false,
    },
    {
      title: 'Translation',
      url: ROUTES.app.root + '/resources/translation',
      icon: Languages,
      isActive: false,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>RESOURCES</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            onClick={() => {
              navigate(item.url);
            }}
          >
            <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
              <item.icon className="h-4 w-4 shrink-0 text-foreground opacity-70" />
              <span className="text-sm">{item.title}</span>
              <ChevronRightIcon className="ml-auto h-4 w-4 shrink-0 opacity-40" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
