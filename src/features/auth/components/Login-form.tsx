
import { zodResolver } from "@hookform/resolvers/zod"
import { ShieldUser } from "lucide-react"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginFormValues } from "../schemas/login.schema"
import { LoginSubmitButton } from "./login-submit-button"
import StringMasks from "@/shared/utils/StringMasks"
import InputText from "@/shared/components/inputs/text-input"
import InputPassword from "@/shared/components/inputs/password-input"

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

            <InputText
                autoComplete="document"
                control={control}
                error={errors.document}
                id="document"
                inputLabel="CPF"
                isLoading={isLoading}
                name="document"
                placeholder="000.000.000-00"
                icon={ShieldUser}
                formatValueMask={StringMasks.formataCPF}
                maxLength={14}
                minLength={16}
            />
            <InputPassword
                control={control}
                name="password"
                id="password"
                label="Senha"
                placeholder="Digite sua senha"
                error={errors.password}
                isLoading={isLoading}
                maxLength={6}
            />

            <LoginSubmitButton disabled={!isValid} isLoading={isLoading} />

            {isSuccess ? (
                <p className="text-sm font-medium text-green-600">
                    Login realizado com sucesso.
                </p>
            ) : null}
        </form>
    )
}