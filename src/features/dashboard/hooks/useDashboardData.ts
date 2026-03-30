import { getTransactions } from "@/features/transactions/api/get-transactions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDashboardData() {

    return useMutation({
        mutationFn: getTransactions,
        onSuccess: (data) => {
            console.log("Dashboard data:", data);
        },
        onError: () => {
            toast.error("Não foi possível carregar os dados do dashboard", {
                position: "top-center"
            })
        }
    })
}