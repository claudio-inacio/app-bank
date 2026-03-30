import { z } from "zod"

export const loginSchema = z.object({
    document: z
        .string()
        .min(8, "O documento é obrigatório"),
    password: z
        .string()
        .min(1, "A senha é obrigatória")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type LoginFormValues = z.infer<typeof loginSchema>