"use client";

import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContactFieldErrors, type ContactFormInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const CONTACTS = [
  {
    label: "Email",
    value: "Indrovichgit@gmail.com",
    href: "mailto:Indrovichgit@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/Inzerro",
    href: "https://github.com/Inzerro",
  },
  {
    label: "Telegram",
    value: "@Turdugulov_Temirlan",
    href: "https://t.me/Turdugulov_Temirlan",
  },
  {
    label: "WhatsApp",
    value: "+996 999 99 87 66",
    href: "https://wa.me/996999998766",
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
  website: "",
};

type FormFields = typeof INITIAL_FORM;
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type SubmitResult = {
  error?: string;
  fieldErrors?: FieldErrors;
  delivery?: "storage" | "email" | "email+storage";
  submissionId?: string;
};

function hasFieldErrors(errors: FieldErrors) {
  return Object.values(errors).some(Boolean);
}

export function Contact() {
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());

  const getPayload = (nextForm: FormFields): ContactFormInput => ({
    ...nextForm,
    formStartedAt,
  });

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFieldErrors({});
    setSubmitError(null);
    setSubmitSuccess(null);
    setStatus("idle");
    setFormStartedAt(Date.now());
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));

    if (submitError) {
      setSubmitError(null);
    }

    if (submitSuccess) {
      setSubmitSuccess(null);
    }

    if (status === "error") {
      setStatus("idle");
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "website") {
      return;
    }

    const nextForm = { ...form, [name]: value };
    const errors = getContactFieldErrors(getPayload(nextForm));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: errors[name as FieldName],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "sending") {
      return;
    }

    const payload = getPayload(form);
    const errors = getContactFieldErrors(payload);

    if (hasFieldErrors(errors)) {
      setFieldErrors(errors);
      setStatus("error");
      setSubmitError("Please fix the highlighted fields and try again.");
      setSubmitSuccess(null);
      return;
    }

    setStatus("sending");
    setSubmitError(null);
    setSubmitSuccess(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as SubmitResult | null;

      if (!response.ok) {
        if (result?.fieldErrors) {
          setFieldErrors((prev) => ({ ...prev, ...result.fieldErrors }));
        }

        setStatus("error");
        setSubmitError(
          result?.error ||
            "The message could not be sent. Please try again in a moment.",
        );
        return;
      }

      setStatus("sent");
      setForm(INITIAL_FORM);
      setFieldErrors({});
      setSubmitError(null);
      setSubmitSuccess(
        result?.delivery === "email+storage"
          ? "Feedback sent successfully. It was saved and emailed."
          : result?.delivery === "email"
            ? "Feedback sent successfully. It was emailed."
          : "Feedback sent successfully. It was saved for follow-up.",
      );
      setFormStartedAt(Date.now());
    } catch {
      setStatus("error");
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    }
  };

  const fieldClassName = (field: FieldName) =>
    cn(fieldErrors[field] && "border-red-500/70 focus-visible:border-red-500");

  return (
    <section
      id="contact"
      className="page-shell section-shell"
      aria-labelledby="contact-heading"
    >
      <div className="section-header">
        <div className="h-1.5 w-1.5 shrink-0 bg-blue" />
        <span className="section-kicker">04 / Contact</span>
        <div className="section-divider" />
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-24">
        <div>
          <h2 id="contact-heading" className="section-title mb-4 md:mb-6">
            {"Let's build something"}
            <br />
            <span className="text-blue">great together.</span>
          </h2>
          <p className="section-copy mb-8 md:mb-12">
            {
              "I'm open to freelance projects, full-time roles, and interesting collabs. If you have something in mind — I'd love to hear it."
            }
          </p>

          <div className="surface-panel overflow-hidden">
            {CONTACTS.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                className="interactive-row group touch-manipulation"
                aria-label={`${label}: ${value}`}
              >
                <span className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </span>
                <span className="motion-soft ml-4 truncate text-right font-sans text-xs font-semibold text-foreground group-hover:text-blue">
                  {value}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div>
          {status === "sent" ? (
            <div className="surface-panel flex min-h-[320px] flex-col items-start justify-center gap-4 p-6 md:p-8">
              <div className="h-px w-10 bg-blue" />
              <p className="text-2xl font-black text-foreground">
                Message received.
              </p>
              <p className="section-copy max-w-md md:text-sm">
                {submitSuccess ||
                  "Thanks for reaching out — I'll get back to you shortly."}
              </p>
              <Button
                onClick={resetForm}
                type="button"
                variant="ghost"
                className="mt-2 h-auto px-0 text-blue hover:bg-transparent hover:text-blue-dim"
              >
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="surface-panel space-y-4 p-5 md:p-6">
              <div className="absolute top-auto left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="field-note block">
                  Your name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClassName("name")}
                  autoComplete="name"
                  maxLength={80}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                />
                {fieldErrors.name && (
                  <p id="contact-name-error" className="text-[11px] font-medium text-red-400">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="field-note block">
                  Your email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClassName("email")}
                  autoComplete="email"
                  inputMode="email"
                  maxLength={120}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="contact-email-error" className="text-[11px] font-medium text-red-400">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="field-note block">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn("resize-none", fieldClassName("message"))}
                  maxLength={2000}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={
                    fieldErrors.message ? "contact-message-error" : undefined
                  }
                />
                {fieldErrors.message && (
                  <p
                    id="contact-message-error"
                    className="text-[11px] font-medium text-red-400"
                  >
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {submitError && (
                <Alert variant="destructive">
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={status === "sending"}
                loadingText="Sending..."
                className="w-full"
              >
                Send Message
              </Button>

              <p className="pt-1 text-center font-sans text-[10px] text-muted-foreground">
                No spam. I typically reply within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
