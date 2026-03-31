import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
} from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

const mockCreateTransfer = vi.fn();
const mockInvalidateQueries = vi.fn();
const mockDecrementBalance = vi.fn();
const mockSetNewTransferList = vi.fn();
const mockToastError = vi.fn();

const mockTransaction = {
    id: "trx-1",
    title: "Transferência enviada",
    type: "expense",
    amount: 150,
    date: "2026-03-30",
};

const mockTransactions = [
    {
        id: "trx-old",
        title: "Transferência antiga",
        type: "expense",
        amount: 80,
        date: "2026-03-29",
    },
];

let sessionState = {
    decrementBalance: mockDecrementBalance,
    setNewTransferList: mockSetNewTransferList,
    transactionsList: mockTransactions,
};

vi.mock("../api/create-transfer", () => ({
    createTransfer: (...args: unknown[]) => mockCreateTransfer(...args),
}));

vi.mock("@/app/store/use-session-store", () => ({
    useSessionStore: (selector: (state: typeof sessionState) => unknown) =>
        selector(sessionState),
}));

vi.mock("@/app/providers/query-client", () => ({
    queryClient: {
        invalidateQueries: (...args: unknown[]) => mockInvalidateQueries(...args),
    },
}));

vi.mock("sonner", () => ({
    toast: {
        error: (...args: unknown[]) => mockToastError(...args),
    },
}));

vi.mock("@/shared/mocks/data/transactions", () => ({
    mockTransactions: [
        {
            id: "fallback-1",
            title: "Transferência mock",
            type: "expense",
            amount: 20,
            date: "2026-03-20",
        },
    ],
}));

import { useTransfer } from "../hooks/useTransfer";

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return function Wrapper({ children }: { children: React.ReactNode }) {
        return React.createElement(
            QueryClientProvider,
            { client: queryClient },
            children
        );
    };
}

describe("useTransfer", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        sessionState = {
            decrementBalance: mockDecrementBalance,
            setNewTransferList: mockSetNewTransferList,
            transactionsList: mockTransactions,
        };
    });



    it('invalidar query "transfers", alem de  decrementar saldo e atualizar a lista no sucesso', async () => {
        mockCreateTransfer.mockResolvedValueOnce({
            message: "ok",
            transaction: mockTransaction,
        });

        const { result } = renderHook(() => useTransfer(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync({
            recipientDocument: "123.456.789-01",
            amount: 150,
            description: "Pagamento",
        });

        await waitFor(() => {
            expect(mockInvalidateQueries).toHaveBeenCalledWith({
                queryKey: ["transfers"],
            });
        });

        expect(mockDecrementBalance).toHaveBeenCalledWith(150);
        expect(mockSetNewTransferList).toHaveBeenCalledWith([
            mockTransaction,
            ...mockTransactions,
        ]);
    });

    it("deve usar a lista mock quando transactionsList estiver vazio", async () => {
        sessionState.transactionsList = undefined as unknown as typeof mockTransactions;

        mockCreateTransfer.mockResolvedValueOnce({
            message: "ok",
            transaction: mockTransaction,
        });

        const { result } = renderHook(() => useTransfer(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync({
            recipientDocument: "123.456.789-01",
            amount: 150,
            description: "Pagamento",
        });

        expect(mockSetNewTransferList).toHaveBeenCalledWith([
            mockTransaction,
            {
                id: "fallback-1",
                title: "Transferência mock",
                type: "expense",
                amount: 20,
                date: "2026-03-20",
            },
        ]);
    });

    it("deve exibir toast de erro e não atualizar store quando a mutation falhar", async () => {
        mockCreateTransfer.mockRejectedValueOnce(new Error("request failed"));

        const { result } = renderHook(() => useTransfer(), {
            wrapper: createWrapper(),
        });

        await expect(
            result.current.mutateAsync({
                recipientDocument: "123.456.789-01",
                amount: 150,
                description: "Pagamento",
            })
        ).rejects.toThrow("request failed");

        await waitFor(() => {
            expect(mockToastError).toHaveBeenCalledWith(
                "Transferencia não realizada, confira os dados informados ",
                { position: "top-center" }
            );
        });

        expect(mockInvalidateQueries).not.toHaveBeenCalled();
        expect(mockDecrementBalance).not.toHaveBeenCalled();
        expect(mockSetNewTransferList).not.toHaveBeenCalled();
    });
});