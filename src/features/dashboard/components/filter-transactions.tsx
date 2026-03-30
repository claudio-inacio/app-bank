import { Input } from "@/shared/components/ui/input"
import { Search } from "lucide-react"

type FilterTransactionsProps = {
    handleFilter: (value: string) => void
}

export function FilterTransactions({
    handleFilter,
}: FilterTransactionsProps) {
    return (
        <div className="flex justify-end">
            <div className="relative w-full md:w-[280px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    onChange={(e) => handleFilter(e.target.value)}
                    placeholder="Buscar transações"
                    className="pl-10"
                    aria-label="Buscar transações"
                />
            </div>
        </div>

    )
}