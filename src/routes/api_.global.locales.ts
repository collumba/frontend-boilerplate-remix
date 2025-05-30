import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { env } from '@shared/config/env';
import { resources } from '@shared/config/i18n';
import { cacheHeader } from 'pretty-cache-header';
import { z } from 'zod';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const languages = resources;
  const lng = z
    .string()
    .refine((lng): lng is keyof typeof languages => Object.keys(languages).includes(lng))
    .parse(url.searchParams.get('lng'));
  const namespaces = languages[lng];
  const ns = z
    .string()
    .refine((ns): ns is keyof typeof namespaces => {
      return Object.keys(languages[lng]).includes(ns);
    })
    .parse(url.searchParams.get('ns'));
  const headers = new Headers();
  if (env.NODE_ENV === 'production') {
    headers.set(
      'Cache-Control',
      cacheHeader({
        maxAge: '5m',
        sMaxage: '1d',
        staleWhileRevalidate: '7d',
        staleIfError: '7d',
      })
    );
  } else {
    // Disable cache in development
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
  }

  return json(namespaces[ns], { headers });
}
