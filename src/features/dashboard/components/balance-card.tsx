import { cva } from "class-variance-authority"
import {  Wallet } from "lucide-react"

import {
    Card,
    
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import { cn } from "@/shared/lib/utils"
import { currencyToBRL } from "@/shared/utils"





const balanceCardVariants = cva(
    "border-border/60 shadow-xl backdrop-blur-sm",
    {
        variants: {
            tone: {
                default:
                    "bg-gradient-to-br from-zinc-700 via-zinc-700 to-zinc-800 text-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800",
            },
        },
        defaultVariants: {
            tone: "default",
        },
    }
)

type BalanceCardProps = {
    amount: number
    income?: number
    expense?: number
    className?: string
}

export function BalanceCard({
    amount,
    // income = 10800,
    // expense = 2450.65,
    className,
}: BalanceCardProps) {
    return (
        <Card className={cn(balanceCardVariants(), className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                    <p className="text-sm text-zinc-300">Saldo disponível</p>
                    <CardTitle className="mt-1 text-3xl font-bold">
                        {currencyToBRL(amount)}
                    </CardTitle>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Wallet className="h-6 w-6" />
                </div>
            </CardHeader>

            {/* <CardContent className="grid gap-3 pt-2 md:grid-cols-2">
                <BalanceType typeBalanceName="Entradas" typeBalanceValue={income} typeBalanceIcon={<ArrowUpRight className="h-4 w-4" />} />
                <BalanceType typeBalanceName="Saídas" typeBalanceValue={expense} typeBalanceIcon={<ArrowDownRight className="h-4 w-4" />} />
            </CardContent> */}
        </Card>
    )
}