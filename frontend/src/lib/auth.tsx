'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { api } from './api';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await api.auth.me();
        setUser(userData);
      } catch (err) {
        console.error('Auth check failed', err);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: any) => {
    const { user, token } = await api.auth.login(data);
    localStorage.setItem('auth_token', token);
    setUser(user);
    router.push('/dashboard');
  };

  const register = async (data: any) => {
    const { user, token } = await api.auth.register(data);
    localStorage.setItem('auth_token', token);
    setUser(user);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/');
  };

  // Protected routes logic
  useEffect(() => {
    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.includes(pathname);

    if (!loading && !user && !isPublicPath) {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
