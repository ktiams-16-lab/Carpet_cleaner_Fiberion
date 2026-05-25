'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('fiberion-admin') === 'true');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login(email, password) {
        if (!email || !password) return false;
        localStorage.setItem('fiberion-admin', 'true');
        setIsAuthenticated(true);
        return true;
      },
      logout() {
        localStorage.removeItem('fiberion-admin');
        setIsAuthenticated(false);
      }
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
