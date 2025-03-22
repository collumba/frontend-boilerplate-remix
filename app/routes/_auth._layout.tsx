import { Link } from "@app/components/ui/link";
import { LocaleToggle } from "@app/components/ui/locale-toggle";
import { ROUTES } from "@app/config/routes";
import { Outlet } from "@remix-run/react";
import { GalleryVerticalEnd } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function IndexPage() {
  const { t } = useTranslation();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2 items-center">
          <Link href={ROUTES.app.root} variant="muted">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {t("app.applicationName")}
          </Link>
          <LocaleToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/login-placeholder.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
