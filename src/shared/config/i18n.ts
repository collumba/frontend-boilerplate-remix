import { serverOnly$ } from "vite-env-only/macros";

import enTranslation from "@/locales/en";
import esTranslation from "@/locales/es";
import ptBRTranslation from "@/locales/pt-BR";
// This is the list of languages your application supports, the last one is your
// fallback language
export const supportedLngsConfig = [
  {
    language: "es",
    flag: "ES",
  },
  {
    language: "en",
    flag: "US",
  },
  {
    language: "pt-BR",
    flag: "BR",
  },
];

export const supportedLngs = supportedLngsConfig.map((lng) => lng.language);

// This is the language you want to use in case
// the user language is not in the supportedLngs
export const fallbackLng = "en";

// The default namespace of i18next is "translation", but you can customize it
export const defaultNS = "translation";

export const resources = serverOnly$({
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  "pt-BR": { translation: ptBRTranslation },
});
