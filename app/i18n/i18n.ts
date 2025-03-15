import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export enum TranslationsLanguages {
  PT_BR = 'pt-BR',
  EN = 'en',
}
export const i18nCommonConfig = {
  supportedLngs: [ TranslationsLanguages.PT_BR, TranslationsLanguages.EN],
  defaultNS: 'common',
  ns: ['common'],
  fallbackLng: TranslationsLanguages.PT_BR,
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
};

export const loadPath = '/locales/{{lng}}/{{ns}}.json';

