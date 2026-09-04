import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './routes/ProtectedRoute';

import { publicRoutes } from './routes/public.route';
import { buyerRoutes } from './routes/buyer.route';
import { sellerRoutes } from './routes/seller.route';
import { adminRoutes } from './routes/admin.route';

import NotFound from './pages/NotFound';

export const createAppRouter = () => {
  return createBrowserRouter([
    ...publicRoutes,
    {
      element: (
        <ProtectedRoute
          requiredRole="buyer"
          redirectTo="/login"
        />
      ),
      children: [buyerRoutes],
    },
    {
      element: (
        <ProtectedRoute
          requiredRole="seller"
          redirectTo="/login"
        />
      ),
      children: [sellerRoutes],
    },
    {
      element: (
        <ProtectedRoute
          requiredRole="admin"
          redirectTo="/login"
        />
      ),
      children: [adminRoutes],
    },
    { path: '*', Component: NotFound },
  ]);
};

export const router = createAppRouter();