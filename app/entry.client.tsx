/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { initI18nClient } from "./i18n/i18n.client";

// Inicializar i18n antes de hidratar a aplicação
console.log('Starting i18n client initialization');
initI18nClient().then(() => {
  console.log('i18n client initialization completed, starting hydration');
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
}).catch(error => {
  console.error('Error during i18n client initialization:', error);
  // Continue with hydration even if i18n fails
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
});
