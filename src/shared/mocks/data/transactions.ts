export type Balance = {
    amount: number
}

export type TransactionType = "income" | "expense" | "transfer";

export interface MockTransaction {
    id: string;
    type: TransactionType;
    description: string;
    amount: number;
    createdAt: string;
    recipientDocument: string;
}

export const balanceMock: Balance = {
    amount: 12850.9,
}

export const mockTransactionResponse = {
    message: "Transferência criada com sucesso",
    transaction: {
        id: "1",
    }
}


export const mockTransactions: MockTransaction[] = [
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
        amount: 300,
        createdAt: new Date().toISOString(),
        type: "transfer",
        recipientDocument: '198.234.222-00'
    },
]