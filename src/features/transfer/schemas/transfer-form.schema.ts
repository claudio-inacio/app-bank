import { parseCurrencyBRL } from "@/shared/utils";
import StringMasks from "@/shared/utils/StringMasks";

import { z } from "zod";

export const createTransferFormSchema = (currentBalance: number) =>
  z.object({
    recipientDocument: z
      .string()
      .refine((value) => StringMasks.cpfIsValid(value), {
        message: "Informe um CPF válido",
      }),

    amount: z
      .string()
      .min(1, "O valor é obrigatório")
      .refine((value) => {
        const numericAmount = parseCurrencyBRL(value);
        return numericAmount > 0;
      }, {
        message: "O valor deve ser maior que zero",
      })
      .refine((value) => {
        const numericAmount = parseCurrencyBRL(value);
        return numericAmount <= currentBalance;
      }, {
        message: "Saldo insuficiente para realizar a transferência",
      }),

    description: z
      .string()
      .min(3, "A descrição deve ter ao menos 3 caracteres")
      .max(100, "A descrição deve ter no máximo 100 caracteres"),
  });

export type TransferFormValues = z.infer<
  ReturnType<typeof createTransferFormSchema>
>;