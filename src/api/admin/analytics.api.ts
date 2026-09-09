import { AnalyticsQuery, AnalyticsResponse } from "@/type/admin/Analytics";
import { api } from "../axios";

export const getAnalytics = async ({
  period,
  from,
  to,
}: AnalyticsQuery): Promise<AnalyticsResponse> => {
  const response = await api.get("/admin/reports", {
    params: {
      period,
      ...(period === "custom" && {
        from,
        to,
      }),
    },
  });

  return response.data;
};