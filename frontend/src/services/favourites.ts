import { api } from "@/lib/api";
import type { PaginatedPhotos } from "@/services/gallery";

interface AxiosErr {
  response?: {
    data?: {
      message?: string;
    };
  };
}


export const getFavourites = async (
  page: number = 1,
  limit: number = 20,
  sort: "asc" | "desc" = "asc",
  from?: string,
  to?: string
): Promise<PaginatedPhotos> => {
  try {
    const params: Record<string, string | number> = { page, limit, sort };
    if (from) params.from = from;
    if (to) params.to = to;

    const res = await api.get<PaginatedPhotos>("/favourites", { params });
    return res.data;
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to fetch favourites";
    throw new Error(message);
  }
};

export const addFavourite = async (photoId: string): Promise<void> => {
  try {
    await api.post(`/favourites/${photoId}`);
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to add favourite";
    throw new Error(message);
  }
};

export const deleteFavourite = async (photoId: string): Promise<void> => {
  try {
    await api.delete(`/favourites/${photoId}`);
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to delete favourite";
    throw new Error(message);
  }
};

export const isFavourite = async (photoId: string): Promise<boolean> => {
  try {
    const res = await api.get<{ isFavourite: boolean }>(`/favourites/${photoId}`);
    return res.data.isFavourite;
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to check favourite status";
    throw new Error(message);
  }
};


