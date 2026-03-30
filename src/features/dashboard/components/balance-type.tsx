import { currencyToBRL } from "@/shared/utils"


type BalanceTypeProps = {
    typeBalanceValue: number
    typeBalanceName: string
    typeBalanceIcon?: React.ReactNode

}

export function BalanceType({
    typeBalanceName,
    typeBalanceIcon,
    typeBalanceValue = 10800,
}: BalanceTypeProps) {
    return (

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-zinc-300">
                {typeBalanceIcon && typeBalanceIcon}
                <span className="text-sm">{typeBalanceName}</span>
            </div>
            <p className="text-lg font-semibold">{currencyToBRL(typeBalanceValue)}</p>
        </div>

    )
}