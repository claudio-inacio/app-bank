import StringMasks from "@/shared/utils/StringMasks"
import { z } from "zod"

export const loginSchema = z.object({
    document: z
        .string()
        .min(11, "O documento é obrigatório").max(18, "Documento inválido").refine((value) => {
            return StringMasks.cpfIsValid(value)

        }, "Informe um CPF válido")
    ,
    password: z
        .string()
        .min(1, "A senha é obrigatória")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type LoginFormValues = z.infer<typeof loginSchema>