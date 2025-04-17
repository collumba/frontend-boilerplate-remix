'use client';

import { useAuthContext } from '@app/providers/auth-context';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@shared/ui/sidebar';
import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logout } = useAuthContext();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
  };

  const renderUserInfo = () => {
    return (
      <>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user?.avatar} alt={user?.username} />
          <AvatarFallback className="rounded-lg">
            {user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user?.username}</span>
          <span className="truncate text-xs">{user?.email}</span>
        </div>
      </>
    );
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {renderUserInfo()}
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {renderUserInfo()}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()}>
              <LogOut />
              {t('common.action.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
