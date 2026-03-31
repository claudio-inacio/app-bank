import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../api/login";
import { useSessionStore } from "@/app/store/use-session-store";
import { toast } from "sonner";


export function useLogin() {
    const saveSession = useSessionStore((state) => state.login);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            saveSession({
                user: data.user,
                token: data.token,
                balance: data.balance,
            });

            navigate("/", { replace: true });
        },
        onError: (e) => {            
            toast.error("Usuário ou senha inválidos", {
                position: "top-center"
            })
        }
    });
}