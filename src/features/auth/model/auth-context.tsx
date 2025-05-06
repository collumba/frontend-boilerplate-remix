import { createContext, ReactNode, useContext } from 'react';
import { useAuth } from './use-auth';
import { AuthContextType } from './types';

// Create context with a default empty value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// Authentication context provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
