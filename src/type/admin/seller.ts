import { PaginationMeta } from "../catalog/product";
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