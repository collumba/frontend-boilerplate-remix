import { useAuthContext } from "@/app/providers/auth-context";
import { useToast } from "@/app/providers/toast-context";
import { AuthResponse, RegisterData } from "@/shared/api/auth";
import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";
import { useApiMutation } from "@/shared/lib/query/query-hooks";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Link } from "@/shared/ui/link";
import { Muted, Typography } from "@/shared/ui/typography";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { checkAuth } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { actions } = useToast();
  const { mutate: register, isPending } = useApiMutation<
    AuthResponse,
    RegisterData
  >("/auth/local/register", "post", {
    onSuccess: async () => {
      await checkAuth();
      navigate(ROUTES.app.root);
    },
    onError: (err: any) => {
      actions.addToast({
        title: t("auth.error.register"),
        description:
          err.response?.data?.error?.message ||
          t("auth.error.registerDescription"),
        type: "error",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register({
      username,
      email,
      password,
    });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <Typography variant="h1">{t("auth.register.title")}</Typography>
        <Muted className="text-sm text-balance">
          {t("auth.register.description")}
        </Muted>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">{t("auth.register.username")}</Label>
          <Input
            id="username"
            type="text"
            placeholder="usuario123"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">{t("auth.register.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">{t("auth.register.password")}</Label>
          <Input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirm-password">
            {t("auth.register.confirmPassword")}
          </Label>
          <Input
            id="confirm-password"
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? t("auth.register.loading") : t("auth.register.register")}
        </Button>
      </div>
      <div className="text-center text-sm flex items-center justify-center gap-2">
        {t("auth.register.alreadyHaveAccount")}
        <Link href={ROUTES.auth.login} variant="underline">
          {t("auth.register.login")}
        </Link>
      </div>
    </form>
  );
}
