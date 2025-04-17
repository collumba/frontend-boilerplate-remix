import { AUTH_CONFIG } from '@shared/config/auth';

/**
 * Verifica se um token de autenticação existe nos cookies da requisição
 */
export function hasAuthToken(request: Request): boolean {
  const cookies = request.headers.get('Cookie') || '';
  return cookies.includes(`${AUTH_CONFIG.TOKEN_KEY}=`);
}

/**
 * Extrai o token de autenticação dos cookies da requisição
 */
export function getAuthToken(request: Request): string | null {
  const cookies = request.headers.get('Cookie') || '';
  const tokenCookie = cookies
    .split(';')
    .find((cookie) => cookie.trim().startsWith(`${AUTH_CONFIG.TOKEN_KEY}=`));

  if (!tokenCookie) return null;

  return tokenCookie.split('=')[1].trim();
}
