import { api } from "@/lib/api";
import type { User } from "@/services/auth";

interface AxiosErr {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const updateUsername = async (id: string, newUsername: string): Promise<User> => {
  try {
    const res = await api.put<{ user: User }>(`/users/${id}/username`, {
      username: newUsername,
    });
    return res.data.user;
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message = AxiosErr.response?.data?.message || "Failed to update username";
    throw new Error(message);
  }
};

export const updatePassword = async (
  id: string,
  currentPassword: string,
  newPassword: string
): Promise<User> => {
  try {
    const res = await api.put<{ user: User }>(`/users/${id}/password`, {
      currentPassword,
      newPassword,
    });
    return res.data.user;
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message = AxiosErr.response?.data?.message || "Failed to update password";
    throw new Error(message);
  }
};
