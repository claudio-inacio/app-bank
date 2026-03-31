import { AppRouter } from "./providers/router";
import { QueryProvider } from "./providers/query-provider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

export default function App() {
    return (
        <QueryProvider>
            <TooltipProvider>

                <AppRouter />
            </TooltipProvider>
        </QueryProvider>
    )
}