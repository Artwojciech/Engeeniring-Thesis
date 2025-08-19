import { api, setTokens, clearTokens } from "@/lib/api";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  age: string; 
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  age: string;
  is_admin: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const loginUser = async (data: LoginRequest): Promise<{ user: User; tokens: Tokens }> => {
  const res = await api.post("/login", data);
  const { user, tokens } = res.data;
  setTokens(tokens.accessToken, tokens.refreshToken);
  return { user, tokens };
};

export const registerUser = async (data: RegisterRequest): Promise<{ user: User; tokens: Tokens }> => {
  const res = await api.post("/register", data);
  const { user, tokens } = res.data;
  setTokens(tokens.accessToken, tokens.refreshToken);
  return { user, tokens };
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await api.get("/current");
  return res.data.user;
};

export const logoutUser = () => {
  clearTokens();
};
