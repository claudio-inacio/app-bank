import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest";
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockHandleFormSubmit = vi.fn();

const mockSessionStore = {
    balance: 3000,
};

vi.mock("@/app/store/use-session-store", () => ({
    useSessionStore: (selector: (state: typeof mockSessionStore) => unknown) =>
        selector(mockSessionStore),
}));

vi.mock("@/shared/utils/StringMasks", () => ({
    default: {
        formataCPF: (value: string) => {
            const digits = value.replace(/\D/g, "").slice(0, 11);

            if (digits.length <= 3) return digits;
            if (digits.length <= 6) {
                return `${digits.slice(0, 3)}.${digits.slice(3)}`;
            }
            if (digits.length <= 9) {
                return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
            }

            return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
                6,
                9
            )}-${digits.slice(9, 11)}`;
        },
        moneyMask: (value: string) => value,

        cpfIsValid(strCPF?: string): boolean {
            if (!strCPF) return false;

            const cpf = strCPF.replace(/\D/g, '');

            if (cpf.length !== 11) return false;


            if (/^(\d)\1{10}$/.test(cpf)) return false;

            let soma = 0;
            let resto: number;

            for (let i = 1; i <= 9; i++) {
                soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }

            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) resto = 0;

            if (resto !== parseInt(cpf.substring(9, 10))) return false;

            soma = 0;
            for (let i = 1; i <= 10; i++) {
                soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }

            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) resto = 0;

            if (resto !== parseInt(cpf.substring(10, 11))) return false;

            return true;
        }
    },
}));

vi.mock("@/shared/utils", () => ({
    currencyToBRL: (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value),
    parseCurrencyBRL: (value: string | number) => {
        if (typeof value === "number") return value;

        const normalized = value.replace(/\./g, "").replace(",", ".");
        const parsed = Number(normalized);

        return Number.isNaN(parsed) ? 0 : parsed;
    },
}));

import { TransferForm } from "../components/transfer-form";

describe("TransferForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockSessionStore.balance = 3000;
    });

    it("deve renderizar saldo, campos e botão", () => {
        render(
            <TransferForm
                handleFormSubmit={mockHandleFormSubmit}
                isPending={false}
            />
        );

        expect(screen.getByText("Saldo disponível")).toBeInTheDocument();
        expect(screen.getByText("R$ 3.000,00")).toBeInTheDocument();
        expect(screen.getByLabelText(/cpf destinatário/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/valor/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
        
        expect(
            screen.getByRole("button", { name: /realizar transferência/i })
        ).toBeDisabled();
    });

    it("deve exibir saldo insuficiente quando o valor for maior que o saldo", async () => {
        const user = userEvent.setup();

        render(
            <TransferForm
                handleFormSubmit={mockHandleFormSubmit}
                isPending={false}
            />
        );

        await user.type(
            screen.getByLabelText(/cpf destinatário/i),
            "12345678901"
        );
        await user.type(screen.getByLabelText(/valor/i), "5000,00");
        await user.type(screen.getByLabelText(/descrição/i), "Pagamento teste");

        expect(
            screen.getByText("Saldo insuficiente para realizar a transferência")
        ).toBeInTheDocument();

        const submitButton = screen.getByRole("button", {
            name: /realizar transferência/i,
        });

        expect(submitButton).toBeDisabled();
    });

    it("deve chamar handleFormSubmit com valores válidos", async () => {
        const user = userEvent.setup();

        mockHandleFormSubmit.mockResolvedValueOnce({
            message: "ok",
            transaction: {
                id: "trx-1",
                amount: 250.5,
            },
        });

        render(
            <TransferForm
                handleFormSubmit={mockHandleFormSubmit}
                isPending={false}
            />
        );

        await user.type(
            screen.getByLabelText(/cpf destinatário/i),
            "094.198.819-89"
        );
        await user.type(screen.getByLabelText(/valor/i), "250,50");
        await user.type(screen.getByLabelText(/descrição/i), "Pagamento de teste");

        const form = screen
            .getByRole("button", { name: /realizar transferência/i })
            .closest("form");

        fireEvent.submit(form!);

        await waitFor(() => {
            expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1);
        });
    });

    it("deve exibir estado de loading e desabilitar submit quando isPending for true", () => {
        render(
            <TransferForm
                handleFormSubmit={mockHandleFormSubmit}
                isPending
            />
        );

        expect(
            screen.getByRole("button", { name: /transferindo/i })
        ).toBeDisabled();
    });
});