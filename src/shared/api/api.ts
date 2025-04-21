import { AUTH_CONFIG } from '@shared/config/auth';
import { env } from '@shared/config/env';
import axios, { AxiosInstance } from 'axios';

export class ApiService {
  private client: AxiosInstance;
  constructor() {
    const baseURL = env.API_URL;
    this.client = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Interceptor to add authentication token
    this.client.interceptors.request.use((config) => {
      // Do not add token to authentication routes
      const isAuthRoute =
        config.url?.includes('/api/auth/local') || config.url?.includes('/api/auth/local/register');

      if (!isAuthRoute) {
        const token =
          localStorage.getItem(AUTH_CONFIG.TOKEN_KEY) ||
          sessionStorage.getItem(AUTH_CONFIG.TOKEN_KEY);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    });
  }

  get<T>(url: string) {
    return this.client.get<T>(url).then((response) => response.data);
  }

  post<T, D>(url: string, data: D) {
    return this.client.post<T>(url, data).then((response) => response.data);
  }

  put<T, D>(url: string, data: D) {
    return this.client.put<T>(url, data).then((response) => response.data);
  }

  delete<T>(url: string) {
    return this.client.delete<T>(url).then((response) => response.data);
  }
}
