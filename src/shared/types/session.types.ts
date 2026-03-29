export interface AuthUser {
    id: string,
    name: string,
    document: string,    
}

export interface SessionState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    balance:number;
    isHydrated: boolean;

    login: (payload: { user: AuthUser; token: string; balance?: number }) => void;
    logout: () => void;
    setBalance: (banlanceValue: number) => void;
    decrementBalance: (value: number) => void;
    setIsHydrated: (isHydrated: boolean) => void;
}