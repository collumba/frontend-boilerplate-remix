import { cn } from "@app/components/lib/utils";
import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { Link } from "@app/components/ui/link";
import { Muted, Typography } from "@app/components/ui/typography";
import { ROUTES } from "@app/config/routes";
import { useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <Typography variant="h1">{t("auth.login.title")}</Typography>
        <Muted className="text-sm text-balance">
          {t("auth.login.description")}
        </Muted>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">{t("auth.login.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="password">{t("auth.login.password")}</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        <Link href="#" variant="underline" className="text-right">
          {t("auth.login.forgotPassword")}
        </Link>
        <Button type="submit" className="w-full">
          {t("auth.login.button")}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <Muted className="relative z-10 px-2">
            {t("auth.login.orContinueWith")}
          </Muted>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(ROUTES.app.root)}
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          {t("auth.login.loginWithGitHub")}
        </Button>
      </div>
      <div className="text-center text-sm flex items-center justify-center gap-2">
        {t("auth.login.dontHaveAccount")}
        <Link href="#" variant="underline">
          {t("auth.login.signUp")}
        </Link>
      </div>
    </form>
  );
}
