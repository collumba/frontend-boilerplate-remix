import { Container } from "@components/ui/Container";
import { EmptyState } from "@components/ui/EmptyState";
import { Link } from "@remix-run/react";
import { ExpandIcon } from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

export const NotFoundLayout = forwardRef<HTMLAttributes<HTMLDivElement>>(
  (
    {  ...props },
    ref,
  ) => {
  const { t } = useTranslation();
  return (
    <Container className="flex items-center justify-center h-screen" {...props}>
      <EmptyState
        className="w-full"
        title={t("notFound.title")}
        description={t("notFound.description")}
        icon={<ExpandIcon role="icon" className="h-10 w-10 text-gray-400" />}
        action={
          <Link
          to="/"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {t("notFound.action")}
          </Link>
        }
    />
    </Container>
  );
    }   
)

NotFoundLayout.displayName = "NotFoundLayout";
