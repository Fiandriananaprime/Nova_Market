import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import SellerApplications from '../pages/admin/SellerApplications';
import AdminProducts from '../pages/admin/Products';
import AdminCategories from '../pages/admin/Categories';
import AdminOrders from '../pages/admin/Orders';
import AdminSettings from '../pages/admin/Settings';
import AdminPayments from '../pages/admin/Payments';
import SellerPromotions from '../pages/seller/Promotions';
import SellerReviews from '../pages/seller/Reviews';
import SellerAnalytics from '../pages/seller/Analytics';
import UserDetails from '@/components/admin/UserDetail';
import SellerApplicationDetails from '@/components/admin/SellerApplicationDetail';
import ProductAbout from '@/pages/admin/ProductAbout';

export const adminRoutes = {
  path: '/admin',
  Component: AdminLayout,
  children: [
    { index: true, Component: AdminDashboard },
    { path: 'users', Component: AdminUsers },
    { path: 'users/:id', Component: UserDetails },
    { path: 'buyers', Component: AdminUsers },
    { path: 'sellers', Component: AdminUsers },
    { path: 'sellers/applications', Component: SellerApplications },
    { path: 'sellers/applications/:id', Component: SellerApplicationDetails },
    { path: 'products', Component: AdminProducts },
    { path: 'products/:id', Component: ProductAbout },
    { path: 'categories', Component: AdminCategories },
    { path: 'orders', Component: AdminOrders },
    { path: 'payments', Component: AdminPayments },
    { path: 'promotions', Component: SellerPromotions },
    { path: 'reviews', Component: SellerReviews },
    { path: 'reports', Component: SellerAnalytics },
    { path: 'settings', Component: AdminSettings },
  ],
};