import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2, ShieldUser, Wallet, DollarSign } from "lucide-react";


import {
    transferFormSchema,
    type TransferFormValues,
} from "../schemas/transfer-form.schema";

import { useSessionStore } from "@/app/store/use-session-store";
import type { CreateTransferResponse } from "../api/create-transfer";
import StringMasks from "@/shared/utils/StringMasks";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { currencyToBRL, parseCurrencyBRL } from "@/shared/utils";


interface TransferFormProps {
    onSuccess?: () => void;
    handleFormSubmit: (values: TransferFormValues) => Promise<CreateTransferResponse>;
    isPending: boolean;
}

export function TransferForm({  handleFormSubmit, isPending }: TransferFormProps) {
    const userData = useSessionStore((state) => state);

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<TransferFormValues>({
        resolver: zodResolver(transferFormSchema),
        defaultValues: {
            recipientDocument: "",
            amount: '',
            description: "",
        },
    });

    const transferenceValueIsPossible = (amount: string): boolean => {
        const balance = parseCurrencyBRL(userData?.balance.toString() ?? 0)
        const numericAmount = parseCurrencyBRL(amount)
        return numericAmount <= balance
    }
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
                <div className="space-y-2">
                    <label
                        htmlFor="recipientDocument"
                        className="text-sm font-medium text-foreground"
                    >
                        CPF Destinatário
                    </label>

                    <div className="relative">
                        <ShieldUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Controller
                            name="recipientDocument"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="recipientDocument"
                                    type="text"
                                    placeholder="000.000.000-00"
                                    autoComplete="document"
                                    className="pl-10"
                                    maxLength={11}
                                    disabled={isPending}
                                    aria-invalid={!!errors.recipientDocument}
                                    value={field.value || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const formatted = StringMasks.formataCPF(e.target.value);
                                        field.onChange(formatted);
                                    }}
                                />
                            )}
                        />
                    </div>
                    {errors.recipientDocument ? (
                        <p className="text-sm font-medium text-destructive text-red-600">
                            {errors.recipientDocument.message}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="amount"
                        className="text-sm font-medium text-foreground"
                    >
                        Valor
                    </label>

                    <div className="relative">
                        <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Controller
                            name="amount"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="amount"
                                    type="text"
                                    placeholder="informe o valor"
                                    autoComplete="amount"
                                    className="pl-10"
                                    disabled={isPending}
                                    aria-invalid={!!errors.amount}
                                    value={field.value || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const formatted = StringMasks.moneyMask(e.target.value);
                                        field.onChange(formatted);
                                    }}
                                />
                            )}
                        />

                    </div>

                    {errors.amount || !transferenceValueIsPossible(StringMasks.moneyMask(watch("amount"))) ? (
                        <p className="text-sm font-medium text-red-600">
                            {errors?.amount?.message || "Saldo insuficiente para esta transferência"}
                        </p>
                    ) : null}
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium text-foreground"
                    >
                        Descrição
                    </label>



                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Input
                                id="description"
                                type="text"
                                placeholder="informe a descrição"
                                autoComplete="description"
                                className="pl-10"
                                disabled={isPending}
                                aria-invalid={!!errors.description}
                                value={field.value || ''}

                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                                    field.onChange(e.target.value);
                                }}
                            />
                        )}
                    />



                    {errors.description ? (
                        <p className="text-sm font-medium text-red-600">
                            {errors.description.message}
                        </p>
                    ) : null}
                </div>

                <Button variant="success" type="submit" className="w-full py-6 cursor-pointer" disabled={isPending || !isValid || !transferenceValueIsPossible(StringMasks.moneyMask(watch("amount")))}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Transferindo...
                        </>
                    ) : (
                        "Realizar transferência"
                    )}
                </Button>
            </form>

        </div>
    );
}