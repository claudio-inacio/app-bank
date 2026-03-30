import { ReceiptText } from "lucide-react"

type DontResultSetTransactionprops = {
    title?: string
    description?: string
}

export function DontResultSetTransactions({
    title = "Nenhuma transação encontrada",
    description = "Quando houver movimentações, elas aparecerão aqui.",
}: DontResultSetTransactionprops) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 px-6 py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                <ReceiptText className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
}