import { Category } from "@/type/catalog/category";
import { Store } from "@/type/catalog/store";
import { baseApi, api } from "../axios";

export const getCategories = async (): Promise<Category[]> => {
  const response = await baseApi.get<Category[]>("/categories");
  return response.data;
}

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${id}`);
  return response.data;
}

export const getFeaturedSellers = async (): Promise<{ data: Store[] }> => {
  const response = await baseApi.get<{ data: Store[]; meta: unknown }>("/stores/featured");
  return response.data;
}

export const getPrimeSellers = async (): Promise<{ data: Store[] }> => {
  const response = await baseApi.get<{ data: Store[]; meta: unknown }>("/stores");
  return response.data;
}



