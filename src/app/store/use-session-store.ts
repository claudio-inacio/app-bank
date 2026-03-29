import type { SessionState } from "@/shared/types/session.types";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'



const INITIAL_BALANCE = 0;

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            balance: INITIAL_BALANCE,
            isHydrated: false,

            login: ({ user, token, balance = INITIAL_BALANCE }) => set({
                user,
                token,
                isAuthenticated: true,
                balance
            }),
            logout: () => set({
                user: null,
                token: null,
                isAuthenticated: false,
                balance: 0,
            }),
            setBalance: (banlanceValue) => set({
                balance: banlanceValue,
            }),
            decrementBalance: (value) => set((state) => ({
                balance: Math.max(0, state.balance - value),
            })),

            setIsHydrated: (value) => set({
                isHydrated: value,
            }),
        }),
        {
            name: "bank-app-localStorage",
            storage: createJSONStorage(() => localStorage), // garantir que a persistencia vai ser do tipo JSON.
            partialize: (state) => ({ // configurar o objeto JSON e como ele sera salvo no localStorage
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                balance: state.balance,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setIsHydrated(true);
                }
            },
        }
    )
);