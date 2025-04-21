import { useToastI18n } from '@features/toast/model/context';
import { supportedLngsConfig } from '@shared/config/i18n';
import { Button } from '@shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { Typography } from '@shared/ui/typography';
import { Check, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LocaleToggle() {
  const { i18n, t } = useTranslation();
  const toast = useToastI18n();

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

  const button = (
    <Button variant="outline" size="icon">
      <Languages />
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
            {currentLocale?.label === locale.label && <Check className="size-4" />}
            <Typography variant="muted">{t(`locale.languages.${locale.label}`)}</Typography>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
