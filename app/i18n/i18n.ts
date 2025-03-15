import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Configuração comum para servidor e cliente
export const i18nCommonConfig = {
  supportedLngs: ['pt-BR', 'en'],
  defaultNS: 'common',
  ns: ['common'],
  fallbackLng: 'pt-BR',
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
};

export const loadPath = '/locales/{{lng}}/{{ns}}.json';