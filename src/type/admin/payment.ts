import { paymentMethod, PaymentStatus } from "../order/payment";

export interface Transaction {
    id: string,
    orderId: string,
    buyerName:string,
    sellerName: string,
    amount: number,
    method: paymentMethod,
    commission: number,
    status: PaymentStatus,
    date: string
}

export interface PaymentsSummary {
  totalVolume: number;
  totalCommission: number;

  seriesByMonth: Array<{
    month: string;
    mvola: number;
    orangeMoney: number;
    card: number;
    cod: number;
  }>;
}

export interface Promotion {
    id:string,
    sellerId:string,
    sellerName:string,
    name:string,
    type: PromotionType,
    discount:number,
    productIds:string[],
    productsCount: number,
    startDate:string,
    endDate:string,
    status: PromotionStatus
}

export type PromotionStatus = 'active' | 'scheduled' | 'inactive' | 'expired'
export type PromotionType= 'percentage' | 'fixed';