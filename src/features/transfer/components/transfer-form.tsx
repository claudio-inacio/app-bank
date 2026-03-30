import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2, ShieldUser, Wallet } from "lucide-react";


import {
    transferFormSchema,
    type TransferFormValues,
} from "../schemas/transfer-form.schema";

import { useSessionStore } from "@/app/store/use-session-store";
import { useTransfer } from "../hooks/useTransfer";
import type { CreateTransferResponse } from "../api/create-transfer";
import StringMasks from "@/shared/utils/StringMasks";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";


interface TransferFormProps {
    onSuccess?: () => void;
    // handleFormSubmit: (values: TransferFormValues) => Promise<CreateTransferResponse>;
    handleFormSubmit: () => void;
    isLoading: boolean;
}

export function TransferForm({ onSuccess, handleFormSubmit, isLoading }: TransferFormProps) {
    const userData = useSessionStore((state) => state);
    const { mutateAsync, isPending } = useTransfer();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<TransferFormValues>({
        resolver: zodResolver(transferFormSchema),
        defaultValues: {
            recipientDocument: "",
            amount: 0,
            description: "",
        },
    });

    // async function handleTeste(values: TransferFormValues) {
    //     await mutateAsync({
    //         recipient: values.recipientDocument,
    //         bank: "Bank App",
    //         amount: values.amount,
    //         description: values.description,
    //     });

    //     onSuccess();
    // }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Wallet className="h-4 w-4" />
                    Saldo disponível
                </div>

                <p className="mt-2 text-2xl font-semibold">
                    {userData.balance.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>


            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4"
            >
                <div className="space-y-2">
                    <label
                        htmlFor="document"
                        className="text-sm font-medium text-foreground"
                    >
                        CPF
                    </label>

                    <div className="relative">
                        <ShieldUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Controller
                            name="recipientDocument"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="document"
                                    type="text"
                                    placeholder="000.000.000-00"
                                    autoComplete="document"
                                    className="pl-10"
                                    maxLength={11}
                                    disabled={isLoading}
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
                {/* 
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor da transferência</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0,00"
                                    disabled={isPending}
                                    value={field.value || ""}
                                    onChange={(event) =>
                                        field.onChange(Number(event.target.value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex: Pagamento de serviço"
                                    className="min-h-[100px]"
                                    disabled={isPending}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <Button type="submit" className="w-full" disabled={isPending || !isValid}>
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