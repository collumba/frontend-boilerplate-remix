import { authService } from '@features/auth/api/auth';
import { useToast } from '@features/toast';
import { ROUTES } from '@shared/config/routes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthData {
  isAuthenticated: boolean;
  user: User | null;
}

// Custom hook to check authentication status
function useAuthCheck(setAuthState: (data: AuthData) => void) {
  const { actions } = useToast();
  const { t } = useTranslation();

  const query = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const isAuthValid = authService.isAuthenticated();

        if (isAuthValid) {
          const userData = await authService.me();
          return {
            isAuthenticated: true,
            user: userData,
          };
        }

        return {
          isAuthenticated: false,
          user: null,
        };
      } catch (error) {
        actions.addToast({
          title: t('auth.error.checkAuth'),
          description: t('auth.error.checkAuthDescription'),
          type: 'error',
        });
        if (typeof window !== 'undefined') {
          authService.logout();
        }
        return {
          isAuthenticated: false,
          user: null,
        };
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // Handle the success case with useEffect instead of onSuccess option
  useEffect(() => {
    if (query.data) {
      setAuthState(query.data);
    }
  }, [query.data, setAuthState]);

  return query;
}

// Custom hook for login functionality
function useAuthLogin(setAuthState: (data: AuthData) => void) {
  const { actions } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: async ({
      identifier,
      password,
    }: {
      identifier: string;
      password: string;
      rememberMe?: boolean;
    }) => {
      return authService.login({ identifier, password });
    },
    onSuccess: (response) => {
      setAuthState({
        isAuthenticated: true,
        user: response.user,
      });
    },
    onError: () => {
      actions.addToast({
        title: t('auth.error.login'),
        description: t('auth.error.loginDescription'),
        type: 'error',
      });
    },
  });
}

// Custom hook for logout functionality
function useAuthLogout(setAuthState: (data: AuthData) => void) {
  const { actions } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
      window.location.href = ROUTES.auth.login;
    },
    onError: () => {
      actions.addToast({
        title: t('auth.error.logout'),
        description: t('auth.error.logoutDescription'),
        type: 'error',
      });
    },
  });
}

export function useAuth() {
  const hasToken = typeof window !== 'undefined' ? !!authService.getToken() : false;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasToken);
  const [user, setUser] = useState<User | null>(null);

  // Function to update authentication state from sub-hooks
  const setAuthState = (data: AuthData) => {
    setIsAuthenticated(data.isAuthenticated);
    setUser(data.user);
  };

  const { refetch: checkAuth, isLoading: isCheckAuthLoading } = useAuthCheck(setAuthState);
  const { mutate: login, isPending: isLoginPending } = useAuthLogin(setAuthState);
  const { mutate: logout, isPending: isLogoutPending } = useAuthLogout(setAuthState);

  useEffect(() => {
    if (hasToken) {
      checkAuth();
    }
  }, [checkAuth, hasToken]);

  return {
    isLoading: isLoginPending || isLogoutPending || isCheckAuthLoading,
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
}
