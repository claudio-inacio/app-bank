export interface MockTransaction {
    id: string;
    type: "income" | "expense" | "transfer";
    description: string;
    amount: number;
    date: string;
    bank: string;
    recipientDocument: string;
}

export const mockTransactions: MockTransaction[] = [
    {
        id: "1",
        type: "expense",
        description: "Compra de mercadorias",
        amount: 150.00,
        date: "2023-10-01",
        bank: "Banco BRADESCO",
        recipientDocument: "234.120.130-05"
    },
    {
        id: "2",
        type: "transfer",
        description: "Transferência para João",
        amount: 200.00, 
        date: "2023-10-02",
        bank: "Banco SANTANDER",
        recipientDocument: "567.890.123-45"
    },
    {
        id: "3",
        type: "income",
        description: "Salário",
        amount: 3000.00,
        date: "2023-10-03",
        bank: "Banco ITAU",
        recipientDocument: "234.120.130-05"
    }

]