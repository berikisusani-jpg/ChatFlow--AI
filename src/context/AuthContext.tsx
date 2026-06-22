import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: any;
  login: (userData: any, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('chatflow_access_token'));
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('chatflow_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData: any, accessToken: string, refreshToken: string) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem('chatflow_access_token', accessToken);
    localStorage.setItem('chatflow_refresh_token', refreshToken);
    localStorage.setItem('chatflow_user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('chatflow_access_token');
    localStorage.removeItem('chatflow_refresh_token');
    localStorage.removeItem('chatflow_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
