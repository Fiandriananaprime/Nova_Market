import { AdminRevenue } from "./dashboard";

export type AnalyticsPeriod =
  | "today"
  | "7d"
  | "30d"
  | "3m"
  | "custom";

export type AnalyticsQuery = {
  period: AnalyticsPeriod;
  from?: string;
  to?: string;
};

export type TopSellerAnalytics = {
  sellerId: string;
  sellerName: string;
  revenue: number;
};

export type TopCategoryAnalytics = {
  name: string;
  percentage: number;
};

export interface AnalyticsResponse {
  totalRevenue: number;
  totalOrders: number;
  totalBuyers: number;
  totalSellers: number;
  revenueSeries: AdminRevenue[];
  orderSeries:AdminOrderSeries[]
  topSellers: TopSellerAnalytics[];
  topCategories: TopCategoryAnalytics[];
}
export type AdminOrderSeries = {
    day: string;
    orders: number;
    sellers: number;
    buyers: number;
};