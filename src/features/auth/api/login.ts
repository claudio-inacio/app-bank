import { api } from "@/shared/lib/axios";
import type { LoginPayload, LoginResponse } from "../types/auth.types";


export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', payload);
    return response.data;
}