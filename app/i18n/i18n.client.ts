import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nCommonConfig } from './i18n';

// Função para inicializar o i18n no cliente
export async function initI18nClient() {
  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...i18nCommonConfig,
      debug: true,
      detection: {
        order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
        caches: ['cookie', 'localStorage'],
      },
    })
    .then(() => {
      return i18n;
    })
    .catch(error => {
      return i18n;
    });
}

export default i18n; 