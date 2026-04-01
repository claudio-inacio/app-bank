import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "../components/Login-form";

const mockedHandleLogin = vi.fn();

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar os campos e botão", () => {
    render(
      <LoginForm
        handleFunction={mockedHandleLogin}
        isError={false}
        isSuccess={false}
        isLoading={false}
      />
    );

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite sua senha/i), "123123");;
    expect(
      screen.getByRole("button", { name: /entrar/i })
    ).toBeInTheDocument();
  });

  it("não deve permitir envio com campos vazios", async () => {
    const user = userEvent.setup();

    render(
      <LoginForm
        handleFunction={mockedHandleLogin}
        isError={false}
        isSuccess={false}
        isLoading={false}
      />
    );

    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(mockedHandleLogin).not.toHaveBeenCalled();
    });
  });

  it("deve chamar handleFunction com payload válido", async () => {
    const user = userEvent.setup();
    mockedHandleLogin.mockResolvedValueOnce(undefined);

    render(
      <LoginForm
        handleFunction={mockedHandleLogin}
        isError={false}
        isSuccess={false}
        isLoading={false}
      />
    );
    await user.type(screen.getByLabelText(/cpf/i), "234.120.130-05");
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), "123123");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(mockedHandleLogin).toHaveBeenCalled();
    });
  });

  it("deve exibir erro de validação ao informar CPF inválido", async () => {
    const user = userEvent.setup();

    render(
      <LoginForm
        handleFunction={mockedHandleLogin}
        isError={false}
        isSuccess={false}
        isLoading={false}
      />
    );

    await user.type(screen.getByLabelText(/cpf/i), "111.111.111-11");

    expect(
      screen.getByRole("button", { name: /Entrar/i })
    ).toBeDisabled();


    expect(mockedHandleLogin).not.toHaveBeenCalled();
  });

  it("deve desabilitar o botão quando estiver carregando", () => {
    render(
      <LoginForm
        handleFunction={mockedHandleLogin}
        isError={false}
        isSuccess={false}
        isLoading
      />
    );

    expect(
      screen.getByRole("button", { name: /entrando/i })
    ).toBeDisabled();
  });
});