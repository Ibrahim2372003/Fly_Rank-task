import { z } from "zod";

export const settingsFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  theme: z.enum(["light", "dark"]),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export const settingsFormDefaultValues: SettingsFormValues = {
  fullName: "",
  email: "",
  theme: "light",
};
