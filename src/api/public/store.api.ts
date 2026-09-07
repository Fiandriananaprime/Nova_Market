import { PaginationMeta } from '@/type/catalog/product';
import { baseApi } from '../axios';
import { Store, Review } from '@/type/catalog/store';

export const getAllSellers = async (): Promise<{data: Store[], meta: PaginationMeta}> => {
  const response = await baseApi.get('/stores');
  return response.data;
}
export const getSellerById = async (id: string): Promise<Store> => {
  const response = await baseApi.get<Store>(`/stores/${encodeURIComponent(id)}`);
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