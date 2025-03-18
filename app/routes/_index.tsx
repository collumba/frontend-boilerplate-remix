import { AppLayout } from "@components/layouts/app-layout";
import { Typography } from "@components/ui/Typography";
import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
export const meta: MetaFunction = () => {
  return [
    { title: "Remix Boilerplate" },
    {
      name: "description",
      content:
        "Um boilerplate para aplicações web frontend com Remix.run e TypeScript",
    },
  ];
};

export default function Index() {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <Typography variant="h1" className="mb-4">
          {t("title")}
        </Typography>
        <Typography variant="body1" className="mb-2">
          Este é um boilerplate para aplicações web frontend com Remix.run e
          TypeScript.
        </Typography>
      </div>
    </AppLayout>
  );
}
