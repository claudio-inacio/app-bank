import { api } from "@/shared/lib/axios";
import type { MockTransaction } from "@/shared/mocks/data/transactions";
import { fakeGetTransactions } from "./fake-get-transactions";


const USE_FAKE_API = import.meta.env.VITE_USE_FAKE_API === "true";


export async function getTransactions() {

    if (USE_FAKE_API) {
        return fakeGetTransactions();
    }
    const { data } = await api.get<MockTransaction[]>("/transactions");
    return data;
}