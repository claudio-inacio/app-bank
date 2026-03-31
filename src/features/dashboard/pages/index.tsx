import { BalanceCard } from "../components/balance-card";
import { DashboardHeader } from "../components/dashboard-header";
import { TransactionsCard } from "../components/transaction-card";
import { FilterTransactions } from "../components/filter-transactions";
import { useDashboardData } from "../hooks/useDashboardData";
import { useMemo, useState } from "react";
import { useSessionStore } from "@/app/store/use-session-store";
import LoadingComponent from "@/shared/components/loading/LoadingComponent";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { TransferModal } from "@/features/transfer/components/transfer-modal";



export function DashboardPage() {
    const {
        isPending,
        data: dashboardData,
    } = useDashboardData();
    const userData = useSessionStore((state) => state);
    const [searchTransaction, setSearchTransaction] = useState("");
    const [isTransferOpen, setIsTransferOpen] = useState(false);
    const debouncedSearch = useDebounce(searchTransaction, 1000);
    const listTransactions = useSessionStore((state) => state.transactionsList);
    const currentListTransactions = listTransactions || dashboardData;

    const handleControlModalTransfer = () => {
        setIsTransferOpen((prev) => !prev);
    }


    const filteredTransactions = useMemo(() => {
        if (!debouncedSearch) return currentListTransactions;
        if (!currentListTransactions) return [];
        return currentListTransactions.filter((t) =>
            t.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

    }, [currentListTransactions, debouncedSearch]);


    return (
        <div className="mx-auto flex min-h-1/2 w-full max-w-7xl flex-col px-4 py-6 md:px-6 lg:px-8">
            <DashboardHeader handleFunctionLogout={userData.logout} userName={userData?.user?.name || "Usuário"} />
            <section className="grid gap-6 flex flex-col items-end w-full ">
                <BalanceCard handleControlModalTransfer={handleControlModalTransfer} amount={userData?.balance || 0} />
                {isPending ? <LoadingComponent key='loading-transactions' title="Carregando Transações" messageLoading="Estamos bucando suas transações mais recentes..." /> : (
                    <>
                        <FilterTransactions disabled={isPending || !currentListTransactions?.length} handleFilter={setSearchTransaction} />
                        <TransactionsCard transactions={filteredTransactions && searchTransaction !== "" ? filteredTransactions : currentListTransactions || []} />
                    </>
                )}
            </section>
            <TransferModal
                open={isTransferOpen}
                onOpenChange={setIsTransferOpen}
            />
        </div>
    )
}