'use client';

// App layer imports (allowed in features)
// Shared layer imports
import { authService } from '@features/auth/api/auth';
import { useAuthContext } from '@features/auth';
// Feature layer imports
import { useToast } from '@features/toast';
import { useNavigate } from '@remix-run/react';
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

// Custom hook for register form logic
interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function useRegisterMutation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { checkAuth } = useAuthContext();
  const { actions } = useToast();

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const { username, email, password, confirmPassword } = data;

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
}

// Component for form header
function FormHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Typography variant="h1">{t('auth.register.title')}</Typography>
      <Muted className="text-sm text-balance">{t('auth.register.description')}</Muted>
    </div>
  );
}

// Component for a single form field
interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
}

function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  required = true,
}: FormFieldProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

// Component for the register form footer with login link
function FormFooter() {
  const { t } = useTranslation();

  return (
    <div className="text-center text-sm flex items-center justify-center gap-2">
      {t('auth.register.alreadyHaveAccount')}
      <Link href={ROUTES.auth.login} variant="underline">
        {t('auth.register.login')}
      </Link>
    </div>
  );
}

export function RegisterForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutate: register, isPending } = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register({ username, email, password, confirmPassword });
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit}>
      <FormHeader />

      <div className="grid gap-6">
        <FormField
          id="username"
          label={t('auth.register.username')}
          type="text"
          placeholder="usuario123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormField
          id="email"
          label={t('auth.register.email')}
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <FormField
          id="password"
          label={t('auth.register.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <FormField
          id="confirm-password"
          label={t('auth.register.confirmPassword')}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? t('auth.register.loading') : t('auth.register.register')}
        </Button>
      </div>

      <FormFooter />
    </form>
  );
}
