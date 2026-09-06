import { api } from "../axios";
import { OrderResponse, OrderQueryParam } from "@/type/order/order";

export const getOrder = async (params: OrderQueryParam): Promise<OrderResponse> => {
    const response = await api.get("/admin/orders" ,{params});
    return response.data
}