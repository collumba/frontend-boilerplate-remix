'use client';

// App layer imports (allowed in features)
import { useAuthContext } from '@app/providers/auth-context';
// Feature layer imports
import { useToast } from '@features/toast';
import { useNavigate } from '@remix-run/react';
// Shared layer imports
import { authService } from '@shared/api/auth';
import { ROUTES } from '@shared/config/routes';
import { ApiError } from '@shared/types/api';
import { Button } from '@shared/ui/button';
import { cn } from '@shared/ui/cn';
import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { Link } from '@shared/ui/link';
import { Muted, Typography } from '@shared/ui/typography';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function RegisterForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { checkAuth } = useAuthContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { actions } = useToast();
  const { mutate: register, isPending } = useMutation({
    mutationFn: async () => {
      if (password !== confirmPassword) {
        throw new Error(t('auth.register.error.passwordMismatch'));
      }

      if (password.length < 6) {
        throw new Error(t('auth.register.error.passwordTooShort'));
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
    onError: (err: AxiosError<ApiError>) => {
      actions.addToast({
        title: t('auth.error.register'),
        description: err.response?.data?.error?.message || t('auth.error.registerDescription'),
        type: 'error',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register();
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <Typography variant="h1">{t('auth.register.title')}</Typography>
        <Muted className="text-sm text-balance">{t('auth.register.description')}</Muted>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">{t('auth.register.username')}</Label>
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
          <Label htmlFor="email">{t('auth.register.email')}</Label>
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
          <Label htmlFor="password">{t('auth.register.password')}</Label>
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
          <Label htmlFor="confirm-password">{t('auth.register.confirmPassword')}</Label>
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
          {isPending ? t('auth.register.loading') : t('auth.register.register')}
        </Button>
      </div>
      <div className="text-center text-sm flex items-center justify-center gap-2">
        {t('auth.register.alreadyHaveAccount')}
        <Link href={ROUTES.auth.login} variant="underline">
          {t('auth.register.login')}
        </Link>
      </div>
    </form>
  );
}
