import { cn } from "@/shared/lib/utils"
import type { MockTransaction } from "@/shared/mocks/data/transactions"
import { currencyToBRL, formatDate } from "@/shared/utils"
import { cva } from "class-variance-authority"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"




const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      type: {
        income: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        expense: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        transfer: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      },
    },
    defaultVariants: {
      type: "income",
    },
  }
)

type TransactionItemProps = {
  transaction: MockTransaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === "income"

  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 p-4 transition-all hover:shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"
          )}
        >
          {isIncome ? (
            <ArrowDownLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <ArrowUpRight className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          )}
        </div>

        <div>
          <p className="font-medium">{transaction.description}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {transaction.recipientDocument}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {formatDate(transaction.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p
          className={cn(
            "font-semibold",
            isIncome
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-rose-600 dark:text-rose-400"
          )}
        >
          {isIncome ? "+" : "-"} {currencyToBRL(transaction.amount)}
        </p>

        <span className={cn(badgeVariants({ type: transaction.type }))}>
          {isIncome ? "Entrada" : "Saída"}
        </span>
      </div>
    </div>
  )
}