import { supportedLngsConfig } from '@shared/config/i18n';
import { Button } from '@shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { Typography } from '@shared/ui/typography';
import { env } from 'env';
import { useTranslation } from 'react-i18next';

export function LocaleToggle() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLocales = () => {
    return supportedLngsConfig.map((lng) => ({
      label: lng.language,
      flag: lng.flag,
    }));
  };
  const currentLocale = getLocales().find((locale) => locale.label === i18n.language);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="flex items-center gap-2">
            <img
              src={`${env.LOCALE_RESOURCES}/${currentLocale?.flag}.svg`}
              alt={currentLocale?.label}
              className="w-4 h-4"
            />

            <span className="sr-only">{t('locale.toggle')}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 rounded-lg" side={'bottom'} align={'end'}>
        {getLocales().map((locale) => (
          <DropdownMenuItem key={locale.label} onClick={() => changeLanguage(locale.label)}>
            <img
              src={`${env.LOCALE_RESOURCES}/${locale.flag}.svg`}
              alt={locale.label}
              className="w-4 h-4"
            />
            <Typography variant="muted">{t(`locale.languages.${locale.label}`)}</Typography>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
