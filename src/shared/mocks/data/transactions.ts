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
        id: "1",
        type: "expense",
        description: "Compra de mercadorias",
        amount: 150.00,
        createdAt: "2025-10-01",
        recipientDocument: "234.120.130-05"
    },
    {
        id: "2",
        type: "transfer",
        description: "Transferência para João",
        amount: 200.00,
        createdAt: "2025-10-02",
        recipientDocument: "567.890.123-45"
    },
    // {
    //     id: "3",
    //     type: "income",
    //     description: "Salário",
    //     amount: 3000,
    //     createdAt: "2023-10-03",
    //     bank: "Banco ITAU",
    //     recipientDocument: "234.120.130-05"
    // }

]