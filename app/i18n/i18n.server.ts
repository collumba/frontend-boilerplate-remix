import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import path from 'node:path';
import { i18nCommonConfig, loadPath } from './i18n';

let isInitialized = false;

// Função para inicializar o i18n no servidor
export async function initI18nServer(request: Request) {
  // Evite reinicializar se já estiver inicializado
  if (isInitialized) return i18n;

  // Detectar idioma a partir da URL e do cabeçalho Accept-Language
  const url = new URL(request.url);
  const urlLng = url.searchParams.get('lng');
  
  let lng = 'pt-BR'; // Idioma padrão
  
  // Verificar se há um idioma especificado na URL
  if (urlLng) {
    lng = urlLng;
  } 
  // Caso contrário, tentar obter do cabeçalho Accept-Language
  else {
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
      // Pegar o primeiro idioma preferido
      const preferredLang = acceptLanguage.split(',')[0].trim().split(';')[0].trim();
      if (preferredLang) {
        // Você pode verificar se o idioma está na lista de idiomas suportados
        const supportedLngs = i18nCommonConfig.supportedLngs as string[];
        const baseLang = preferredLang.split('-')[0];
        
        if (supportedLngs.includes(preferredLang)) {
          lng = preferredLang;
        } else if (supportedLngs.some(l => l.startsWith(baseLang))) {
          // Encontra o primeiro idioma suportado que começa com o mesmo código de idioma base
          lng = supportedLngs.find(l => l.startsWith(baseLang)) || 'pt-BR';
        }
      }
    }
  }

  await i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      ...i18nCommonConfig,
      debug: true,
      lng,
      backend: {
        loadPath: path.join(process.cwd(), 'public', 'locales', '{{lng}}', '{{ns}}.json'),
      },
    });

  isInitialized = true;
  return i18n;
}

export default i18n; 