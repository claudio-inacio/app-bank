import { api } from "@/shared/lib/axios";
import type { MockTransaction } from "@/shared/mocks/data/transactions";

export async function getTransactions() {
    const { data } = await api.get<MockTransaction[]>("/transactions");
    return data;
}