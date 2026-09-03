import { Address } from "../user"
import { PaginationMeta } from "../catalog/product";
import { paymentMethod, paymentStatus } from "./payment"
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
export type deliveryMethod = 'standard' | 'express' | 'pickup';

export type OrderQueryParam = {
    search?: string,
    page?: number,
    limit?: number,
    status?: OrderStatus
}
export interface OrderItem {
    productId: string,
    productName: string,
    image: string,
    price: number,
    qty: number,
    sellerId: string,
    sellerName: string
}
export interface Order {
    id: string,
    buyerId: string,
    buyerName: string,
    items: OrderItem[],
    sellerNames: string[],
    subtotal: number,
    shippingFee: number,
    total: number,
    status: OrderStatus,
    deliveryMethod: deliveryMethod,
    paymentMethod: paymentMethod,
    paymentStatus: paymentStatus,
    address: Address,
    tracking: string,
    estimatedDelivery: string,
    date: string
}

export interface OrderResponse {
    data : Order[],
    meta: PaginationMeta
}