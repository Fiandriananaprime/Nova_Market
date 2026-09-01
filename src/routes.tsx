import { createBrowserRouter } from 'react-router';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import BuyerLayout from './layouts/BuyerLayout';
import SellerLayout from './layouts/SellerLayout';
import AdminLayout from './layouts/AdminLayout';

// Public pages
import LandingPage from './pages/public/LandingPage';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import { HowItWorks, CategoriesPage, SellersPage, About } from './pages/public/SimplePages';

// Buyer pages
import Shop from './pages/buyer/Shop';
import Products from './pages/buyer/Products';
import ProductDetail from './pages/buyer/ProductDetail';
import Cart from './pages/buyer/Cart';
import Checkout from './pages/buyer/Checkout';
import { OrdersList, OrderDetail } from './pages/buyer/Orders';
import Favorites from './pages/buyer/Favorites';
import Settings from './pages/buyer/Settings';
import Profile from './pages/buyer/Profile';
import StoreDetail from './pages/buyer/StoreDetail';

// Seller pages
import SellerDashboard from './pages/seller/Dashboard';
import SellerProducts from './pages/seller/Products';
import AddProduct from './pages/seller/AddProduct';
import Inventory from './pages/seller/Inventory';
import SellerOrders from './pages/seller/Orders';
import SellerAnalytics from './pages/seller/Analytics';
import SellerReviews from './pages/seller/Reviews';
import SellerPromotions from './pages/seller/Promotions';
import SellerStoreSettings from './pages/seller/StoreSettings';
import SellerCustomers from './pages/seller/Customers';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import SellerApplications from './pages/admin/SellerApplications';
import AdminProducts from './pages/admin/Products';
import AdminCategories from './pages/admin/Categories';
import AdminOrders from './pages/admin/Orders';
import AdminSettings from './pages/admin/Settings';
import AdminPayments from './pages/admin/Payments';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <div className="text-6xl font-bold font-display text-[var(--border)] mb-3">404</div>
      <h2 className="text-2xl font-bold font-display text-[var(--foreground)] mb-2">Page not found</h2>
      <p className="text-[var(--muted-foreground)] mb-5">The page you're looking for doesn't exist.</p>
      <a href="/" className="text-[#0077B6] hover:underline font-medium">← Go home</a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'how-it-works', Component: HowItWorks },
      { path: 'categories', Component: CategoriesPage },
      { path: 'sellers', Component: SellersPage },
      { path: 'about', Component: About },
    ],
  },
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },

  // Buyer routes
  {
    path: '/',
    Component: BuyerLayout,
    children: [
      { path: 'shop', Component: Shop },
      { path: 'products', Component: Products },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'stores/:id', Component: StoreDetail },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'orders', Component: OrdersList },
      { path: 'orders/:id', Component: OrderDetail },
      { path: 'favorites', Component: Favorites },
      { path: 'profile', Component: Profile },
      { path: 'settings', Component: Settings },
    ],
  },

  // Seller routes
  {
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
  },

  // Admin routes
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'users', Component: AdminUsers },
      { path: 'buyers', Component: AdminUsers },
      { path: 'sellers', Component: AdminUsers },
      { path: 'sellers/applications', Component: SellerApplications },
      { path: 'products', Component: AdminProducts },
      { path: 'categories', Component: AdminCategories },
      { path: 'orders', Component: AdminOrders },
      { path: 'payments', Component: AdminPayments },
      { path: 'promotions', Component: SellerPromotions },
      { path: 'reviews', Component: SellerReviews },
      { path: 'reports', Component: SellerAnalytics },
      { path: 'settings', Component: AdminSettings },
    ],
  },

  { path: '*', Component: NotFound },
]);
