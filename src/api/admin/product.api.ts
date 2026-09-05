import {AdminGetProductsQueryParams, AdminGetProductsResponse} from "@/type/admin/product";
import { api } from "../axios";
import { Product, productStatus } from "@/type/catalog/product";

export const getAdminProducts = async (params?: AdminGetProductsQueryParams): Promise<AdminGetProductsResponse> => {
    const response = await api.get<AdminGetProductsResponse>("/admin/products", { params });
    return response.data;
}

export const updateProductStatus = async (id: string, status: productStatus): Promise<Product> => {
    const response = await api.patch(`/admin/products/${encodeURIComponent(id)}/status`, { status });
    return response.data;
}