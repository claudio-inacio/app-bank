import { Outlet } from "react-router";


export function AppLayout() {
    return (
        <div className="mih-h-screen bg-bakcground text-foreground">
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}