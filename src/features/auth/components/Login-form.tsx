
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, ShieldUser } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/shared/components/ui/input"
import { loginSchema, type LoginFormValues } from "../schemas/login.schema"
import { LoginSubmitButton } from "./login-submit-button"
import StringMasks from "@/shared/utils/stringMasks"


type LoginFormProps = {
    isLoading: boolean;
    handleFunction: (values: LoginFormValues) => Promise<void>;
    isError: boolean;
    isSuccess: boolean;
}

export function LoginForm({
    handleFunction,
    isLoading,
    isSuccess,
}: LoginFormProps) {


    const {
        register,
        handleSubmit,
        control,        
        formState: { errors, isValid },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            document: "",
            password: "",
        },
        mode: "onSubmit",
    })

    return (
        <form
            onSubmit={handleSubmit(handleFunction)}
            className="space-y-5"
            noValidate
        >


            <div className="space-y-2">
                <label
                    htmlFor="document"
                    className="text-sm font-medium text-foreground"
                >
                    CPF
                </label>

                <div className="relative">
                    <ShieldUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Controller
                        name="document"
                        control={control}
                        render={({ field }) => (
                            <Input
                                id="document"
                                type="text"
                                placeholder="000.000.000-00"
                                autoComplete="document"
                                className="pl-10"
                                maxLength={11}
                                disabled={isLoading}
                                aria-invalid={!!errors.document}
                                value={field.value || ''}
                                onChange={(e) => {
                                    const formatted = StringMasks.formataCPF(e.target.value);
                                    field.onChange(formatted);
                                }}
                            />
                        )}
                    />
                </div>
                {errors.document ? (
                    <p className="text-sm font-medium text-destructive text-red-600">
                        {errors.document.message}
                    </p>
                ) : null}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                >
                    Senha
                </label>

                <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        autoComplete="current-password"
                        className="pl-10"
                        maxLength={6}
                        disabled={isLoading}
                        aria-invalid={!!errors.password}
                        {...register("password")}
                    />
                </div>

                {errors.password ? (
                    <p className="text-sm font-medium text-red-600">
                        {errors.password.message}
                    </p>
                ) : null}
            </div>

            <LoginSubmitButton disabled={!isValid} isLoading={isLoading} />

            {isSuccess ? (
                <p className="text-sm font-medium text-green-600">
                    Login realizado com sucesso.
                </p>
            ) : null}
        </form>
    )
}