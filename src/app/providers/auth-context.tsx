import { useAuth } from '@shared/lib/hooks/useAuth';
import { QueryObserverResult, RefetchOptions, UseMutateFunction } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

interface AuthResponse {
  jwt: string;
  user: User;
}

interface AuthContextType {
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

// Criar contexto com um valor padrão vazio
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Provider do contexto de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
