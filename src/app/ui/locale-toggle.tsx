import { useToastI18n } from '@features/toast/model/context';
import { env } from '@shared/config/env';
import { supportedLngsConfig } from '@shared/config/i18n';
import { Button } from '@shared/ui/button';
import { cn } from '@shared/ui/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { useSidebar } from '@shared/ui/sidebar';
import { Typography } from '@shared/ui/typography';
import { useTranslation } from 'react-i18next';

export function LocaleToggle() {
  const { i18n, t } = useTranslation();
  const toast = useToastI18n();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      // Show success toast when language changes
      toast.success('locale.languages.changed', { language: t(`locale.languages.${lng}`) });

      // Save the language preference in localStorage
      localStorage.setItem('i18nextLng', lng);
    });
  };

  const getLocales = () => {
    return supportedLngsConfig.map((lng) => ({
      label: lng.language,
      flag: lng.flag,
    }));
  };

  const currentLocale = getLocales().find((locale) => locale.label === i18n.language);

  const buttonContent = (
    <img
      src={`${env.LOCALE_RESOURCES}/${currentLocale?.flag}.svg`}
      alt={currentLocale?.label}
      className={cn(isCollapsed ? 'h-6 w-6' : 'h-5 w-5')}
    />
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
      <DropdownMenuContent className="rounded-md p-1" side="right" align="center">
        {getLocales().map((locale) => (
          <DropdownMenuItem
            key={locale.label}
            onClick={() => changeLanguage(locale.label)}
            className="flex items-center gap-2 px-2 py-1.5"
          >
            <img
              src={`${env.LOCALE_RESOURCES}/${locale.flag}.svg`}
              alt={locale.label}
              className="h-4 w-4"
            />
            <Typography variant="muted">{t(`locale.languages.${locale.label}`)}</Typography>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
