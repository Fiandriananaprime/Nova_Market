import { Navigate, Outlet } from 'react-router';
import { UserRole, useApp } from '../contexts/AppContext';

interface ProtectedRouteProps {
  requiredRole: Exclude<UserRole, null>;
  redirectTo?: string;
}

export function ProtectedRoute({ requiredRole, redirectTo = '/login' }: ProtectedRouteProps) {
  const { userRole } = useApp();

  const isAllowed = userRole === requiredRole;

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}