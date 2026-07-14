import { useState, type FormEvent } from "react";

type TextFieldKey = "fullName" | "email" | "password" | "confirmPassword";
type Frequency = "daily" | "weekly" | "none";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  frequency: Frequency;
  twoFactor: boolean;
}

interface FieldRule {
  label: string;
  validate: (value: string, all: FormValues) => string | null;
}

const FIELD_RULES: Record<TextFieldKey, FieldRule> = {
  fullName: {
    label: "Full name",
    validate: (v) => {
      if (!v.trim()) return "required";
      if (v.trim().length < 2) return "too short";
      return null;
    },
  },
  email: {
    label: "Email address",
    validate: (v) => {
      if (!v.trim()) return "required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "invalid format";
      return null;
    },
  },
  password: {
    label: "Password",
    validate: (v) => {
      if (!v) return "required";
      if (v.length < 8) return "min 8 chars";
      if (!/[0-9]/.test(v)) return "needs a number";
      return null;
    },
  },
  confirmPassword: {
    label: "Confirm password",
    validate: (v, all) => {
      if (!v) return "required";
      if (v !== all.password) return "does not match";
      return null;
    },
  },
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  frequency: "weekly",
  twoFactor: false,
};

type TouchedState = Partial<Record<TextFieldKey, boolean>>;
type ErrorsState = Record<TextFieldKey, string | null>;
type Status = "saved" | null;

export default function SettingsForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<TouchedState>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const errors = Object.fromEntries(
    (Object.entries(FIELD_RULES) as [TextFieldKey, FieldRule][]).map(
      ([key, rule]) => [key, rule.validate(values[key], values)]
    )
  ) as ErrorsState;

  const hasErrors = Object.values(errors).some(Boolean);

  const setField = <K extends keyof FormValues>(key: K, val: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const blurField = (key: TextFieldKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const showError = (key: TextFieldKey): string | null | false =>
    (touched[key] || submitted) && errors[key];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched(
      Object.fromEntries(
        (Object.keys(FIELD_RULES) as TextFieldKey[]).map((k) => [k, true])
      )
    );
    if (!hasErrors) {
      setStatus("saved");
      setTimeout(() => setStatus(null), 2400);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center py-14 px-4 bg-[#14161a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .settings-root { font-family: 'Inter', sans-serif; }
        .settings-display { font-family: 'Fraunces', serif; }
        .settings-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="settings-root w-full max-w-xl bg-[#1e2128] rounded-sm border border-[#33363f] shadow-2xl"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#33363f]">
          <p className="settings-mono text-[11px] tracking-widest uppercase text-[#8b8f98] mb-2">
            account · settings
          </p>
          <h1 className="settings-display text-3xl text-[#ecead4] leading-tight">
            Terms of your account
          </h1>
          <p className="text-sm text-[#8b8f98] mt-2 leading-relaxed">
            These fields govern how you sign in and how we reach you. Amend
            them below — changes are recorded when you save.
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">
          <FormField
            id="fullName"
            rule={FIELD_RULES.fullName}
            value={values.fullName}
            error={showError("fullName")}
            onChange={(v) => setField("fullName", v)}
            onBlur={() => blurField("fullName")}
            placeholder="Jordan Ellery"
          />

          <FormField
            id="email"
            rule={FIELD_RULES.email}
            value={values.email}
            error={showError("email")}
            onChange={(v) => setField("email", v)}
            onBlur={() => blurField("email")}
            placeholder="jordan@example.com"
            type="email"
          />

          <FormField
            id="password"
            rule={FIELD_RULES.password}
            value={values.password}
            error={showError("password")}
            onChange={(v) => setField("password", v)}
            onBlur={() => blurField("password")}
            placeholder="••••••••"
            type="password"
            hint="8+ characters, at least one number"
          />

          <FormField
            id="confirmPassword"
            rule={FIELD_RULES.confirmPassword}
            value={values.confirmPassword}
            error={showError("confirmPassword")}
            onChange={(v) => setField("confirmPassword", v)}
            onBlur={() => blurField("confirmPassword")}
            placeholder="••••••••"
            type="password"
          />

          <div className="pt-2 border-t border-[#292c33]">
            <p className="settings-mono text-[11px] tracking-widest uppercase text-[#8b8f98] mb-3 mt-5">
              preferences
            </p>

            <div className="mb-5">
              <label
                htmlFor="frequency"
                className="block text-sm text-[#ecead4] mb-1.5"
              >
                Notification frequency
              </label>
              <select
                id="frequency"
                value={values.frequency}
                onChange={(e) => setField("frequency", e.target.value as Frequency)}
                className="w-full bg-[#14161a] border border-[#3a3d45] rounded-sm px-3 py-2 text-sm text-[#ecead4] focus:outline-none focus:border-[#6fcf97] transition-colors"
              >
                <option value="daily">Daily digest</option>
                <option value="weekly">Weekly digest</option>
                <option value="none">None</option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <span className="relative inline-flex h-5 w-9 items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={values.twoFactor}
                  onChange={(e: { target: { checked: boolean; }; }) => setField("twoFactor", e.target.checked)}
                />
                <span className="absolute inset-0 rounded-full bg-[#3a3d45] peer-checked:bg-[#6fcf97] transition-colors" />
                <span className="absolute h-3.5 w-3.5 left-1 top-[3px] rounded-full bg-[#ecead4] transition-transform peer-checked:translate-x-4" />
              </span>
              <span className="text-sm text-[#ecead4]">
                Require two-factor authentication
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#33363f] flex items-center justify-between">
          <div
            aria-live="polite"
            className="settings-mono text-[11px] tracking-wide text-[#6fcf97] min-h-[1em]"
          >
            {status === "saved" && "[ saved · " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " ]"}
            {submitted && hasErrors && (
              <span className="text-[#e8734a]">[ unresolved fields above ]</span>
            )}
          </div>
          <button
            type="submit"
            className="settings-mono text-xs tracking-wide uppercase bg-[#ecead4] text-[#14161a] px-5 py-2.5 rounded-sm hover:bg-[#d8d6c2] transition-colors"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

interface FormFieldProps {
  id: TextFieldKey;
  rule: FieldRule;
  value: string;
  error: string | null | false;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
  type?: "text" | "email" | "password";
  hint?: string;
}

function FormField({
  id,
  rule,
  value,
  error,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  hint,
}: FormFieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={id} className="text-sm text-[#ecead4]">
          {rule.label}
        </label>
        {error && (
          <span
            id={`${id}-error`}
            className="settings-mono text-[11px] text-[#e8734a] tracking-wide"
          >
            [{error}]
          </span>
        )}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full bg-[#14161a] border rounded-sm px-3 py-2 text-sm text-[#ecead4] placeholder-[#5a5d66] focus:outline-none transition-colors ${
          error ? "border-[#e8734a]" : "border-[#3a3d45] focus:border-[#6fcf97]"
        }`}
      />
      {hint && !error && (
        <p className="settings-mono text-[11px] text-[#5a5d66] mt-1.5">
          {hint}
        </p>
      )}
    </div>
  );
}
