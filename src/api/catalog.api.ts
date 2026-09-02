import { Category } from "@/type/category";
import { baseApi, api } from "./axios";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
}