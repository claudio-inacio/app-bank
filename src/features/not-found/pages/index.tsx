import { useSessionStore } from "@/app/store/use-session-store";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router";

export function NotFoundPage() {
    const navigate = useNavigate();
    const user = useSessionStore((state) => state.user);

    function handoGoToPage(route: string) {
        navigate(route);
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-4xl font-bold text-gray-800">
                404
            </h1>

            <p className="text-gray-500 text-lg">
                Página não encontrada
            </p>

            <Button
                onClick={() => user ? handoGoToPage('/dashboard') : handoGoToPage('/login')}
                className="px-6 py-3 cursor-pointer rounded-lg hover:opacity-90 transition" variant="alert"
            >
                {user ? 'Ir para Dashboard' : 'Ir para o login'}
            </Button>
        </div>
    );
}