import { LocaleToggle } from '@app/ui/locale-toggle';
import { requireGuest } from '@features/auth/lib/auth-server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { MetaFunction, Outlet } from '@remix-run/react';
import { ROUTES } from '@shared/config/routes';
import { Link } from '@shared/ui/link';
import { GalleryVerticalEnd } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const meta: MetaFunction = () => {
  return [{ title: 'Auth' }, { name: 'description', content: 'Auth' }];
};

// Server authentication verification
export async function loader({ request }: LoaderFunctionArgs) {
  await requireGuest(request);
  return {};
}

export default function AuthLayout() {
  const { t } = useTranslation();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2 items-center">
          <Link href={ROUTES.app.root} variant="muted">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" aria-hidden="true" />
            </div>
            {t('app.applicationName')}
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
          alt="Login placeholder"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
