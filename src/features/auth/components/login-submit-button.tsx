import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"
import { cva } from "class-variance-authority"
import { Loader2 } from "lucide-react"



const submitButtonVariants = cva(
    "w-full font-semibold transition-all duration-200 bg-green-500 cursor-pointer",
    {
        variants: {
            intent: {
                primary:
                    "shadow-sm hover:shadow-md",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
)

type LoginSubmitButtonProps = {
    isLoading: boolean
    disabled: boolean
}

export function LoginSubmitButton({
    isLoading,
    disabled
}: LoginSubmitButtonProps) {
    return (
        <Button
            type="submit"
            size="lg"
            disabled={isLoading || disabled}
            className={cn(submitButtonVariants())}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                </>
            ) : (
                "Entrar"
            )}
        </Button>
    )
}