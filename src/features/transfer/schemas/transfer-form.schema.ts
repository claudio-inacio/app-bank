import { z } from "zod";

export const transferFormSchema = z.object({
    recipientDocument: z
        .string()
        .min(11, "O documento do recebedor deve ter ao menos 11 caracteres")
        .max(18, "Documento inválido"),
    amount: z
        .number()
        .positive("O valor da transferência deve ser maior que zero"),
    description: z
        .string()
        .min(3, "A descrição deve ter ao menos 3 caracteres")
        .max(100, "A descrição deve ter no máximo 100 caracteres"),
});

export type TransferFormValues = z.infer<typeof transferFormSchema>;