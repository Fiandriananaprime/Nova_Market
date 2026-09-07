import { api } from '../axios';
import { Store } from '@/type/catalog/store';

export const getMyStores = async (): Promise<{ data: Store[] }> => {
  const response = await api.get('/seller/store');
  return response.data;
};

export const getMyStoreById = async (id: string): Promise<Store> => {
  const response = await api.get(`/seller/store/${encodeURIComponent(id)}`);
  return response.data;
};

export const updateMyStore = async (id: string, data: Partial<Store>): Promise<Store> => {
  const response = await api.patch(`/seller/store/${encodeURIComponent(id)}`, data);
  return response.data;
};