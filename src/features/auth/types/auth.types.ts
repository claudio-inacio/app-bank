import type { AuthUser } from "@/shared/types/session.types";

export interface LoginPayload {
    document: string;
    password: string;
}

export interface LoginResponse {
    user: AuthUser;
    token: string;
    balance: number;
};

export type AuthStateStatus = 'idle' | 'loading' | 'authenticated' | 'error';
