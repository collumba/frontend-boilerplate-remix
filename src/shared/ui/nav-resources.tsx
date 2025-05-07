'use client';

import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useNavigate } from '@remix-run/react';
import { ROUTES } from '@shared/config/routes';
import { cn } from '@shared/ui/cn';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@shared/ui/sidebar';
import { AlertOctagon, Book, Languages } from 'lucide-react';

export function NavResources() {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const items = [
    {
      title: 'Exemple',
      url: ROUTES.app.root + '/',
      icon: Book,
      isActive: false,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{isCollapsed ? 'RES' : 'RESOURCES'}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            onClick={() => {
              navigate(item.url);
            }}
            className={cn(isCollapsed && 'px-0 mx-0')}
          >
            <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
              <item.icon
                className={cn(
                  'shrink-0 text-foreground',
                  isCollapsed ? 'h-5 w-5' : 'h-4 w-4 opacity-70'
                )}
                aria-hidden="true"
              />
              {!isCollapsed && (
                <>
                  <span className="text-sm">{item.title}</span>
                  <ChevronRightIcon
                    className="ml-auto h-4 w-4 shrink-0 opacity-40"
                    aria-hidden="true"
                  />
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
