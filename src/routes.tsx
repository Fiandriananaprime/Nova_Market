import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "./routes/ProtectedRoute";

import { adminRoutes } from "./routes/admin.route";

import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/login",
      element: <Navigate to="/" replace />,
    },
    {
      path: "/",
      Component: Login,
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
    {
      path: "*",
      element: <NotFound prop="page" />,
    },
  ]);
};

export const router = createAppRouter();