'use client';

import { useAuthContext } from '@features/auth/contexts/auth-context';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import { cn } from '@shared/ui/cn';
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
  const { isMobile, state } = useSidebar();
  const { user, logout } = useAuthContext();
  const { t } = useTranslation();
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
  };

  const renderUserInfo = () => {
    return (
      <>
        <Avatar
          className={cn(
            'border border-border bg-background',
            isCollapsed ? 'h-10 w-10 mx-auto' : 'h-8 w-8'
          )}
        >
          <AvatarImage src={user?.avatar} alt={user?.username} />
          <AvatarFallback className="text-xs font-medium">
            {user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="grid flex-1 text-left leading-none">
            <span className="truncate text-sm font-medium">{user?.username}</span>
            <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
          </div>
        )}
      </>
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={isCollapsed ? user?.username : undefined}
              className={cn(
                'data-[state=open]:bg-accent gap-3',
                isCollapsed ? 'justify-center h-auto py-2' : 'h-14 p-2'
              )}
            >
              {renderUserInfo()}
              {!isCollapsed && <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-[14rem] rounded-md p-1"
            side={isMobile ? 'top' : 'right'}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="px-2 py-1.5 font-normal">
              <div className="flex items-center gap-2">{renderUserInfo()}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()} className="gap-2 px-2 py-1.5">
              <LogOut className="h-4 w-4 text-foreground/70" />
              <span>{t('common.action.logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
