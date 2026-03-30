

import type { MockTransaction } from "@/shared/mocks/data/transactions"
import { DontResultSetTransactions } from "./dont-resultSet-transactions"
import { TransactionItem } from "./transaction-item"

type TransactionListProps = {
    transactions: MockTransaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
    if (!transactions.length) {
        return <DontResultSetTransactions />
    }

    return (
        <div className="space-y-3">
            {transactions.map((transaction) => (
                <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                />
            ))}
        </div>
    )
}