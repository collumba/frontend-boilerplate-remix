import { ROUTES } from "@app/config/routes";
import { AuthProvider } from "@app/contexts/auth-context";
import { useFlashToasts } from "@app/hooks/use-flash-toasts";
import { ToastContainer, ToastContextProvider } from "@app/hooks/use-toast";
import i18next from "@app/modules/i18n.server";
import { themeSessionResolver } from "@app/modules/theme/sessions.server";
import { getToastsAndCommit } from "@app/utils/toast.server";
import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

import "./styles/globals.css";

export const meta: MetaFunction = () => {
  return [
    { title: "App Title" },
    { name: "description", content: "App description" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "preload", href: "/app/styles/globals.css", as: "style" },
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

  const { messages, headers } = await getToastsAndCommit(request);

  return Response.json(
    {
      theme: getTheme() || Theme.LIGHT,
      locale,
      toastMessages: messages,
    },
    {
      headers,
      status: 200,
    }
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  const [queryClient] = useState(() => new QueryClient());
  const { i18n } = useTranslation();

  // Inicializar i18n
  useEffect(() => {
    // Set initial language
    i18n.changeLanguage(data.locale).then(() => {});
  }, [i18n, data]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          specifiedTheme={data.theme}
          themeAction={ROUTES.api.global.setTheme}
        >
          <ToastContextProvider>
            <App />
          </ToastContextProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  const { i18n } = useTranslation();

  // Usar o hook abstraído para processar flash toasts
  useFlashToasts(data.toastMessages);

  // Inicializar i18n
  useEffect(() => {
    // Set initial language
    i18n.changeLanguage(data.locale).then(() => {});
  }, [i18n, data]);

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
        <ToastContextProvider>
          <Outlet />
          <ToastContainer />
        </ToastContextProvider>
        <ScrollRestoration />
        <Scripts />
        <ReactQueryDevtools initialIsOpen={false} />
      </body>
    </html>
  );
}
