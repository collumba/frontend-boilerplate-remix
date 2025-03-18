// import type { LinksFunction } from "@remix-run/node";
// import { type LoaderFunctionArgs } from "@remix-run/node";
// import {
//   Links,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
//   useLoaderData,
// } from "@remix-run/react";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   PreventFlashOnWrongTheme,
//   ThemeProvider,
//   useTheme,
// } from "remix-themes";
// import { TranslationsLanguages } from "./i18n/i18n";

// import { TooltipProvider } from "@components/ui/tooltip";
// import clsx from "clsx";
// import { themeSessionResolver } from "./services/theme/sessions.server";
// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: "../app/styles/globals.css" },
//   { rel: "preconnect", href: "https://fonts.googleapis.com" },
//   {
//     rel: "preconnect",
//     href: "https://fonts.gstatic.com",
//     crossOrigin: "anonymous",
//   },
//   {
//     rel: "stylesheet",
//     href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
//   },
// ];

// export async function loader({ request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const lng = url.searchParams.get("lng") || TranslationsLanguages.PT_BR;
//   const { getTheme } = await themeSessionResolver(request);
//   return { lng, themeData: getTheme() };
// }
// export default function AppWithProviders() {
//   const { themeData } = useLoaderData<typeof loader>();
//   return (
//     <ThemeProvider specifiedTheme={themeData} themeAction="globals/set-theme">
//       <TooltipProvider>
//         <App />
//       </TooltipProvider>
//     </ThemeProvider>
//   );
// }
// export function App() {
//   const { lng, themeData } = useLoaderData<typeof loader>();
//   const { i18n } = useTranslation();
//   const [theme] = useTheme();
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     if (lng && i18n.language !== lng) {
//       i18n.changeLanguage(lng);
//     }
//   }, [lng, i18n]);

//   return (
//     <html lang={lng} className={clsx(theme)} dir={i18n.dir(lng)}>
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <PreventFlashOnWrongTheme ssrTheme={Boolean(themeData)} />
//         <Links />
//       </head>
//       <body>
//         <Outlet />;
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }

// // export default function App() {
// //   return <Outlet />;
// // }

// export function ErrorBoundary() {
//   const { i18n } = useTranslation();
//   const lang = i18n.language || TranslationsLanguages.PT_BR;

//   return (
//     // <Layout>
//     <div className="flex min-h-full flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
//       <p>We're sorry, but an error occurred while processing your request.</p>
//     </div>
//     // </Layout>
//   );
// }
import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import { useChangeLanguage } from "remix-i18next/react";
import i18nServer, { localeCookie } from "./modules/i18n.server";

export const handle = { i18n: ["translation"] };

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  return json(
    { locale },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang={loaderData?.locale ?? "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  return <Outlet />;
}
