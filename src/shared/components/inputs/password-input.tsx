import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Input } from "../ui/input";
import { cn } from "@/shared/lib/utils";

interface InputPasswordProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  id: string;
  label: string;
  placeholder: string;
  error?: FieldError;
  isLoading?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  actionIconClassName?: string;
  errorClassName?: string;
}

const InputPassword = <T extends FieldValues>({
  control,
  name,
  id,
  label,
  placeholder,
  error,
  isLoading = false,
  disabled = false,
  autoComplete = "current-password",
  maxLength,
  minLength,
  containerClassName,
  labelClassName,
  inputClassName,
  iconClassName,
  actionIconClassName,
  errorClassName,
}: InputPasswordProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <label
        htmlFor={id}
        className={cn("text-sm font-medium text-foreground", labelClassName)}
      >
        {label}
      </label>

      <div className="relative">
        <Lock
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
            iconClassName
          )}
        />

        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              {...field}
              id={id}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className={cn("pl-10 pr-10", inputClassName)}
              maxLength={maxLength}
              minLength={minLength}
              disabled={isLoading || disabled}
              aria-invalid={!!error}
              value={field.value ?? ""}
            />
          )}
        />

        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          disabled={isLoading || disabled}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? (
            <Eye
              className={cn(
                "h-4 w-4 cursor-pointer text-muted-foreground",
                actionIconClassName
              )}
            />
          ) : (
            <EyeOff
              className={cn(
                "h-4 w-4 cursor-pointer text-muted-foreground",
                actionIconClassName
              )}
            />
          )}
        </button>
      </div>

      {error ? (
        <p
          className={cn(
            "text-sm font-medium text-destructive text-red-600",
            errorClassName
          )}
        >
          {error.message}
        </p>
      ) : null}
    </div>
  );
};

export default InputPassword;