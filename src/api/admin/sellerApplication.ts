import { api } from "../axios";
import { SellerApplicationResponse, SellerApplicationStatus } from "@/type/admin/seller";

type SellerApplicationQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: SellerApplicationStatus;
};

export const getSellerApplications = async (params: SellerApplicationQueryParams): Promise<SellerApplicationResponse> => {
    const response = await api.get("/admin/sellers/applications", { params });
    return response.data;
}