import { RemixBrowser } from '@remix-run/react';
import { env } from '@shared/config/env';
import { defaultNS, fallbackLng, supportedLngs } from '@shared/config/i18n';
import { ROUTES } from '@shared/config/routes';
import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import Fetch from 'i18next-fetch-backend';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { getInitialNamespaces } from 'remix-i18next/client';

async function main() {
  // eslint-disable-next-line import/no-named-as-default-member
  await i18next
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .use(Fetch) // Tell i18next to use the Fetch backend
    .use(I18nextBrowserLanguageDetector) // Setup a client-side language detector
    .init({
      defaultNS,
      fallbackLng,
      supportedLngs,
      ns: getInitialNamespaces(),
      detection: {
        order: ['localStorage', 'cookie', 'htmlTag', 'navigator'],
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage', 'cookie'],
      },
      backend: {
        loadPath: `${ROUTES.api.global.locales}?lng={{lng}}&ns={{ns}}`,
      },
      debug: env.NODE_ENV === 'development',
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

main().catch(console.error);
