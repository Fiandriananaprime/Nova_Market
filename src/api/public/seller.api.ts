import { PaginationMeta } from '@/type/catalog/product';
import { baseApi } from '../axios';
import { Seller, Review } from '@/type/catalog/seller';

export const getAllSellers = async (): Promise<{data: Seller[], meta: PaginationMeta}> => {
  const response = await baseApi.get('/stores');
  return response.data;
}
export const getSellerById = async (id: string): Promise<Seller> => {
  const response = await baseApi.get<Seller>(`/stores/${encodeURIComponent(id)}`);
    return response.data;
};

export const getSellerProducts = async (id: string, page?: number, limit?: number): Promise<any> => {
  const response = await baseApi.get(`/stores/${encodeURIComponent(id)}/products`, { params: { page, limit } });
  return response.data;
}

export const getSellerReviews = async (id: string, page:number, limit?: number): Promise<{ data: Review[], meta: PaginationMeta }> => {
  const response = await baseApi.get(`/stores/${encodeURIComponent(id)}/reviews`, { params: { page, limit } });
  return response.data;
}