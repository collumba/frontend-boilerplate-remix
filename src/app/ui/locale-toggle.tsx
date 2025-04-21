import { useToastI18n } from '@features/toast/model/context';
import { supportedLngsConfig } from '@shared/config/i18n';
import { useServerLanguageChange } from '@shared/lib/i18n/helpers';
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
  const { changeLanguage: changeServerLanguage } = useServerLanguageChange();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      toast.success('locale.changed', { language: t(`locale.languages.${lng}`) });
    });
    changeServerLanguage(lng);
  };

  const getLocales = () => {
    return supportedLngsConfig.map((lng) => ({
      label: lng.language,
      flag: lng.flag,
    }));
  };

  const currentLocale = getLocales().find((locale) => locale.label === i18n.language);

  const button = (
    <Button variant="ghost" size="icon">
      <Languages aria-hidden="true" />
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
            {currentLocale?.label === locale.label && (
              <Check className="size-4" aria-hidden="true" />
            )}
            <Typography variant="muted">{t(`locale.languages.${locale.label}`)}</Typography>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
