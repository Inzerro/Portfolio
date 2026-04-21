import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your name.")
  .max(80, "Name is too long.");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Please enter your email.")
  .email("Please enter a valid email address.")
  .max(120, "Email is too long.");

const messageSchema = z
  .string()
  .trim()
  .min(10, "Please add a bit more detail to your message.")
  .max(2000, "Message is too long.");

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
  website: z.string().trim().max(0).optional().default(""),
  formStartedAt: z
    .number({
      invalid_type_error: "Invalid submission timestamp.",
      required_error: "Missing submission timestamp.",
    })
    .int()
    .nonnegative(),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

export function getContactFieldErrors(input: ContactFormInput) {
  const result = contactFormSchema.safeParse(input);

  if (result.success) {
    return {};
  }

  const fieldErrors = result.error.flatten().fieldErrors;

  return {
    name: fieldErrors.name?.[0],
    email: fieldErrors.email?.[0],
    message: fieldErrors.message?.[0],
  };
}
