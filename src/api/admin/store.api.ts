import { Store } from '@/type/catalog/store';
import { getAllSellers, getSellerById } from '../public/store.api';

export type AdminStore = Store;

export const getAdminStores = async (): Promise<{ data: AdminStore[] }> => {
  return getAllSellers();
};

export const getAdminStoreById = async (id: string): Promise<AdminStore> => {
  return getSellerById(id);
};