import { QueryObserverResult, RefetchOptions, UseMutateFunction } from '@tanstack/react-query';

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: UseMutateFunction<
    AuthResponse,
    Error,
    {
      identifier: string;
      password: string;
      rememberMe?: boolean;
    },
    unknown
  >;
  logout: UseMutateFunction<void, Error, void, unknown>;
  checkAuth: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        isAuthenticated: boolean;
        user: User | null;
      },
      Error
    >
  >;
}

export interface AuthData {
  isAuthenticated: boolean;
  user: User | null;
}
