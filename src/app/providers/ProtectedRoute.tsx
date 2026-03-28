import { Navigate } from "react-router";
import { useSessionStore } from "../store/session-store";




interface Props {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
    const { isAuthenticated } = useSessionStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}