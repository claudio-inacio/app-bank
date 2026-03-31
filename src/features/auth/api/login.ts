import type { LoginPayload, LoginResponse } from "../types/auth.types";
import { fakeLogin } from "./fake-login";
import { realLogin } from "./real-login";

const USE_FAKE_API = import.meta.env.VITE_USE_FAKE_API === "true";

export async function login(
    payload: LoginPayload
): Promise<LoginResponse> {

    if (USE_FAKE_API) {
        return fakeLogin(payload);
    }
    return realLogin(payload);
}