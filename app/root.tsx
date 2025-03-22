import { ROUTES } from "@app/config/routes";
import i18next from "@app/modules/i18n.server";
import { themeSessionResolver } from "@app/modules/theme/sessions.server";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import { useChangeLanguage } from "remix-i18next/react";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

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
  console.log(locale);
  return {
    theme: getTheme() || Theme.LIGHT,
    locale,
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider
      specifiedTheme={data.theme}
      themeAction={ROUTES.api.global.setTheme}
    >
      <App />
    </ThemeProvider>
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// export function ErrorBoundary() {
//   const error = useRouteError();
//   const { errorMessage, errorCode } = ErrorBoundaryParserError({ error });
//   return <ShowError code={errorCode} message={errorMessage} />;
// }
