import { api} from "@/lib/api";

export interface Category {
  id: string;
  name: string;
}

interface CategoriesResponse {
  categories: Category[];
}

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await api.get<CategoriesResponse>("/categories");
  return res.data.categories;
};
