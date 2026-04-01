import InputText from "@/shared/components/inputs/text-input";
import { Search } from "lucide-react"

type FilterTransactionsProps = {
    handleFilter: (value: string) => void;
    disabled: boolean;
}

export function FilterTransactions({
    handleFilter,
    disabled,
}: FilterTransactionsProps) {
    return (
        <div className="flex justify-end">
            <InputText
                id="search"
                name="search"
                placeholder="Pesquisar..."
                autoComplete="off"
                icon={Search}
                defaultValue=""
                disabled={!!disabled}
                onChange={(e) => handleFilter(e.target.value)}
            />
        </div>

    )
}