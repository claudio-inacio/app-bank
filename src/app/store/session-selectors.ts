import { useSessionStore } from "./use-session-store";


export function useUser() {
    return useSessionStore((state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
    }))
}

export function useUserBalance() {
    return useSessionStore((state) => state.balance);
}
export function useTransactionsList() {
    return useSessionStore((state) => state.transactionsList);
}