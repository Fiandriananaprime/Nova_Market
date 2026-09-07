import { StoreAdmin } from '@/type/catalog/store';
import { api } from '../axios';

export type AdminStore = StoreAdmin;

export const getAdminStores = async (): Promise<{ data: AdminStore[] }> => {
  const response = await api.get('/admin/stores');
  return response.data;
};

export const getAdminStoreById = async (id: string): Promise<AdminStore> => {
  const response = await api.get(`/admin/stores/${encodeURIComponent(id)}`);
  return response.data;
};