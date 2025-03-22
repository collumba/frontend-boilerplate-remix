import { useTranslation } from "react-i18next";

export default function IndexPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
