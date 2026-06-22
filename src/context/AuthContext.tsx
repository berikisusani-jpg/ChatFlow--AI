import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('chatflow_token'));
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('chatflow_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData: any, token: string) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('chatflow_token', token);
    localStorage.setItem('chatflow_user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('chatflow_token');
    localStorage.removeItem('chatflow_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
