import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/app/layouts/AppLayout";
import { ProtectedRoute } from "@/app/providers/ProtectedRoute";
import LoginPage from "@/features/auth/pages";

// Páginas (vamos criar depois)

// import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
// import { TransferPage } from "@/features/transfer/pages/TransferPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
    //   {
    //     index: true,
    //     element: <DashboardPage />,
    //   },
    //   {
    //     path: "transfer",
    //     element: <TransferPage />,
    //   },
    ],
  },
]);