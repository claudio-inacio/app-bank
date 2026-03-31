import { api } from "@/shared/lib/axios";
import type { MockTransaction } from "@/shared/mocks/data/transactions";

export interface CreateTransferPayload {
  recipientDocument: string;
  amount: number;
  description?: string;
}

export interface CreateTransferResponse {
  message: string;
  transaction: MockTransaction;
}

export async function createTransfer(payload: CreateTransferPayload) {
  const { data } = await api.post<CreateTransferResponse>("/transfer", payload);
  return data;
}