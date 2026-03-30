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
import { mockTransactionResponse } from "@/shared/mocks/data/transactions";
import type { LoginFormValues } from "@/features/auth/schemas/login.schema";


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

    useEffect(() => {
        if (!open) {
            setStep("form");
        }
    }, [open]);

    const handleTransfer = async (values: LoginFormValues) => {
        console.log({ values })
        return mockTransactionResponse;
    }

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
            <DialogContent className="sm:max-w-[620px] sm:h-[400px] bg-white rounded-2xl p-10">
                {step === "form" ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Nova transferência</DialogTitle>
                            <DialogDescription>
                                Preencha os dados abaixo para realizar a transferência.
                            </DialogDescription>
                        </DialogHeader>

                        <TransferForm
                            isLoading={false}
                            handleFormSubmit={() => console.log("submit")}
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