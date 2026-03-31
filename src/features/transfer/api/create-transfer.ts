import { api } from "@/shared/lib/axios";
import type { MockTransaction } from "@/shared/mocks/data/transactions";
import { fakeCreateTransfer } from "./fake-create-transefer";

export interface CreateTransferPayload {
  recipientDocument: string;
  amount: number;
  description?: string;
}

export interface CreateTransferResponse {
  message: string;
  transaction: MockTransaction;
}

const USE_FAKE_API = import.meta.env.VITE_USE_FAKE_API === "true";

export async function createTransfer(payload: CreateTransferPayload) {
  if (USE_FAKE_API) {
    return fakeCreateTransfer(payload);
  }
  const { data } = await api.post<CreateTransferResponse>("/transfer", payload);
  return data;
}