export interface ProductSpecs {
  [key: string]: string;
}

export type productStatus = 'draft' | 'active' | 'inactive' | 'pending' | 'approved' | 'rejected';
export type productStatusDto = 'pending' | 'approved' | 'rejected';
export interface ProductVariant {
  name?: string;
  values?: string[];
}

export interface Product {
  id: string;
  name?: string;
  nameF?: string;
  brand?: string;
  description?: string;
  price: number;
  originalPrice?: number | null;
  discount?: number;
  rating: number;
  reviewsCount?: number;
  sellerId?: string;
  sellerName?: string;
  categoryId?: string;
  categoryName:string;
  image?: string;
  images?: string[];
  stock?: number;
  sku?: string;
  tags?: string[];
  specs?: ProductSpecs;
  variants?: ProductVariant[];
  weightGrams?: number;
  dimensions?: string;
  status: productStatus;
  createdAt: string;
}

export interface PaginationMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface GetProductsResponse {
  data: Product[];
  meta: PaginationMeta;
}

export interface GetProductsQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  category?: string;
  sellerId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  onSale?: boolean;
  sort?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
}