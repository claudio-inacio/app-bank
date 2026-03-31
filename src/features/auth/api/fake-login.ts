import type { LoginPayload, LoginResponse } from "../types/auth.types";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fakeLogin(
  payload: LoginPayload
): Promise<LoginResponse> {
  await delay(4000);

  const normalizedCpf = payload.document.replace(/\D/g, "");

  if (normalizedCpf === "23412013005" && payload.password === "123123") {
    return {
      token: "fake-jwt-token",
      user: {
        id: 'fake-user-id',
        name: "Usuário Padrão",
        document: normalizedCpf,
      },
      balance: 5000,
    };
  }

  throw new Error("CPF ou senha inválidos");
}