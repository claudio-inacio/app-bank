import React from "react";
import {
    Controller,
    type Control,
    type FieldError,
    type FieldValues,
    type Path,
} from "react-hook-form";

import { Input } from "../ui/input";
import { cn } from "@/shared/lib/utils";

type BaseInputTextProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name" | "type"
> & {
    id: string;
    inputLabel?: string;
    error?: FieldError;
    optionalErrorMessage?: string;
    isLoading?: boolean;
    disabled?: boolean;
    icon?: React.ElementType;
    iconClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    containerClassName?: string;
    errorClassName?: string;
    formatValueMask?: (value: string) => string | undefined;
};

type ControlledInputTextProps<T extends FieldValues> = BaseInputTextProps & {
    control: Control<T>;
    name: Path<T>;
};

type UncontrolledInputTextProps = BaseInputTextProps & {
    control?: never;
    name?: string;
};

type InputTextProps<T extends FieldValues> =
    | ControlledInputTextProps<T>
    | UncontrolledInputTextProps;

const InputText = <T extends FieldValues>({
    id,
    inputLabel,
    error,
    optionalErrorMessage,
    isLoading = false,
    disabled = false,
    icon: Icon,
    iconClassName,
    labelClassName,
    inputClassName = "pl-10",
    containerClassName,
    errorClassName,
    formatValueMask = undefined,
    placeholder,
    autoComplete,
    maxLength,
    minLength,
    ...rest
}: InputTextProps<T>) => {
    const isControlled = "control" in rest && !!rest.control;

    const commonInputProps = {
        id,
        type: "text" as const,
        placeholder,
        autoComplete,
        maxLength,
        minLength,
        disabled: isLoading || disabled,
        "aria-invalid": !!error,
        className: cn(inputClassName),
    };

    return (
        <div className={cn("space-y-2", containerClassName)}>
            {inputLabel && (

                <label
                    htmlFor={id}
                    className={cn("text-sm font-medium text-foreground", labelClassName)}
                >
                    {inputLabel}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <Icon
                        className={cn(
                            "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                            iconClassName
                        )}
                    />
                )}

                {isControlled ? (
                    <Controller
                        name={rest.name as Path<T>}
                        control={rest.control as Control<T>}
                        render={({ field }) => (
                            <Input
                                {...field}
                                {...commonInputProps}
                                value={field.value}
                                onChange={(e) => {
                                    let formatted: string | undefined | null = e.target.value;
                                    if (formatValueMask) {
                                        formatted = formatValueMask(e.target.value);
                                    }
                                    field.onChange(formatted || e.target.value);
                                }}
                            />
                        )}
                    />
                ) : (
                    <Input
                        {...rest}
                        {...commonInputProps}
                        onChange={(e) => {
                            let formatted: string | undefined | null = e.target.value;
                            if (formatValueMask) {
                                formatted = formatValueMask(e.target.value);
                            }
                            if (rest.onChange) {
                                const syntheticEvent = {
                                    ...e,
                                    target: {
                                        ...e.target,
                                        value: formatted,
                                    },
                                    currentTarget: {
                                        ...e.currentTarget,
                                        value: formatted,
                                    },
                                } as React.ChangeEvent<HTMLInputElement>;

                                rest.onChange(syntheticEvent);
                            }
                        }}
                    />
                )}
            </div>

            {error ? (
                <p
                    className={cn(
                        "text-sm font-medium text-destructive text-red-600",
                        errorClassName
                    )}
                >
                    {optionalErrorMessage ?? error.message}
                </p>
            ) : null}
        </div>
    );
};

export default InputText;