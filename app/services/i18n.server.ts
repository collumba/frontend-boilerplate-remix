import { RemixI18Next } from "remix-i18next/server";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import i18n from "@services/i18n";

const i18next: RemixI18Next = new RemixI18Next({
  detection: {
    supportedLanguages: ["en", "pt-BR"],
    fallbackLanguage: "pt-BR",
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
  },
  plugins: [Backend],
});

export default i18next; 