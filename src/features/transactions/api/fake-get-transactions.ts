import type { MockTransaction } from "@/shared/mocks/data/transactions";

const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export async function fakeGetTransactions(): Promise<MockTransaction[]> {
    await delay(3000);

    return [
        {
            id: 'id-1',
            description: "Aluguel",
            amount: 500,
            createdAt: new Date().toISOString(),
            type: "transfer",
            recipientDocument: '198.898.98-89'
        },
        {
            id: 'id-2',
            description: "Transferência enviada",
            amount: 700,
            createdAt: new Date().toISOString(),
            type: "transfer",
            recipientDocument: '068.898.198-71'
        },
        {
            id: 'id-3',
            description: "Pagamento de boleto",
            amount: -300,
            createdAt: new Date().toISOString(),
            type: "transfer",
            recipientDocument: '198.234.222-00'
        },
    ];
}