import { describe, expect, it, vi, beforeEach } from "vitest";
import { createTransferFormSchema } from "../schemas/transfer-form.schema";

const cpfIsValidMock = vi.fn();

vi.mock("@/shared/utils/StringMasks", () => ({
    default: {
        moneyMask: (value: string) => value,
        cpfIsValid: (value: string) => cpfIsValidMock(value),
    },
}));

describe("createTransferFormSchema", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("deve validar com sucesso um payload válido quando houver saldo suficiente", () => {
        cpfIsValidMock.mockReturnValue(true);

        const result = createTransferFormSchema(200).safeParse({
            recipientDocument: "123.456.789-01",
            amount: "150,00",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(true);
        expect(cpfIsValidMock).toHaveBeenCalledWith("123.456.789-01");
    });

    it("deve falhar quando o CPF for inválido", () => {
        cpfIsValidMock.mockReturnValue(false);

        const result = createTransferFormSchema(200).safeParse({
            recipientDocument: "123.456.789-01",
            amount: "150,00",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.recipientDocument).toContain(
            "Informe um CPF válido"
        );
    });

    it("deve falhar quando o valor for zero", () => {
        cpfIsValidMock.mockReturnValue(true);

        const result = createTransferFormSchema(200).safeParse({
            recipientDocument: "123.456.789-01",
            amount: "0",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.amount).toContain(
            "O valor deve ser maior que zero"
        );
    });

    it("deve falhar quando houver saldo insuficiente", () => {
        cpfIsValidMock.mockReturnValue(true);

        const result = createTransferFormSchema(100).safeParse({
            recipientDocument: "123.456.789-01",
            amount: "150,00",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.amount).toContain(
            "Saldo insuficiente para realizar a transferência"
        );
    });

    it("deve falhar quando a descrição tiver menos de 3 caracteres", () => {
        cpfIsValidMock.mockReturnValue(true);

        const result = createTransferFormSchema(200).safeParse({
            recipientDocument: "123.456.789-01",
            amount: "100,00",
            description: "ab",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.description).toContain(
            "A descrição deve ter ao menos 3 caracteres"
        );
    });

    it("deve falhar quando o valor estiver vazio", () => {
        cpfIsValidMock.mockReturnValue(true);

        const result = createTransferFormSchema(200).safeParse({
            recipientDocument: "123.456.789-01",
            amount: "",
            description: "Pagamento de serviço",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.amount).toContain(
            "O valor é obrigatório"
        );
    });
});