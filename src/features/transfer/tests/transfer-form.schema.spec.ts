import { describe, expect, it, vi } from "vitest";

vi.mock("@/shared/utils/StringMasks", () => ({
    default: {
        moneyMask: (value: string) => value,
    },
}));

import { transferFormSchema } from "../schemas/transfer-form.schema";

describe("transferFormSchema", () => {
    it("validar com sucesso um payload válido", () => {
        const result = transferFormSchema.safeParse({
            recipientDocument: "123.456.789-01",
            amount: "150,00",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(true);
    });

    it("falhar quando o documento tiver menos de 11 caracteres", () => {
        const result = transferFormSchema.safeParse({
            recipientDocument: "1234567890",
            amount: "150,00",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.recipientDocument).toContain(
            "O documento do recebedor deve ter ao menos 11 caracteres"
        );
    });

    it("deve falhar quando o documento for maior que 18 caracteres", () => {
        const result = transferFormSchema.safeParse({
            recipientDocument: "123.456.789-01-999999",
            amount: "150,00",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.recipientDocument).toContain(
            "Documento inválido"
        );
    });

    it("deve falhar quando o valor for zero", () => {
        const result = transferFormSchema.safeParse({
            recipientDocument: "123.456.789-01",
            amount: "0",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.amount).toContain(
            "O valor deve ser maior que zero"
        );
    });

    it("deve falhar quando a descrição tiver menos de 3 caracteres", () => {
        const result = transferFormSchema.safeParse({
            recipientDocument: "123.456.789-01",
            amount: "100,00",
            description: "ab",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.description).toContain(
            "A descrição deve ter ao menos 3 caracteres"
        );
    });

});