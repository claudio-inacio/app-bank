import { BalanceCard } from "../components/balance-card";
import { DashboardHeader } from "../components/dashboard-header";
import { TransactionsCard } from "../components/transaction-card";
import { FilterTransactions } from "../components/filter-transactions";
import { useDashboardData } from "../hooks/useDashboardData";
import { useEffect, useMemo, useState } from "react";
import { useSessionStore } from "@/app/store/use-session-store";
import LoadingComponent from "@/shared/components/loading/LoadingComponent";
import { useDebounce } from "@/shared/hooks/useDebounce";



export function DashboardPage() {
    const {
        mutateAsync: dashboardDataMutation,
        isPending,
        data: dashboardData
    } = useDashboardData();
    const userData = useSessionStore((state) => state);
    const [searchTransaction, setSearchTransaction] = useState("");

    const debouncedSearch = useDebounce(searchTransaction, 1000);

    console.log({searchTransaction})
    useEffect(() => {
        dashboardDataMutation();
    }, [dashboardDataMutation])

    const filteredTransactions = useMemo(() => {
        if (!debouncedSearch) return dashboardData;
        if (!dashboardData) return [];

        return dashboardData.filter((t) =>
            t.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

    }, [dashboardData, debouncedSearch]);


    return (
        <div className="mx-auto flex min-h-1/2 w-full max-w-7xl flex-col px-4 py-6 md:px-6 lg:px-8">
            <DashboardHeader userName={userData?.user?.name || "Usuário"} />
            <section className="grid gap-6 flex flex-col items-end w-full ">
                <BalanceCard amount={userData?.balance || 0} />
                {isPending ? <LoadingComponent key='loading-transactions' title="Carregando Transações" messageLoading="Estamos bucando suas transações mais recentes..." /> : (
                    <>
                        <FilterTransactions handleFilter={setSearchTransaction} />
                        <TransactionsCard transactions={filteredTransactions && filteredTransactions.length > 0 && searchTransaction !== "" ? filteredTransactions : dashboardData || []} />
                    </>
                )}
            </section>
        </div>
    )
}