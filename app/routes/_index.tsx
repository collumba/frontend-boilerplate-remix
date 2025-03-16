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
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
