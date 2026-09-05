import { Review } from "@/type/catalog/seller";
import { baseApi } from "../axios";
import { GetProductsResponse, GetProductsQueryParams, Product, PaginationMeta, RatingCount} from "@/type/catalog/product";

export const getFeaturedProducts = async (): Promise<GetProductsResponse> => {
  const response = await baseApi.get<GetProductsResponse>("/products/featured");
  return response.data;
}
export const getProducts = async (params?: GetProductsQueryParams): Promise<GetProductsResponse> => {
  const response = await baseApi.get<GetProductsResponse>("/products", { params });
  return response.data;
}

export const getProductById = async (id: string): Promise<Product> => {
  const response = await baseApi.get<Product>(`/products/${encodeURIComponent(id)}`);
  return response.data;
}
type GetProductReviewsResponse = {
  data: Review[];
  meta: PaginationMeta;
  counts: RatingCount;
};

export const getProductReviews = async (id: string): Promise<GetProductReviewsResponse> => {
  const response = await baseApi.get<GetProductReviewsResponse>(`/products/${encodeURIComponent(id)}/reviews`);
  return response.data;
}
