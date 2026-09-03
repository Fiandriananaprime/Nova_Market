import { api } from "../axios";
import { OrderResponse, OrderQueryParam } from "@/type/order/order";

export const getOrder = async ({search,page,limit,status}: OrderQueryParam): Promise<OrderResponse> => {
    const response = await api.get("/admin/orders" ,{params: {search,page,limit,status}});
    return response.data
}