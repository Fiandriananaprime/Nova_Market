import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './routes/ProtectedRoute';

import { publicRoutes } from './routes/public.route';
import { buyerRoutes } from './routes/buyer.route';
import { sellerRoutes } from './routes/seller.route';
import { adminRoutes } from './routes/admin.route';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <div className="text-6xl font-bold font-display text-[var(--border)] mb-3">404</div>
      <h2 className="text-2xl font-bold font-display text-[var(--foreground)] mb-2">Page not found</h2>
      <p className="text-[var(--muted-foreground)] mb-5">The page you're looking for doesn't exist.</p>
      <a href="/" className="text-[#0077B6] hover:underline font-medium">← Go home</a>
    </div>
  );
}

const getStoredAuth = () => {
  try {
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const role = user?.role ?? null;
    const hasToken = Boolean(localStorage.getItem('accessToken'));

    return {
      isAuthenticated: Boolean(hasToken && role),
      userRole: role,
    };
  } catch {
    return {
      isAuthenticated: false,
      userRole: null,
    };
  }
};

const useAuth = () => getStoredAuth();

export const createAppRouter = (auth: ReturnType<typeof useAuth> = useAuth()) => {
  const safeAuth = auth ?? getStoredAuth();

  return createBrowserRouter([
    ...publicRoutes,
    {
      element: (
        <ProtectedRoute
          isAllowed={Boolean(safeAuth.isAuthenticated && safeAuth.userRole === 'buyer')}
          redirectTo="/login"
        />
      ),
      children: [buyerRoutes],
    },
    {
      element: (
        <ProtectedRoute
          isAllowed={Boolean(safeAuth.isAuthenticated && safeAuth.userRole === 'seller')}
          redirectTo="/login"
        />
      ),
      children: [sellerRoutes],
    },
    {
      element: (
        <ProtectedRoute
          isAllowed={Boolean(safeAuth.isAuthenticated && safeAuth.userRole === 'admin')}
          redirectTo="/login"
        />
      ),
      children: [adminRoutes],
    },
    { path: '*', Component: NotFound },
  ]);
};

export const router = createAppRouter();