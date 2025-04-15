import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API_URL = process.env.API_URL || "/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - can be used to add auth tokens, etc.
apiClient.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    // e.g. add authentication token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access");
    }

    return Promise.reject(error);
  }
);

export type ApiError = {
  message: string;
  status: number;
  data?: unknown;
};

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
      data: error.response?.data,
    };
  }

  return {
    message: error instanceof Error ? error.message : "Unknown error",
    status: 500,
  };
};

export type ApiRequestConfig = AxiosRequestConfig;

export const api = {
  get: <T>(url: string, config?: ApiRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: ApiRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: ApiRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: ApiRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: ApiRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default api;
