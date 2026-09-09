import { lazy, Suspense } from "react";

import AdminLayout from "../layouts/AdminLayout";

const AdminDashboard = lazy(
  () => import("../pages/dashboard/Dashboard")
);

const AdminUsers = lazy(
  () => import("../pages/users/Users")
);

const UserDetails = lazy(
  () => import("../pages/users/UserDetail")
);

const AdminSettings = lazy(
  () => import("../pages/users/Settings")
);

const SellerApplications = lazy(
  () => import("../pages/SellerApplication/SellerApplications")
);

const SellerApplicationDetails = lazy(
  () => import("../pages/SellerApplication/SellerApplicationDetail")
);

const AdminProducts = lazy(
  () => import("../pages/products/Products")
);

const ProductAbout = lazy(
  () => import("../pages/products/ProductAbout")
);

const AdminOrders = lazy(
  () => import("../pages/orders/Orders")
);

const OrderDetail = lazy(
  () => import("../pages/orders/OrderDetail")
);

const AdminPayments = lazy(
  () => import("../pages/payment/Payments")
);

const SellerPromotions = lazy(
  () => import("../pages/payment/Promotions")
);

const Analytics = lazy(
  () => import("../pages/analytics/Analytics")
);

const SellerManagement = lazy(
  () => import("../pages/stores/Stores")
);

const StoreAdminDetail = lazy(
  () => import("../pages/stores/StoreDetail")
);

function LazyPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-sm text-muted-foreground">
            Loading...
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const adminRoutes = {
  path: "/admin",
  Component: AdminLayout,

  children: [
    {
      index: true,
      element: (
        <LazyPage>
          <AdminDashboard />
        </LazyPage>
      ),
    },

    {
      path: "users",
      element: (
        <LazyPage>
          <AdminUsers />
        </LazyPage>
      ),
    },

    {
      path: "users/:id",
      element: (
        <LazyPage>
          <UserDetails />
        </LazyPage>
      ),
    },

    {
      path: "sellers",
      element: (
        <LazyPage>
          <SellerManagement />
        </LazyPage>
      ),
    },

    {
      path: "sellers/:id",
      element: (
        <LazyPage>
          <StoreAdminDetail />
        </LazyPage>
      ),
    },

    {
      path: "sellers/applications",
      element: (
        <LazyPage>
          <SellerApplications />
        </LazyPage>
      ),
    },

    {
      path: "sellers/applications/:id",
      element: (
        <LazyPage>
          <SellerApplicationDetails />
        </LazyPage>
      ),
    },

    {
      path: "products",
      element: (
        <LazyPage>
          <AdminProducts />
        </LazyPage>
      ),
    },

    {
      path: "products/:id",
      element: (
        <LazyPage>
          <ProductAbout />
        </LazyPage>
      ),
    },

    {
      path: "orders",
      element: (
        <LazyPage>
          <AdminOrders />
        </LazyPage>
      ),
    },

    {
      path: "orders/:id",
      element: (
        <LazyPage>
          <OrderDetail />
        </LazyPage>
      ),
    },

    {
      path: "payments",
      element: (
        <LazyPage>
          <AdminPayments />
        </LazyPage>
      ),
    },

    {
      path: "promotions",
      element: (
        <LazyPage>
          <SellerPromotions />
        </LazyPage>
      ),
    },

    {
      path: "reports",
      element: (
        <LazyPage>
          <Analytics />
        </LazyPage>
      ),
    },

    {
      path: "settings",
      element: (
        <LazyPage>
          <AdminSettings />
        </LazyPage>
      ),
    },
  ],
};