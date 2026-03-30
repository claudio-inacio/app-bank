import type { ReactNode } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"


type LoginCardProps = {
    children: ReactNode
}

export function LoginCard({ children }: LoginCardProps) {
    return (
        <Card className="w-full max-w-md  shadow-xl">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    <h1 className="text-lg font-bold">Bem vindo ao Onda Finance App</h1>
                </CardTitle>


                <CardDescription className="text-sm  mt-4">
                    <span>
                        Acessar conta
                    </span>
                </CardDescription>
            </CardHeader>

            <CardContent>{children}</CardContent>
        </Card>
    )
}