import { api } from '../axios';
import { StoreAdmin } from '@/type/catalog/store';

export const getMyStores = async (): Promise<{ data: StoreAdmin[] }> => {
  const response = await api.get('/seller/store');
  return response.data;
};

export const getMyStoreById = async (id: string): Promise<StoreAdmin> => {
  const response = await api.get(`/seller/store/${encodeURIComponent(id)}`);
  return response.data;
};

export const updateMyStore = async (id: string, data: Partial<StoreAdmin>): Promise<StoreAdmin> => {
  const response = await api.patch(`/seller/store/${encodeURIComponent(id)}`, data);
  return response.data;
};