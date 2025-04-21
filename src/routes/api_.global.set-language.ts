import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { supportedLngs } from '@shared/config/i18n';
import { localeCookie } from '@shared/lib/i18n/i18n.server';
import { z } from 'zod';

const SetLanguageSchema = z.object({
  language: z.string().refine((lang) => supportedLngs.includes(lang), {
    message: 'Unsupported language',
  }),
  redirectTo: z.string().default('/'),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  // Validate inputs with zod
  const result = SetLanguageSchema.safeParse(rawData);

  if (!result.success) {
    return redirect('/', {
      headers: {
        'X-Error': 'Invalid language selection',
      },
    });
  }

  const { language, redirectTo } = result.data;

  // Serialize the locale cookie with the new language
  const serializedCookie = await localeCookie.serialize(language);

  // Redirect back to the page they came from or the specified redirect
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': serializedCookie,
    },
  });
}
