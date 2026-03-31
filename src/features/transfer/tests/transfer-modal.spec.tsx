import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockMutateAsync = vi.fn();
const mockOnOpenChange = vi.fn();

vi.mock("../hooks/useTransfer", () => ({
  useTransfer: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}));

vi.mock("@/shared/components/ui/dialog", () => ({
  Dialog: ({
    open,
    children,
  }: {
    open: boolean;
    children: React.ReactNode;
  }) => (open ? <div data-testid="dialog-root">{children}</div> : null),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

vi.mock("../components/transfer-form", () => ({
  TransferForm: ({
    handleFormSubmit,
    isPending,
  }: {
    handleFormSubmit: (values: {
      recipientDocument: string;
      amount: string;
      description: string;
    }) => Promise<unknown>;
    isPending: boolean;
  }) => (
    <div>
      <span data-testid="form-pending">{String(isPending)}</span>
      <button
        type="button"
        onClick={() =>
          handleFormSubmit({
            recipientDocument: "123.456.789-01",
            amount: "1.500,50",
            description: "Pagamento modal",
          })
        }
      >
        submit-form
      </button>
    </div>
  ),
}));

vi.mock("../components/transfer-success", () => ({
  TransferSuccess: ({
    onNewTransfer,
    onClose,
  }: {
    onNewTransfer: () => void;
    onClose: () => void;
  }) => (
    <div>
      <p>success-step</p>
      <button type="button" onClick={onNewTransfer}>
        reset-step
      </button>
      <button type="button" onClick={onClose}>
        close-modal
      </button>
    </div>
  ),
}));

import { TransferModal } from "../components/transfer-modal";

describe("TransferModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o formulário no estado inicial", () => {
    render(<TransferModal open onOpenChange={mockOnOpenChange} />);

    expect(screen.getByText("Nova transferência")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Informe o documento do destinatário e os dados da transferência."
      )
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /submit-form/i })).toBeInTheDocument();
  });

  it("deve converter amount para number antes de chamar a mutation", async () => {
    const user = userEvent.setup();

    mockMutateAsync.mockResolvedValueOnce({
      message: "ok",
      transaction: {
        id: "trx-123",
        amount: 1500.5,
      },
    });

    render(<TransferModal open onOpenChange={mockOnOpenChange} />);

    await user.click(screen.getByRole("button", { name: /submit-form/i }));

    expect(mockMutateAsync).toHaveBeenCalledWith({
      recipientDocument: "123.456.789-01",
      amount: 1500.5,
      description: "Pagamento modal",
    });
  });

  it("deve mudar para o step de sucesso quando a mutation retornar transaction.id", async () => {
    const user = userEvent.setup();

    mockMutateAsync.mockResolvedValueOnce({
      message: "ok",
      transaction: {
        id: "trx-123",
        amount: 1500.5,
      },
    });

    render(<TransferModal open onOpenChange={mockOnOpenChange} />);

    await user.click(screen.getByRole("button", { name: /submit-form/i }));

    expect(await screen.findByText("success-step")).toBeInTheDocument();
  });

  it('deve voltar para "form" ao clicar em "Nova transferência"', async () => {
    const user = userEvent.setup();

    mockMutateAsync.mockResolvedValueOnce({
      message: "ok",
      transaction: {
        id: "trx-123",
        amount: 1500.5,
      },
    });

    render(<TransferModal open onOpenChange={mockOnOpenChange} />);

    await user.click(screen.getByRole("button", { name: /submit-form/i }));
    expect(await screen.findByText("success-step")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /reset-step/i }));

    expect(screen.getByRole("button", { name: /submit-form/i })).toBeInTheDocument();
  });

  it("deve chamar onOpenChange(false) ao fechar pela tela de sucesso", async () => {
    const user = userEvent.setup();

    mockMutateAsync.mockResolvedValueOnce({
      message: "ok",
      transaction: {
        id: "trx-123",
        amount: 1500.5,
      },
    });

    render(<TransferModal open onOpenChange={mockOnOpenChange} />);

    await user.click(screen.getByRole("button", { name: /submit-form/i }));
    await user.click(screen.getByRole("button", { name: /close-modal/i }));

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
});