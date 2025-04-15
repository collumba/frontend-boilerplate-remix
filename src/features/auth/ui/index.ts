/**
 * Auth Feature UI components
 *
 * This file exports UI components specific to the auth feature.
 * The actual implementation would import the components from the widgets
 * and re-export them with feature-specific adjustments if needed.
 */

// In a real implementation, we'd create the components here and export them
// For now, we'll export types to show the concept

export type LoginForm = {
  email: string;
  password: string;
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
};

export type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  onSubmit: (data: { email: string; password: string; name: string }) => void;
  isLoading?: boolean;
};
