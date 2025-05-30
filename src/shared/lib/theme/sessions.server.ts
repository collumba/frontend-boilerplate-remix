import { env } from '@shared/config/env';
import { createCookieSessionStorage } from 'react-router';
import { createThemeSessionResolver } from 'remix-themes';
const isProduction = env.NODE_ENV === 'production';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secrets: ['s3cr3t'],
    // Set domain and secure only if in production
    ...(isProduction ? { domain: 'your-production-domain.com', secure: true } : {}),
  },
});

// createThemeSessionResolver from remix-themes doesn't support defaultTheme option directly
export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
