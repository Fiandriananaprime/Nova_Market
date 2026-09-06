import { Address } from "../user"
import { PaginationMeta } from "../catalog/product";
import { paymentMethod, PaymentStatus } from "./payment"
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
export type deliveryMethod = 'standard' | 'express' | 'pickup';

export type OrderQueryParam = {
    search?: string,
    page?: number,
    limit?: number,
    status?: OrderStatus,
    paymentMethod?: paymentMethod,
    sortAmount?: 'asc' | 'desc',
    sortDate?: 'asc' | 'desc'
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
export interface OrderSeller {
    id: string,
    name: string
}
export interface Order {
    id: string,
    buyerId: string,
    buyerName: string,
    items: OrderItem[],
    sellers: OrderSeller[],
    subtotal: number,
    shippingFee: number,
    total: number,
    status: OrderStatus,
    deliveryMethod: deliveryMethod,
    paymentMethod: paymentMethod,
    paymentStatus: PaymentStatus,
    address: Address
    tracking: string | null,
    estimatedDelivery: string | null,
    note?: string | null,
    createdAt: string
}

export interface OrderResponse {
    data : Order[],
    meta: PaginationMeta,
    counts: {
        all: number,
        pending: number,
        confirmed: number,
        processing: number,
        preparing: number,
        shipped: number,
        delivered: number,
        cancelled: number,
        totalPrice: number
    }
}

export interface OrderSellerDetails extends OrderSeller {
    avatarUrl: string;
}

export interface OrderDetails extends Order {
    buyerAvatarUrl?: string;
    buyerPhone?: string,
    buyerEmail: string,
    sellers: OrderSellerDetails[];
}