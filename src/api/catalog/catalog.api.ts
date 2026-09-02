import { Category } from "@/type/category";
import { baseApi, api } from "../axios";

export const getCategories = async (): Promise<Category[]> => {
  const response = await baseApi.get<Category[]>("/categories");
  return response.data;
}

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${id}`);
  return response.data;
}



