import type {
  CreateTransferPayload,
  CreateTransferResponse,
} from "./create-transfer";
import type { MockTransaction } from "@/shared/mocks/data/transactions";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function generateId(): number {
  return Math.floor(Math.random() * 100000);
}

export async function fakeCreateTransfer(
  payload: CreateTransferPayload
): Promise<CreateTransferResponse> {
  await delay(3000);

  const normalizedCpf = payload.recipientDocument.replace(/\D/g, "");

  if (!normalizedCpf || normalizedCpf.length !== 11) {
    throw new Error("CPF inválido");
  }

  if (payload.amount <= 0) {
    throw new Error("Valor inválido");
  }

  const transaction: MockTransaction = {
    id: generateId().toString(),
    description: payload.description || "Transferência enviada",
    amount: payload.amount,
    createdAt: new Date().toISOString(),
    type: "transfer",
    recipientDocument: normalizedCpf,
  };

  return {
    message: "Transferência realizada com sucesso",
    transaction,
  };
}