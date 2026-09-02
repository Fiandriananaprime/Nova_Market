import { Category } from "@/type/category";
import { Seller } from "@/type/user";
import { baseApi, api } from "../axios";

export const getCategories = async (): Promise<Category[]> => {
  const response = await baseApi.get<Category[]>("/categories");
  return response.data;
}

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${id}`);
  return response.data;
}

export const getFeaturedSellers = async (): Promise<{ data: Seller[] }> => {
  const response = await baseApi.get<{ data: Seller[]; meta: unknown }>("/stores/featured");
  return response.data;
}

export const getPrimeSellers = async (): Promise<{ data: Seller[] }> => {
  const response = await baseApi.get<{ data: Seller[]; meta: unknown }>("/stores");
  return response.data;
}



