import { Navigate } from "react-router";
import { useSessionstore } from "../store/session-store";



interface Props {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
    const { isAuthenticated } = useSessionstore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}