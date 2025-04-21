import enTranslation from '@shared/config/locales/en';
import esTranslation from '@shared/config/locales/es';
import ptBRTranslation from '@shared/config/locales/pt-BR';
// Remove the serverOnly macro which is preventing client access
// import { serverOnly$ } from 'vite-env-only/macros';

// This is the list of languages your application supports, the last one is your
// fallback language
export const supportedLngsConfig = [
  {
    language: 'es',
    flag: 'ES',
  },
  {
    language: 'en',
    flag: 'US',
  },
  {
    language: 'pt-BR',
    flag: 'BR',
  },
  {
    language: 'pt',
    flag: 'PT',
  },
];

export const supportedLngs = supportedLngsConfig.map((lng) => lng.language);

// This is the language you want to use in case
// the user language is not in the supportedLngs
export const fallbackLng = 'en';

// The default namespace of i18next is "translation", but you can customize it
export const defaultNS = 'translation';

// Make resources available on both client and server
export const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  'pt-BR': { translation: ptBRTranslation },
  pt: { translation: ptBRTranslation },
};
