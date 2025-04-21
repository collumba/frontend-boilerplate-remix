import type { TypedResponse } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import type { ToastMessage } from './session';
import { setToastMessage } from './session';

/**
 * Return a JSON response with a toast notification
 * @param data - The data to return
 * @param message - The toast message to show
 * @returns A typed response with the data and a toast notification
 */
export async function jsonWithToastNotification<T>(
  data: T,
  message: Omit<ToastMessage, 'id' | 'createdAt'>
): Promise<TypedResponse<T>> {
  const toastCookie = await setToastMessage(new Request(''), message);

  return json(data, {
    headers: {
      'Set-Cookie': toastCookie,
    },
  });
}

/**
 * Redirect to a URL with a toast notification
 * @param url - The URL to redirect to
 * @param message - The toast message to show
 * @returns A redirect response with a toast notification
 */
export async function redirectWithToastNotification(
  url: string,
  message: Omit<ToastMessage, 'id' | 'createdAt'>
): Promise<TypedResponse<never>> {
  const toastCookie = await setToastMessage(new Request(''), message);

  return redirect(url, {
    headers: {
      'Set-Cookie': toastCookie,
    },
  });
}
