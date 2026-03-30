import { Button } from "@/shared/components/ui/button";
import { CheckCircle2, RotateCcw } from "lucide-react";


interface TransferSuccessProps {
    onNewTransfer: () => void;
    onClose: () => void;
}

export function TransferSuccess({
    onNewTransfer,
    onClose,
}: TransferSuccessProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>

            <div className="space-y-1">
                <h3 className="text-xl font-semibold">Transferência realizada</h3>
                <p className="text-sm text-muted-foreground">
                    A transferência foi concluída com sucesso.
                </p>
            </div>

            <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
                <Button className="flex-1" onClick={onNewTransfer}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Nova transferência
                </Button>

                <Button variant="error" className="flex-1" onClick={onClose}>
                    Fechar
                </Button>
            </div>
        </div>
    );
}