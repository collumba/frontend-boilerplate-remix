import { createCookieSessionStorage, Session } from '@remix-run/node';
import { env } from '@shared/config/env';
import { TOAST_COOKIE_NAME, TOAST_COOKIE_PATH, TOAST_COOKIE_SECRET } from '../config';
import { ToastType } from '../constants';

export type ToastMessage = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  createdAt: number;
};

const isProduction = env.NODE_ENV === 'production';
const domain = env.DOMAIN;

// Create session storage for toasts
const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: TOAST_COOKIE_NAME,
    path: TOAST_COOKIE_PATH,
    httpOnly: true,
    sameSite: 'lax',
    secrets: [TOAST_COOKIE_SECRET],
    // only domain and secure in production
    ...(isProduction ? { domain, secure: true } : {}),
  },
});

// Functions to manage toasts in session
export async function getToastSession(request: Request) {
  return toastSessionStorage.getSession(request.headers.get('Cookie'));
}

export async function commitToastSession(session: Session) {
  return toastSessionStorage.commitSession(session);
}

// Functions to manage toasts in session
export async function getToastMessages(request: Request): Promise<ToastMessage[]> {
  const session = await getToastSession(request);
  const messages = session.get('toastMessages') || [];
  return messages;
}

export async function setToastMessage(
  request: Request,
  message: Omit<ToastMessage, 'id' | 'createdAt'>
): Promise<string> {
  const session = await getToastSession(request);
  const messages = session.get('toastMessages') || [];

  // Create a new message with unique ID and timestamp
  const newMessage: ToastMessage = {
    ...message,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  // Add the new message to the list
  session.set('toastMessages', [...messages, newMessage]);

  // Return an updated cookie with the session
  return await commitToastSession(session);
}

export async function clearToastMessages(request: Request): Promise<string> {
  const session = await getToastSession(request);
  session.set('toastMessages', []);
  return await commitToastSession(session);
}
