import { Navigate } from "react-router";
import { useSessionStore } from "../store/use-session-store";
import LoadingComponent from "@/shared/components/loading/LoadingComponent";




interface Props {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
    const { isAuthenticated, isHydrated } = useSessionStore();

    if (!isHydrated) {
        return (
            <div className="">
                <span>
                    <LoadingComponent title="Aguarde um momento" messageLoading="Carregando dados da sessão..." />
                </span>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}