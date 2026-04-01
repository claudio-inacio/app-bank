import { Navigate } from "react-router";
import { useSessionStore } from "@/app/store/use-session-store";

interface PublicRouteProps {
    children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
    const user = useSessionStore((state) => state.user);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}