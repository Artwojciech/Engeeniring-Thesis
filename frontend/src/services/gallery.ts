import { api } from "@/lib/api";

export interface Photo {
  id: string;          
  title?: string | null;
  filename: string;
  category_id: string;
}

export interface PaginatedPhotos {
  photos: Photo[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

interface AxiosErr {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const getPhotoById = async (id: string): Promise<Photo> => {
  try {
    const res = await api.get<Photo>(`/photos/${id}`);
    return res.data;
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to fetch photo by ID";
    throw new Error(message);
  }
};

export const getPhotosByCategory = async (
  categoryName: string,
  title?: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedPhotos> => {
  try {
    const params: Record<string, string | number> = { page, limit };
    if (title) params.title = title;

    const res = await api.get<PaginatedPhotos>(`/photos/category/${categoryName}`, {
      params,
    });

    return res.data;
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to fetch photos by category";
    throw new Error(message);
  }
};
export const addPhoto = async (
  title: string,
  category: string,
  file: File
): Promise<Photo> => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("file", file);

    const res = await api.post<Photo>(`/photos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to add photo";
    throw new Error(message);
  }
};

export const updatePhoto = async (
  id: string,
  newTitle: string
): Promise<Photo> => {
  try {
    const res = await api.put<Photo>(`/photos/${id}`, {
      title: newTitle,
    });
    return res.data;
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to update photo";
    throw new Error(message);
  }
};

export const deletePhoto = async (id: string): Promise<void> => {
  try {
    await api.delete(`/photos/${id}`);
  } catch (err: unknown) {
    const AxiosErr = err as AxiosErr;
    const message =
      AxiosErr.response?.data?.message || "Failed to delete photo";
    throw new Error(message);
  }
};
