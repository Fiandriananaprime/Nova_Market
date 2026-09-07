import { StoreAdmin } from '@/type/admin/seller';
import { api } from '../axios';

export type AdminStore = StoreAdmin;

export type AdminStoreFilters = {
  page?: number;
  limit?: number;
  search?: string;
  rating?: 'all' | '5' | '4' | '3';
  products?: 'all' | 'small' | 'medium' | 'large';
  followers?: 'all' | 'small' | 'medium' | 'large';
  revenue?: 'all' | 'low' | 'medium' | 'high';
  location?: string;
  verified?: 'all' | 'verified' | 'unverified';
  year?: string;
};

export const getAdminStores = async (params?: AdminStoreFilters): Promise<{ data: AdminStore[]; meta: { page: number; limit: number; total: number; totalPages: number } }> => {
  const response = await api.get('/admin/stores', { params });
  return response.data;
};

export const getAdminStoreById = async (id: string): Promise<AdminStore> => {
  const response = await api.get(`/admin/stores/${encodeURIComponent(id)}`);
  return response.data;
};