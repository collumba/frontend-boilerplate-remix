import i18next, { localeCookie } from "@app/modules/i18n.server";
import { themeSessionResolver } from "@app/modules/theme/sessions.server";
import ShowError from "@components/ui/show-error";
import { TooltipProvider } from "@components/ui/tooltip";
import type { LinksFunction } from "@remix-run/node";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useChangeLanguage } from "remix-i18next/react";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  type Theme,
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
  const locale = await i18next.getLocale(request);
  const { getTheme } = await themeSessionResolver(request);
  const theme = getTheme();

  return json(
    { locale, theme },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
}

function Layout({
  children,
  locale,
  theme,
}: {
  children: React.ReactNode;
  locale: string;
  theme: Theme | null;
}) {
  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/globals/set-theme">
      <TooltipProvider>
        <html lang={locale} className={theme || ""}>
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <Meta />
            <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
            <Links />
          </head>
          <body>
            {children}
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default function App() {
  const { locale, theme } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);

  return (
    <Layout locale={locale} theme={theme}>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary() {
  const { locale, theme } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  const error = useRouteError();
  let errorMessage = "";
  let errorCode = 500;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "object" && error !== null) {
    const errorObj = error as { status?: number; statusText?: string };
    if (errorObj.status) errorCode = errorObj.status;
    if (errorObj.statusText) errorMessage = errorObj.statusText;
  }

  return (
    <Layout locale={locale} theme={theme}>
      <ShowError code={errorCode} message={errorMessage} />
    </Layout>
  );
}
