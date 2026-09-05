import { baseApi, api } from "../axios";
import { GetProductsResponse, GetProductsQueryParams} from "@/type/catalog/product";

export const getFeaturedProducts = async (): Promise<GetProductsResponse> => {
  const response = await baseApi.get<GetProductsResponse>("/products/featured");
  return response.data;
}
export const getProducts = async (params?: GetProductsQueryParams): Promise<GetProductsResponse> => {
  const response = await api.get<GetProductsResponse>("/products", { params });
  return response.data;
}