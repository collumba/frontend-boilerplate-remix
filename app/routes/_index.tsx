import { AppLayout } from "@components/layouts/AppLayout";
import { Button } from "@components/ui/button";
import { Typography } from "@components/ui/typography";
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
  const { t, i18n } = useTranslation();

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <Typography variant="h1" className="mb-4">
          Bem-vindo ao Remix Boilerplate
        </Typography>
        <Typography variant="body1" className="mb-2">
          Este é um boilerplate para aplicações web frontend com Remix.run e
          TypeScript.
        </Typography>
        <Button onClick={() => alert(t("buttonClicked"))}>
          {t("clickMe")}
        </Button>
      </div>
    </AppLayout>
  );
}
