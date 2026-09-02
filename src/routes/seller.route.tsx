import SellerLayout from '../layouts/SellerLayout';
import SellerDashboard from '../pages/seller/Dashboard';
import SellerProducts from '../pages/seller/Products';
import AddProduct from '../pages/seller/AddProduct';
import Inventory from '../pages/seller/Inventory';
import SellerOrders from '../pages/seller/Orders';
import SellerAnalytics from '../pages/seller/Analytics';
import SellerReviews from '../pages/seller/Reviews';
import SellerPromotions from '../pages/seller/Promotions';
import SellerStoreSettings from '../pages/seller/StoreSettings';
import SellerCustomers from '../pages/seller/Customers';
import Settings from '../pages/buyer/Settings';

export const sellerRoutes = {
  path: '/seller',
  Component: SellerLayout,
  children: [
    { index: true, Component: SellerDashboard },
    { path: 'products', Component: SellerProducts },
    { path: 'products/new', Component: AddProduct },
    { path: 'products/:id/edit', Component: AddProduct },
    { path: 'inventory', Component: Inventory },
    { path: 'orders', Component: SellerOrders },
    { path: 'analytics', Component: SellerAnalytics },
    { path: 'reviews', Component: SellerReviews },
    { path: 'promotions', Component: SellerPromotions },
    { path: 'store', Component: SellerStoreSettings },
    { path: 'settings', Component: Settings },
    { path: 'customers', Component: SellerCustomers },
  ],
};