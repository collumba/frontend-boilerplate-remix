import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";
import { supportedLngsConfig } from "@app/config/i18n";
import { env } from "env";
import { useTranslation } from "react-i18next";
import { SidebarMenuButton, useSidebar } from "./sidebar";

export function LocaleToggle() {
  const { i18n, t } = useTranslation(); // Use o hook do i18n
  const { isMobile } = useSidebar();

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
        <SidebarMenuButton tooltip={t("locale.toggle")}>
          <div className="flex items-center gap-2">
            <img
              src={`${env.LOCALE_RESOURCES}/${currentLocale?.flag}.svg`}
              alt={currentLocale?.label}
              className="w-4 h-4"
            />
            <span>{t("locale.toggle")}</span>
            <span className="sr-only">{t("locale.toggle")}</span>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
      >
        {getLocales().map((locale) => (
          <DropdownMenuItem key={locale.label}>
            <img
              src={`${env.LOCALE_RESOURCES}/${locale.flag}.svg`}
              alt={locale.label}
              className="w-4 h-4"
            />
            <span>{t(`locale.languages.${locale.label}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
