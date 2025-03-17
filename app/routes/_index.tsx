import { AppLayout } from "@components/layouts/AppLayout";
import { Button } from "@components/ui/button";
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
  const { t, i18n } = useTranslation();

  return (
    <AppLayout>
      <h1>
        <Typography variant="h1">Hello World</Typography>
        <Button variant="default">Click me</Button>
        <Button variant="default">Click me</Button>
      </h1>
    </AppLayout>
  );
}
