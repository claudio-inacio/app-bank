import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTransfer, type CreateTransferResponse } from "../api/create-transfer";
import { useSessionStore } from "@/app/store/use-session-store";
import { queryClient } from "@/app/providers/query-client";
import { mockTransactions } from "@/shared/mocks/data/transactions";

export function useTransfer() {
    const decrementBalance = useSessionStore((state) => state.decrementBalance);
    const setNewTransferList = useSessionStore((state) => state.setNewTransferList);
    const listTransactions = useSessionStore((state) => state.transactionsList);

    return useMutation({
        mutationFn: createTransfer,
        onSuccess: async (data: CreateTransferResponse) => {
            await queryClient.invalidateQueries({
                queryKey: ["transfers"],
            });
            decrementBalance(data.transaction.amount);
            const currenList = listTransactions ?? mockTransactions;
            console.log({data})
            setNewTransferList([data.transaction, ...currenList]);

            return data;
        },
        onError: () => {
            toast.error("Transferencia não realizada, confira os dados informados ", {
                position: "top-center"
            })
        }
    })
}