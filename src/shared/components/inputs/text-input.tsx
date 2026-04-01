import { Controller, type Control, type FieldError, type FieldValues, type Path } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/shared/lib/utils";

interface InputTextProps<T extends FieldValues>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
    isLoading?: boolean;
    disabled?: boolean;
    icon?: React.ElementType;
    iconClassName?: string;
    labelClassName?: string;
    inputLabel: string;
    error?: FieldError,
    optionalErrorMessage?: string,
    formatValueMask?: (value: string) => string;
    control: Control<T>;
    id: string;
    name: Path<T>;
    placeholder: string;
    autoComplete: string;
    inputClassName?: string;
    divContainerClassName?: string;
    errorClassName?: string;
    maxLength?: number;
    minLength?: number;
}

const InputText = <T extends FieldValues>({
    isLoading,
    disabled,
    icon: Icon,
    iconClassName,
    labelClassName,
    inputLabel,
    error,
    optionalErrorMessage,
    formatValueMask = (value) => value,
    control,
    id,
    name,
    placeholder,
    autoComplete,
    inputClassName = "pl-10",
    errorClassName,
    maxLength,
    minLength,
    divContainerClassName,
    ...rest
}: InputTextProps<T>) => {
    return (
        <div
            className={cn(
                "space-y-2",
                divContainerClassName
            )}
        >
            <label
                htmlFor={id}
                className={cn(
                    "text-sm font-medium text-foreground",
                    labelClassName)}
            >
                {inputLabel}
            </label>

            <div className="relative">
                {Icon && (

                    <Icon
                        className={cn("pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground", iconClassName)}
                    />
                )}
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            {...rest}
                            id={id}
                            type="text"
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            className={cn("", inputClassName)}
                            maxLength={maxLength}
                            minLength={minLength}
                            disabled={!!isLoading || !!disabled}
                            aria-invalid={!!error}
                            value={field.value ?? ''}
                            onChange={(e) => {
                                const formatted = formatValueMask(e.target.value)
                                field.onChange(formatted);
                            }}
                        />
                    )}
                />
            </div>
            {error ? (
                <p className={cn("text-sm font-medium text-destructive text-red-600", errorClassName)}>
                    {optionalErrorMessage ?? error.message}
                </p>
            ) : null}
        </div>
    );
};

export default InputText;