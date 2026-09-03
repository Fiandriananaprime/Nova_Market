import { api } from "../axios";
import { AdminMetrics, AdminRevenue } from "@/type/admin/dashboard";
import { TopSeller } from "@/type/admin/seller";

export const getDashboardStats = async (): Promise<{ metrics: AdminMetrics; revenueSeries: AdminRevenue[] }> => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getTopSeller = async (): Promise<{ data: TopSeller[] }> => {
  const response = await api.get("/admin/top-sellers");
  return response.data;
};