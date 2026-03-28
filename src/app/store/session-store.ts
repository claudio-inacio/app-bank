import { create } from "zustand";

interface SessionState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const useSessionstore = create<SessionState>()((set) => ({
    isAuthenticated: true,

    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false }),
}))