import { supportedLngsConfig } from "@app/config/i18n";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { env } from "env";
import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LocaleToggle() {
  const { i18n, t } = useTranslation(); // Use o hook do i18n

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLocales = () => {
    return supportedLngsConfig.map((lng) => ({
      label: lng.language,
      flag: lng.flag,
    }));
  };
  const currentLocale = getLocales().find(
    (locale) => locale.label === i18n.language
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {currentLocale ? (
            <img
              src={`${env.LOCALE_RESOURCES}/${currentLocale.flag}.svg`}
              alt={currentLocale.label}
              className="w-4 h-4"
            />
          ) : (
            <Globe2 className="w-4 h-4 mr-2" />
          )}
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {getLocales().map((locale) => (
          <DropdownMenuItem
            key={locale.label}
            onClick={() => changeLanguage(locale.label)}
          >
            <img
              src={`${env.LOCALE_RESOURCES}/${locale.flag}.svg`}
              alt={locale.label}
              className="w-4 h-4 mr-2"
            />

            {t(`locale.${locale.label}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
