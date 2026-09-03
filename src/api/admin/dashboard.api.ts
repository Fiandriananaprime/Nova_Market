import { api } from "../axios";
import { AdminMetrics, AdminRevenue } from "@/type/admin/dashboard";


export const getDashboardStats = async (): Promise<{ metrics: AdminMetrics; revenueSeries: AdminRevenue[] }> => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};