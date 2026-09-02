import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({ isAllowed, redirectTo = '/login' }: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}