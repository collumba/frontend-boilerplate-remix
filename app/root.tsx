import type { LinksFunction } from "@remix-run/node";
import { type LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TranslationsLanguages } from "./i18n/i18n";
import styles from "./styles/globals.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
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
  const url = new URL(request.url);
  const lng = url.searchParams.get("lng") || TranslationsLanguages.PT_BR;
  return { lng };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { lng } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return (
    <html lang={lng} className="h-full" dir={i18n.dir(lng)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <LiveReload />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const { i18n } = useTranslation();
  const lang = i18n.language || TranslationsLanguages.PT_BR;

  return (
    <Layout>
      <div className="flex min-h-full flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
        <p>We're sorry, but an error occurred while processing your request.</p>
      </div>
    </Layout>
  );
}
