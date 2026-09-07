import { Store } from "../catalog/store";
import { PaginationMeta } from "../catalog/product";
import { OrderStatus } from "../order/order";
export type SellerApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface SellerApplication {
  id: string;
  businessName: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  category: string;
  date: string;
  status: SellerApplicationStatus;
}

export interface SellerApplicationResponse {
  data: SellerApplication[];
  meta: PaginationMeta;
}

export interface TopSeller {
  id: string;
  name: string;
  location: string;
  category: string;
  logoUrl: string;
  status: 'active' | 'suspended';
  revenue: number;
  ordersCount: number;
  rating: number;
}

export interface StoreAdmin extends Store {
  annualRevenue: number;
  orders: Array<{
    id: string;
    buyerId: string;
    buyerName: string;
    total: number;
    storeTotal: number;
    itemsCount: number;
    status: OrderStatus;
    createdAt: string;
  }>;
}