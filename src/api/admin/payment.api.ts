import { Transaction, PaymentsSummary, Promotion } from "@/type/admin/payment";
import { api } from "../axios"
import { PaginationMeta } from "@/type/catalog/product";
import { paymentMethod } from "@/type/order/payment";

export const getTransactions = async ({
  page,
  limit,
  method,
  status,
}: {
  page?: number;
  limit?: number;
  method?: paymentMethod ;
  status?: "completed" | "pending" | "failed" | "refunded";
}) => {
  const response = await api.get<{
    data: Transaction[];
    meta: PaginationMeta;
  }>("/admin/payments/transactions", {
    params: {
      page,
      limit,
      method,
      status,
    },
  });

  return response.data;
};

export const getPaymentsSummary = async ({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) => {
  const response = await api.get<PaymentsSummary>("/admin/payments/summary", {
    params: {
      from,
      to,
    },
  });

  return response.data;
};

export const refundTransaction = async (id: string) => {
  const response = await api.post<Transaction>(
    `/admin/payments/transactions/${id}/refund`
  );

  return response.data;
};

export const getAdminPromotions = async ({
  page,
  limit,
  status,
}: {
  page?: number;
  limit?: number;
  status?: "active" | "scheduled" | "inactive" | "expired";
}) => {
  const response = await api.get<{
    data: Promotion[];
    meta: PaginationMeta;
  }>("/admin/promotions", {
    params: {
      page,
      limit,
      status,
    },
  });

  return response.data;
};

export const deleteAdminPromotion = async (id: string) => {
  await api.delete(`/admin/promotions/${id}`);
};