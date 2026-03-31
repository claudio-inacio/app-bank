import { getTransactions } from "@/features/transactions/api/get-transactions";
import { useQuery } from "@tanstack/react-query";

export function useDashboardData() {

    return useQuery({
        queryKey: ["transfers"],
        queryFn: getTransactions,
    })
}