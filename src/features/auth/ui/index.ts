/**
 * Auth Feature UI components
 *
 * This file exports UI components specific to the auth feature.
 * The actual implementation would import the components from the widgets
 * and re-export them with feature-specific adjustments if needed.
 */

// Export actual components
export { LoginForm } from './login-form';
export { RegisterForm } from './register-form';

// Types used by the components
export type LoginFormProps = {
  email: string;
  password: string;
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
};

export type RegisterFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  onSubmit: (data: { email: string; password: string; name: string }) => void;
  isLoading?: boolean;
};
