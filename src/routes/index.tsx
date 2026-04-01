import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/app/layouts/AppLayout";
import { ProtectedRoute } from "@/app/providers/ProtectedRoute";
import LoginPage from "@/features/auth/pages";
import { DashboardPage } from "@/features/dashboard/pages";
import { PublicRoute } from "@/app/providers/PublicRoute";
import { NotFoundPage } from "@/features/not-found/pages";


export const router = createBrowserRouter([
  //PUBLCI ROUTE
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },


  // PRIVATE ROUTES
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);