import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, User } from '../services/api';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (otp: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (token) {
      api.getProfile(token)
        .then((userData) => {
          setUser(userData);
          setAccessToken(token);
        })
        .catch(() => {
          if (refreshToken) {
            api.refreshToken(refreshToken)
              .then((response) => {
                localStorage.setItem('access_token', response.access_token);
                setAccessToken(response.access_token);
                return api.getProfile(response.access_token);
              })
              .then((userData) => {
                setUser(userData);
              })
              .catch(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
              });
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (otp: string) => {
    const response = await api.login(otp);
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    setAccessToken(response.access_token);
    setUser(response.user);
  };

  const logout = async () => {
    if (accessToken) {
      try {
        await api.logout(accessToken);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, isLoading }}>
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
