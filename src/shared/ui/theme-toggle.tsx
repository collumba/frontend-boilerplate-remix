import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { useSidebar } from '@shared/ui/sidebar';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Theme, useTheme } from 'remix-themes';

import { Button } from './button';
import { cn } from './cn';

export function ThemeToggle() {
  const [, setTheme] = useTheme();
  const { t } = useTranslation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const buttonContent = (
    <div className="relative flex items-center justify-center">
      <Sun
        className={cn(
          'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
          isCollapsed ? 'h-5 w-5' : 'h-[18px] w-[18px]'
        )}
      />
      <Moon
        className={cn(
          'absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
          isCollapsed ? 'h-5 w-5' : 'h-[18px] w-[18px]'
        )}
      />
    </div>
  );

  const button = (
    <Button
      variant="ghost"
      size="icon"
      className={cn('rounded-md', isCollapsed ? 'h-10 w-10' : 'h-9 w-9')}
    >
      {buttonContent}
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="rounded-md p-1">
        <DropdownMenuItem
          onClick={() => setTheme(Theme.LIGHT)}
          className="flex items-center gap-2 px-2 py-1.5"
        >
          <Sun className="h-4 w-4 text-foreground/70" />
          <span>{t('theme.light')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(Theme.DARK)}
          className="flex items-center gap-2 px-2 py-1.5"
        >
          <Moon className="h-4 w-4 text-foreground/70" />
          <span>{t('theme.dark')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
