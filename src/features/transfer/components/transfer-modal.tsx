import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/shared/components/ui/dialog";
import { TransferForm } from "./transfer-form";
import { TransferSuccess } from "./transfer-success";
import type { TransferFormValues } from "../schemas/transfer-form.schema";
import { useTransfer } from "../hooks/useTransfer";
import type { CreateTransferResponse } from "../api/create-transfer";


interface TransferModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type TransferModalStep = "form" | "success";

export function TransferModal({
    open,
    onOpenChange,
}: TransferModalProps) {
    const [step, setStep] = useState<TransferModalStep>("form");
    const {
        mutateAsync: createTransferMutation,
        isPending,
    } = useTransfer();

    async function handleRealizeTransfer(values: TransferFormValues): Promise<CreateTransferResponse> {
        const response = await createTransferMutation({
            ...values,
            amount: parseFloat(values.amount.replace(/\./g, "").replace(",", ".")),
        });
        if (!isPending && response.transaction.id) {
            setStep("success");
        }
        return response;
    }

    useEffect(() => {
        if (!open) {
            setStep("form");
        }
    }, [open]);

    function handleTransferSuccess() {
        setStep("success");
    }

    function handleNewTransfer() {
        setStep("form");
    }

    function handleClose() {
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[620px] sm:h-[600px] bg-white rounded-2xl p-10">
                {step === "form" ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Nova transferência</DialogTitle>
                            <DialogDescription>
                                Informe o documento do destinatário e os dados da transferência.
                            </DialogDescription>
                        </DialogHeader>

                        <TransferForm
                            handleFormSubmit={handleRealizeTransfer}
                            isPending={isPending}
                            onSuccess={handleTransferSuccess}
                        />
                    </>
                ) : (
                    <TransferSuccess
                        onNewTransfer={handleNewTransfer}
                        onClose={handleClose}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}