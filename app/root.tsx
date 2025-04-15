import { ToastContainer } from "@app/components/toast-container";
import { ROUTES } from "@app/config/routes";
import { AuthProvider } from "@app/contexts/auth-context";
import { ToastProvider } from "@app/contexts/toast-context";
import i18next from "@app/modules/i18n/i18n.server";
import { themeSessionResolver } from "@app/modules/theme/sessions.server";
import {
  clearToastMessages,
  getToastMessages,
} from "@app/modules/toast/session.server";
import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import clsx from "clsx";
import { useState } from "react";
import { useChangeLanguage } from "remix-i18next/react";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/app/styles/globals.css" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const locale = await i18next.getLocale(request);

  //Load toast messages and clear from session
  const toasts = await getToastMessages(request);
  const headers = new Headers();

  if (toasts.length > 0) {
    const toastCookie = await clearToastMessages(request);
    headers.append("Set-Cookie", toastCookie);
  }

  return json(
    {
      theme: getTheme() || Theme.LIGHT,
      locale,
      toasts,
    },
    { headers }
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          specifiedTheme={data.theme}
          themeAction={ROUTES.api.global.setTheme}
        >
          <ToastProvider>
            <App />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  useChangeLanguage(data.locale);
  return (
    <html lang={data.locale} className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
        <ReactQueryDevtools initialIsOpen={false} />
      </body>
    </html>
  );
}
