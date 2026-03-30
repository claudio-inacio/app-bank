
import { Button } from "../ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../ui/tooltip"


type TooltipComponentProps = {
    children?: React.ReactNode,
    position: "left" | "top" | "bottom" | "right",
    textMessage: string
    buttonText?: string
    key: string | number
}

export function TooltipComponent({
    children,
    position,
    buttonText,
    textMessage,
    key
}: TooltipComponentProps) {
    return (
        <div className="flex flex-wrap gap-2">

            <Tooltip key={key}>
                <TooltipTrigger asChild>
                    {children || (
                        <Button variant="outline">{buttonText}</Button>
                    )}
                </TooltipTrigger>
                <TooltipContent side={position}>
                    <p>{textMessage}</p>
                </TooltipContent>
            </Tooltip>

        </div>
    )
}
