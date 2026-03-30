import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTransfer } from "../api/create-transfer";

export function useTransfer() {

    return useMutation({
        mutationFn: createTransfer,
        onSuccess: (data) => {
            console.log("transferData:", data);
        },
        onError: () => {
            toast.error("Transferencia não realizada, confira os dados informados ", {
                position: "top-center"
            })
        }
    })
}