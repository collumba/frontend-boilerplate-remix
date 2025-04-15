import { useAuth } from "@/shared/lib/hooks/useAuth";
import { RefetchOptions, UseMutateFunction } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

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
  checkAuth: (options?: RefetchOptions) => Promise<any>;
}

// Create context with a default empty value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

// Authentication context provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
