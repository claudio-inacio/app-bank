import { router } from "@/routes";
import { RouterProvider } from "react-router";


export function AppRouter() {
    return <RouterProvider router={router} />
}