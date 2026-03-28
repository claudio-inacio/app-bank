import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/app/layouts/AppLayout";
import { ProtectedRoute } from "@/app/providers/ProtectedRoute";
import LoginPage from "@/features/auth/pages";
import DashboardPage from "@/features/dashboard/pages";

// import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
// import { TransferPage } from "@/features/transfer/pages/TransferPage";



export const router = createBrowserRouter([
  //PUBLCI ROUTE
  {
    path: "/login",
    element: <LoginPage />,
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
      //   {
      //     path: "transfer",
      //     element: <TransferPage />,
      //   },
    ],
  },
]);