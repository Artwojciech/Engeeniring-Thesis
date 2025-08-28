import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { loginUser,  registerUser, logoutUser, getCurrentUser } from "@/services/auth";
import type { User } from "@/services/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, age: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  setUser: (user: User | null) => void;
}

interface AxiosErr {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const { user } = await loginUser({ username, password });
    setUser(user);
  };

  const register = async (username: string, email: string, age: string, password: string) => {
  try {
    const { user } = await registerUser({ username, email, age, password });
    setUser(user);
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message = AxiosErr.response?.data?.message || "Failed to create account";
    throw new Error(message);
  }
};

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
