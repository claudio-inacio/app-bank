import { LogOut } from "lucide-react"


import { Button } from "@/shared/components/ui/button"
import { TooltipComponent } from "@/shared/components/tooltip/TooltipComponent"

type DashboardHeaderProps = {
    userName: string
    handleFunctionLogout: () => void
}

export function DashboardHeader({ userName, handleFunctionLogout }: DashboardHeaderProps) {
    return (
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <p className="text-sm text-muted-foreground">Bem-vindo de volta</p>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Olá, {userName}
                </h1>
            </div>

            <TooltipComponent position="top" textMessage="Sair" key='button-logou'>
                <Button onClick={() => handleFunctionLogout()} className="cursor-pointer mr-2" variant="outline" size="icon" aria-label="Sair">
                    <LogOut className="h-4 w-4" />
                </Button>
            </TooltipComponent>

        </header>
    )
}