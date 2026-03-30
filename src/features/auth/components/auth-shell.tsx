import type { ReactNode } from "react"

type AuthShellProps = {
    children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40">
            <div className="container relative mx-auto flex min-h-screen items-center justify-center px-4 py-10">
                {children}
            </div>
        </main>
    )
}