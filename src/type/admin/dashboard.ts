export type AdminMetrics = {
    totalRevenue: number;
    totalOrders: number;
    totalBuyers: number;
    totalSellers: number;
    totalProducts: number;
    pendingApplications: number;
    pendingProducts: number;
};

export type AdminRevenue = {
    month: string;
    revenue: number;
    sellers: number;
    buyers: number;
};
