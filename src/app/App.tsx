import { AppRouter } from "./providers/router";
import { QueryProvider } from "./providers/query-provider";

export default function App() {
    return (
        <QueryProvider>
            <AppRouter />
        </QueryProvider>
    )
}