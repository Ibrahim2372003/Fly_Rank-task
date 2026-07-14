import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  type?: "text" | "email";
  placeholder?: string;
}

/**
 * Reusable, fully-controlled text input wired to react-hook-form through
 * <Controller />. Renders its own label, error text, and aria attributes so
 * every field in the form gets the same accessible behavior for free.
 */
export function TextField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
}: TextFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorId = `${name}-error`;

        return (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={name}
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {label}
            </label>
            <input
              id={name}
              name={field.name}
              type={type}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              placeholder={placeholder}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? errorId : undefined}
              className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 dark:bg-slate-900 dark:text-slate-100 ${
                fieldState.error
                  ? "border-red-500 focus:ring-red-400"
                  : "border-slate-300 focus:ring-blue-400 dark:border-slate-600"
              }`}
            />
            {fieldState.error && (
              <p id={errorId} role="alert" className="text-sm text-red-600">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
