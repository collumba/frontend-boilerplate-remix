import { Button } from "@app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { Typography } from "@app/components/ui/typography";
import { supportedLngsConfig } from "@app/config/i18n";
import { useToast, useToastI18n } from "@app/contexts/toast-context";
import i18nServer from "@app/modules/i18n/i18n.server";
import { jsonWithToastNotification } from "@app/modules/toast/toast.server";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { env } from "env";
import { useTranslation } from "react-i18next";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await i18nServer.getFixedT(request);
  return jsonWithToastNotification(
    { message: "Loader Response" },
    {
      type: "success",
      title: t("component.toast.success.title"),
      description: t("component.toast.success.description", {
        app: "Remix",
      }),
    }
  );
};

/**
 * @description Example page for translations in the project
 * @returns {JSX.Element}
 */
export default function TranslationExamplePage() {
  const { t, i18n } = useTranslation();
  const { actions } = useToast();
  const toast = useToastI18n();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    toast.success("component.toast.language.changed", {
      language: t(`locale.languages.${language}`),
    });
  };

  const getLocales = () => {
    return supportedLngsConfig.map((lng) => ({
      label: lng.language,
      flag: lng.flag,
    }));
  };

  const currentLocale = getLocales().find(
    (locale) => locale.label === i18n.language
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Typography variant="h1">i18n Examples</Typography>
      <Card>
        <CardHeader>
          <CardTitle>Current Language</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <img
              src={`${env.LOCALE_RESOURCES}/${currentLocale?.flag}.svg`}
              alt={currentLocale?.label}
              className="w-6 h-6"
            />
            <Typography variant="large">
              {t(`locale.languages.${i18n.language}`)}
            </Typography>
          </div>
          <div className="flex flex-wrap gap-2">
            {getLocales().map((locale) => (
              <Button
                key={locale.label}
                variant={locale.label === i18n.language ? "default" : "outline"}
                onClick={() => changeLanguage(locale.label)}
                className="flex items-center gap-2"
              >
                <img
                  src={`${env.LOCALE_RESOURCES}/${locale.flag}.svg`}
                  alt={locale.label}
                  className="w-4 h-4"
                />
                {t(`locale.languages.${locale.label}`)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t("common.action.apply")} Client-side</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Typography>
            {t("app.message.error.404.title")} -{" "}
            {t("app.message.error.404.message")}
          </Typography>
          <Button
            onClick={() =>
              actions.addToast({
                type: "success",
                title: t("component.toast.success.title"),
                description: t("component.toast.success.description", {
                  app: "Remix",
                }),
              })
            }
          >
            {t("common.action.apply")} Toast
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t("common.action.apply")} Server-side</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Typography>{t("auth.login.description")}</Typography>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => window.location.reload()}>
              Loader with Toast
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Typography variant="small">Component usage:</Typography>
            <code className="block bg-muted p-2 rounded">
              {`import { useTranslation } from "react-i18next";`}
              <br />
              {`const { t } = useTranslation();`}
              <br />
              {`return <div>{t("common.action.save")}</div>;`}
            </code>
          </div>

          <div className="space-y-2">
            <Typography variant="small">With variables:</Typography>
            <code className="block bg-muted p-2 rounded">
              {`t("component.toast.success.description", { app: "Remix" })`}
            </code>
          </div>

          <div className="space-y-2">
            <Typography variant="small">Server-side:</Typography>
            <code className="block bg-muted p-2 rounded">
              {`import i18n from "@app/modules/i18n.server";`}
              <br />
              {`const t = await i18n.getFixedT(request);`}
              <br />
              {`return json({ title: t("app.message.error.404.title") });`}
            </code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nomenclature Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Typography>
            Use the following best practices for organizing translation keys:
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 border rounded-md p-4">
              <Typography variant="small" className="font-semibold">
                Hierarchical Namespacing
              </Typography>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  <code>app.feature.component.element.state</code>
                </li>
                <li>
                  <code>auth.login.button.submit</code>
                </li>
                <li>
                  <code>entities.user.fields.email</code>
                </li>
              </ul>
              <Typography variant="small" className="text-muted-foreground">
                This makes keys more organized and easier to find.
              </Typography>
            </div>

            <div className="space-y-2 border rounded-md p-4">
              <Typography variant="small" className="font-semibold">
                Reuse Common Elements
              </Typography>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  <code>common.action.save</code>
                </li>
                <li>
                  <code>common.action.cancel</code>
                </li>
                <li>
                  <code>common.form.required</code>
                </li>
              </ul>
              <Typography variant="small" className="text-muted-foreground">
                Prevents duplication of common UI texts.
              </Typography>
            </div>
          </div>

          <div className="space-y-2 border rounded-md p-4">
            <Typography variant="small" className="font-semibold">
              Do's and Don'ts
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="font-semibold text-green-600"
                >
                  ✓ Do
                </Typography>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Use camelCase for keys</li>
                  <li>Group by feature/module</li>
                  <li>Keep keys consistent across languages</li>
                  <li>Use variables for dynamic content</li>
                </ul>
              </div>
              <div>
                <Typography
                  variant="small"
                  className="font-semibold text-red-600"
                >
                  ✗ Don't
                </Typography>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Use flat structure for all keys</li>
                  <li>Create keys with spaces or special chars</li>
                  <li>Duplicate similar texts across keys</li>
                  <li>Hardcode formatting in translations</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Typography variant="small" className="font-semibold">
              Technologies Used
            </Typography>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <code>i18next</code> - Core internationalization framework
              </li>
              <li>
                <code>react-i18next</code> - React bindings for i18next
              </li>
              <li>
                <code>remix-i18next</code> - Server-side integration for Remix
              </li>
              <li>
                <code>i18next-browser-languagedetector</code> - Detects user
                language preference
              </li>
              <li>
                <code>i18next-fetch-backend</code> - Loads translations via API
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <Typography variant="small" className="font-semibold">
              Project Structure
            </Typography>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <code>app/locales/</code> - Translation files (en.ts, pt-BR.ts,
                es.ts)
              </li>
              <li>
                <code>app/config/i18n.ts</code> - i18n configuration
              </li>
              <li>
                <code>app/modules/i18n.server.ts</code> - Server-side i18n setup
              </li>
              <li>
                <code>app/entry.client.tsx</code> - Client-side i18n
                initialization
              </li>
              <li>
                <code>app/routes/api_.global.locales.ts</code> - API endpoint
                for loading translations
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <Typography variant="small" className="font-semibold">
              Implementation Flow
            </Typography>
            <div className="border rounded-md p-4 space-y-2">
              <Typography variant="small">
                1. <span className="font-semibold">Server-side</span>:
                Translations are loaded and used for SSR content
              </Typography>
              <Typography variant="small">
                2. <span className="font-semibold">Hydration</span>: Client
                initializes with same language as server
              </Typography>
              <Typography variant="small">
                3. <span className="font-semibold">Client-side</span>:
                Additional translations loaded via API as needed
              </Typography>
              <Typography variant="small">
                4. <span className="font-semibold">Language Switch</span>:
                Changes language on the fly without page reload
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
