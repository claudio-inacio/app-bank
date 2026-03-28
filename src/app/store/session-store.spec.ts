import { beforeEach, describe, expect, it } from "vitest";
import { useSessionStore } from "./session-store";

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

  it("deve autenticar o usuário com sucesso", () => {
    useSessionStore.getState().login({
      user: {
        id: "1",
        name: "Claudio",
        document: "094.198.819-89",
      },
      token: "mock-token",
      balance: 3000,
    });

    const state = useSessionStore.getState();

    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.name).toBe("Claudio");
    expect(state.token).toBe("mock-token");
    expect(state.balance).toBe(3000);
  });

  it("deve limpar a sessão no logout", () => {
    useSessionStore.getState().login({
      user: {
        id: "1",
        name: "Claudio",
        document: "094.198.819-89",
      },
      token: "mock-token",
      balance: 3000,
    });

    useSessionStore.getState().logout();

    const state = useSessionStore.getState();

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.balance).toBe(0);
  });

  it("deve atualizar o saldo manualmente", () => {
    useSessionStore.getState().setBalance(1500);

    expect(useSessionStore.getState().balance).toBe(1500);
  });

  it("deve diminuir o saldo sem permitir valor negativo", () => {
    useSessionStore.getState().setBalance(100);
    useSessionStore.getState().decrementBalance(150);

    expect(useSessionStore.getState().balance).toBe(0);
  });
});