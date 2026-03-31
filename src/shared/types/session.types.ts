import type { MockTransaction } from "../mocks/data/transactions";

export interface AuthUser {
    id: string,
    name: string,
    document: string,
}

export interface SessionState {
    transactionsList: MockTransaction[] | null;
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    balance: number;
    isHydrated: boolean;

    login: (payload: { user: AuthUser; token: string; balance?: number }) => void;
    logout: () => void;
    setBalance: (banlanceValue: number) => void;
    decrementBalance: (value: number) => void;
    setNewTransferList: (newTransactionsList: MockTransaction[]) => void;
    setIsHydrated: (isHydrated: boolean) => void;
}