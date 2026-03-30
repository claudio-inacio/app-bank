import { api } from "@/shared/lib/axios";
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

export async function login(payload: LoginPayload): Promise<LoginResponse> {    
    const response = await api.post<LoginResponse>('/login', payload);    
    return response.data;
}