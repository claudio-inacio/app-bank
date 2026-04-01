import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"

import { TransactionList } from "./transaction-list"
import type { MockTransaction } from "@/shared/mocks/data/transactions"
import { currencyToBRL } from "@/shared/utils"

type TransactionsCardProps = {
    transactions: MockTransaction[]
}

export function TransactionsCard({
    transactions,
}: TransactionsCardProps) {
    console.log({ transactions })
    const handleTotalTrnasactions = () => {
        return transactions.reduce((acc, currentValue) => {
            return acc + currentValue.amount
        }, 0)
    }
    return (
        <Card className="border-border/60 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-semibold">
                        Últimas transações
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Acompanhe suas movimentações recentes
                    </p>
                </div>
                <div className="items-end flex flex-col justify-end">
                    Valor Total das Transações
                    <br />
                    <b className="w-full  flex justify-end">
                        {currencyToBRL(handleTotalTrnasactions())}
                    </b>
                </div>
            </CardHeader>

            <CardContent>
                <TransactionList transactions={transactions} />
            </CardContent>
        </Card>
    )
}