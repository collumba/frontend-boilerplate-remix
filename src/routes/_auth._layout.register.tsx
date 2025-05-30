import { RegisterForm } from '@features/auth/ui/register-form';
import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Register' }, { name: 'description', content: 'Register' }];
};

export default function RegisterPage() {
  return <RegisterForm />;
}
