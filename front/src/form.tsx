import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsFormSchema,
  settingsFormDefaultValues,
  type SettingsFormValues,
} from "./schema";
import { TextField } from "./TextField";
import { RadioGroupField } from "./RadioGroupField";

interface SettingsFormProps {
  /** Called with the parsed, valid values once the form passes validation. */
  onSubmit?: (values: SettingsFormValues) => void;
}

export default function SettingsForm({ onSubmit }: SettingsFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: settingsFormDefaultValues,
    mode: "onBlur",
  });

  const submitHandler = (values: SettingsFormValues) => {
    onSubmit?.(values);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      noValidate
      className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Account settings
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update your profile and appearance preferences.
        </p>
      </div>

      <TextField
        name="fullName"
        control={control}
        label="Full Name"
        placeholder="Jordan Ellery"
      />

      <TextField
        name="email"
        control={control}
        label="Email"
        type="email"
        placeholder="jordan@example.com"
      />

      <RadioGroupField
        name="theme"
        control={control}
        legend="Theme"
        options={[
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
        ]}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start"
      >
        Save changes
      </button>

      {isSubmitSuccessful && (
        <p role="status" className="text-sm text-green-600">
          Settings saved.
        </p>
      )}
    </form>
  );
}
