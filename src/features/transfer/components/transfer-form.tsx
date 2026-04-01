import { useForm } from "react-hook-form";
import { Loader2, ShieldUser, Wallet, DollarSign, Form } from "lucide-react";

import {
    createTransferFormSchema,
    type TransferFormValues,
} from "../schemas/transfer-form.schema";

import { useSessionStore } from "@/app/store/use-session-store";
import type { CreateTransferResponse } from "../api/create-transfer";
import StringMasks from "@/shared/utils/StringMasks";
import { Button } from "@/shared/components/ui/button";
import { currencyToBRL } from "@/shared/utils";
import InputText from "@/shared/components/inputs/text-input";
import { zodResolver } from "@hookform/resolvers/zod";


interface TransferFormProps {
    onSuccess?: () => void;
    handleFormSubmit: (values: TransferFormValues) => Promise<CreateTransferResponse>;
    isPending: boolean;
}

export function TransferForm({ handleFormSubmit, isPending }: TransferFormProps) {
    const userData = useSessionStore((state) => state);
    const currentBalance = Number(userData?.balance ?? 0);

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<TransferFormValues>({
        resolver: zodResolver(createTransferFormSchema(currentBalance)),
        defaultValues: {
            recipientDocument: "",
            amount: "",
            description: "",
        },
        mode: 'onChange'
    });

    console.log('saldo', userData?.balance)
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Wallet className="h-4 w-4" />
                    Saldo disponível
                </div>

                <p className="mt-2 text-2xl font-semibold">
                    {currencyToBRL(userData?.balance || 0)}
                </p>
            </div>


            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4"
            >
                <InputText
                    autoComplete="document"
                    control={control}
                    error={errors.recipientDocument}
                    id="recipientDocument"
                    inputLabel="CPF Destinatário"
                    isLoading={!!isPending}
                    disabled={!!isPending || !!isPending}
                    name="recipientDocument"
                    placeholder="000.000.000-00"
                    icon={ShieldUser}
                    formatValueMask={StringMasks.formataCPF}
                    maxLength={14}
                    minLength={14}
                />
                <InputText
                    autoComplete="amount"
                    control={control}
                    error={errors.amount}
                    id="amount"
                    placeholder="informe o valor da transferencia"
                    isLoading={!!isPending}
                    disabled={!!isPending || !!isPending}
                    name="amount"
                    inputLabel="Valor"
                    icon={DollarSign}
                    formatValueMask={StringMasks.moneyMask}
                />
                <InputText
                    autoComplete="description"
                    control={control}
                    error={errors.description}
                    id="description"
                    placeholder="informe a descrição"
                    isLoading={!!isPending}
                    disabled={!!isPending || !!isPending}
                    name="description"
                    inputLabel="Descrição"
                    icon={Form}
                />
                <Button variant={currentBalance <= 0 ? 'alert': "success"} type="submit" className="w-full py-6 cursor-pointer" disabled={isPending || !isValid ||  currentBalance <= 0}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Transferindo...
                        </>
                    ) : (
                        currentBalance <= 0 ? 'Saldo Zerado': "Realizar Transferência"
                    )}
                </Button>
            </form>

        </div>
    );
}