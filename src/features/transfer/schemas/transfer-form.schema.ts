import { parseCurrencyBRL } from "@/shared/utils";
import StringMasks from "@/shared/utils/StringMasks";
import { z } from "zod";

export const createTransferFormSchema = (currentBalance: number) => z.object({
    recipientDocument: z
        .string().refine((value) => {
            return StringMasks.cpfIsValid(value)
        }, "Informe um CPF válido"),
    amount: z
        .string()
        .min(3, "O valor é obrigatório")
        .refine((value) => {

            const numericValue = parseFloat(
                StringMasks.moneyMask(value).replace(/[^0-9.-]+/g, "")
            );

            return numericValue > 0;
        }, "O valor deve ser maior que zero")
        .refine((value) => {

            const numericAmount = parseCurrencyBRL(value);
            return numericAmount <= currentBalance;

        }, "Saldo insuficiente para realizar a transferência"),
    description: z
        .string()
        .min(3, "A descrição deve ter ao menos 3 caracteres")
        .max(100, "A descrição deve ter no máximo 100 caracteres"),
});

export type TransferFormValues = z.infer<
    ReturnType<typeof createTransferFormSchema>
>;