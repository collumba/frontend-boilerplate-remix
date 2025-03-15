import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import path from 'node:path';
import { i18nCommonConfig, loadPath, TranslationsLanguages } from './i18n';

let isInitialized = false;

export async function initI18nServer(request: Request) {
  if (isInitialized) return i18n;

  const url = new URL(request.url);
  const urlLng = url.searchParams.get('lng');
  
  let lng = TranslationsLanguages.PT_BR; 
  
  if (urlLng) {
    lng = urlLng as TranslationsLanguages;
  } 
  else {
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
      const preferredLang = acceptLanguage.split(',')[0].trim().split(';')[0].trim();
      if (preferredLang) {
        const supportedLngs = i18nCommonConfig.supportedLngs as string[];
        const baseLang = preferredLang.split('-')[0];
        
        if (supportedLngs.includes(preferredLang)) {
          lng = preferredLang as TranslationsLanguages;
        } else if (supportedLngs.some(l => l.startsWith(baseLang))) {
          lng = supportedLngs.find(l => l.startsWith(baseLang))  as TranslationsLanguages;
        }
      }
    }
  }

  await i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      ...i18nCommonConfig,
      lng,
      backend: {
        loadPath: path.join(process.cwd(), 'public', 'locales', '{{lng}}', '{{ns}}.json'),
      },
    });

  isInitialized = true;
  return i18n;
}

export default i18n; 