import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { Link } from "@app/components/ui/link";
import { Muted, Typography } from "@app/components/ui/typography";
import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { authService } from "@app/services/auth";
import { cn } from "@app/utils/cn";
import { useNavigate } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
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
  const [error, setError] = useState<string | null>(null);
  const { mutate: register, isPending } = useMutation({
    mutationFn: async () => {
      // Validações básicas
      if (password !== confirmPassword) {
        throw new Error(t("auth.register.error.passwordMismatch"));
      }

      if (password.length < 6) {
        throw new Error(t("auth.register.error.passwordTooShort"));
      }

      return authService.register({
        username,
        email,
        password,
      });
    },
    onSuccess: async () => {
      await checkAuth();
      navigate(ROUTES.app.root);
    },
    onError: (err: any) => {
      setError(
        err.response?.data?.error?.message ||
          t("auth.register.error.registrationFailed")
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    register();
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
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        )}
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
