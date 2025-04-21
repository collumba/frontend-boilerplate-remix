import { useToastI18n } from '@features/toast/model/context';
import { env } from '@shared/config/env';
import { supportedLngsConfig } from '@shared/config/i18n';
import { Button } from '@shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { Typography } from '@shared/ui/typography';
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
              className="w-4 h-4 mr-2"
            />
            <Typography variant="muted">{t(`locale.languages.${locale.label}`)}</Typography>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
