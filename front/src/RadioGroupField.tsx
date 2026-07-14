import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  legend: string;
  options: RadioOption[];
}

/**
 * Reusable, fully-controlled radio group wired to react-hook-form through
 * <Controller />. Uses a <fieldset>/<legend> pair so screen readers announce
 * the group's purpose, and each option gets its own explicit <label htmlFor>.
 */
export function RadioGroupField<TFieldValues extends FieldValues>({
  name,
  control,
  legend,
  options,
}: RadioGroupFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <fieldset className="flex flex-col gap-1.5">
          <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {legend}
          </legend>
          <div className="flex flex-wrap gap-4">
            {options.map((option) => {
              const optionId = `${name}-${option.value}`;
              return (
                <label
                  key={option.value}
                  htmlFor={optionId}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-200"
                >
                  <input
                    id={optionId}
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className="h-4 w-4 border-slate-300 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
          {fieldState.error && (
            <p role="alert" className="text-sm text-red-600">
              {fieldState.error.message}
            </p>
          )}
        </fieldset>
      )}
    />
  );
}
