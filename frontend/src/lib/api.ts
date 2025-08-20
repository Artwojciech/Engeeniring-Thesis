import axios from "axios";
import { logoutUser } from "@/services/auth";

const API_URL = "http://localhost:4000/api"; 

let accessToken: string | null = localStorage.getItem("accessToken");
let refreshToken: string | null = localStorage.getItem("refreshToken");

export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          { headers: { "x-refresh-token": refreshToken } }
        );

        const newAccess = res.data.tokens.accessToken;
        const newRefresh = res.data.tokens.refreshToken;

        setTokens(newAccess, newRefresh);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        logoutUser();
        window.location.href = "/signin";      //nie uzywamy link bo chcemy zresetowac strone!!! musze o tym pamietac
      }                                         //bo specjalnie to zmienilem
    }

    return Promise.reject(error);
  }
);
