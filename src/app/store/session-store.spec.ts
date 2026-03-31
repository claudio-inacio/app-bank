import { beforeEach, describe, expect, it } from "vitest";
import { useSessionStore } from "./use-session-store";

describe("session-store", () => {
  beforeEach(() => {
    useSessionStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      balance: 2450.75,
    });
    localStorage.clear();
  });

  it("autenticar o usuário com sucesso", () => {
    useSessionStore.getState().login({
      user: {
        id: "1",
        name: "Usuário Padrão",
        document: "234.120.130-05",
      },
      token: "mock-token",
      balance: 3000,
    });

    const state = useSessionStore.getState();

    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.name).toBe("Usuário Padrão");
    expect(state.token).toBe("mock-token");
    expect(state.balance).toBe(3000);
  });

  it("limpar a sessão no logout", () => {
    useSessionStore.getState().login({
      user: {
        id: "1",
        name: "Usuário Padrão",
        document: "234.120.130-05",
      },
      token: "mock-token",
      balance: 3000 ,
    });

    useSessionStore.getState().logout();

    const state = useSessionStore.getState();

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.balance).toBe(0);
  });

  it("atualizar o saldo manualmente", () => {
    useSessionStore.getState().setBalance(1500);

    expect(useSessionStore.getState().balance).toBe(1500);
  });

  // futuramente podemos criar um teste para verificar se o valor da transferencia é maior que o saldo disponivel
  // e exibir uma alerta de saldo insuficiente, oferecendo a opção de utilizar o cheque espeical ou outro serviço qualquer
  it("diminui o saldo sem permitir valor negativo", () => {
    useSessionStore.getState().setBalance(100);
    useSessionStore.getState().decrementBalance(150);

    expect(useSessionStore.getState().balance).toBe(0);
  });
});