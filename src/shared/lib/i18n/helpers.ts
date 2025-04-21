import { useSubmit } from '@remix-run/react';
import { ROUTES } from '@shared/config/routes';

/**
 * Hook to change the language with server-side persistence.
 * This performs a form submission to update the language cookie
 * and reload the page with the new language applied.
 */
export function useServerLanguageChange() {
  const submit = useSubmit();

  /**
   * Change the language by submitting a form to the server.
   * This ensures the language cookie is properly set and preserved across page reloads.
   *
   * @param language - The language code to change to
   * @param redirectTo - Optional path to redirect to after the language change (defaults to current page)
   */
  const changeLanguage = (language: string, redirectTo?: string) => {
    const formData = new FormData();
    formData.append('language', language);

    if (redirectTo) {
      formData.append('redirectTo', redirectTo);
    } else {
      // If no redirectTo is specified, redirect to the current page
      formData.append('redirectTo', window.location.pathname + window.location.search);
    }

    submit(formData, {
      method: 'post',
      action: ROUTES.api.global.setLanguage,
    });
  };

  return { changeLanguage };
}
