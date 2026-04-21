"use client";

import { useState } from "react";

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
    value: "github.com/enzerro",
    href: "https://github.com/enzerro",
  },
  {
    label: "Telegram",
    value: "@TurdugulovTurdugulov",
    href: "https://t.me/TurdugulovTurdugulov",
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
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());

  const getPayload = (nextForm: FormFields): ContactFormInput => ({
    ...nextForm,
    formStartedAt,
  });

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFieldErrors({});
    setSubmitError(null);
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
      return;
    }

    setStatus("sending");
    setSubmitError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            error?: string;
            fieldErrors?: FieldErrors;
          }
        | null;

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
      setFormStartedAt(Date.now());
    } catch {
      setStatus("error");
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    }
  };

  const inputBase =
    "w-full bg-surface-1 border border-border px-4 py-4 md:py-3.5 text-[15px] md:text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue transition-colors duration-200 font-sans";

  const fieldClassName = (field: FieldName) =>
    cn(
      inputBase,
      fieldErrors[field] &&
        "border-red-500/70 focus:border-red-500 aria-invalid:border-red-500",
    );

  return (
    <section
      id="contact"
      className="py-20 md:py-36 px-5 md:px-12 max-w-6xl mx-auto"
      aria-labelledby="contact-heading"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-10 md:mb-16">
        <div className="w-1.5 h-1.5 bg-blue flex-shrink-0" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-blue uppercase font-sans">
          04 / Contact
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-24">
        {/* Left */}
        <div>
          <h2
            id="contact-heading"
            className="text-[clamp(1.7rem,6vw,2.5rem)] md:text-4xl font-black tracking-tight text-foreground text-balance leading-tight mb-4 md:mb-6"
          >
            {"Let's build something"}
            <br />
            <span className="text-blue">great together.</span>
          </h2>
          <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed mb-8 md:mb-12 font-light text-pretty">
            {
              "I'm open to freelance projects, full-time roles, and interesting collabs. If you have something in mind — I'd love to hear it."
            }
          </p>

          <div className="border border-border divide-y divide-border">
            {CONTACTS.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                className="flex justify-between items-center px-5 md:px-6 py-4 md:py-4 hover:bg-surface-1 active:bg-surface-1 transition-colors duration-150 group min-h-[56px] touch-manipulation"
                aria-label={`${label}: ${value}`}
              >
                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase font-sans flex-shrink-0">
                  {label}
                </span>
                <span className="text-xs font-semibold text-foreground group-hover:text-blue transition-colors duration-150 font-sans text-right ml-4 truncate">
                  {value}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {status === "sent" ? (
            <div className="flex flex-col items-start justify-center h-full min-h-[280px] gap-4">
              <div className="w-10 h-px bg-blue" />
              <p className="text-2xl font-black text-foreground">
                Message received.
              </p>
              <p className="text-[15px] md:text-sm text-muted-foreground font-light leading-relaxed">
                {"Thanks for reaching out — I'll get back to you shortly."}
              </p>
              <button
                onClick={resetForm}
                className="mt-4 text-xs font-bold tracking-[0.2em] uppercase text-blue hover:text-blue-dim transition-colors font-sans touch-manipulation"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
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

              <div>
                <label htmlFor="name" className="sr-only">
                  Your name
                </label>
                <input
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
                  <p
                    id="contact-name-error"
                    className="mt-2 text-[11px] font-medium text-red-400"
                  >
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
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
                  <p
                    id="contact-email-error"
                    className="mt-2 text-[11px] font-medium text-red-400"
                  >
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(fieldClassName("message"), "resize-none")}
                  maxLength={2000}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={
                    fieldErrors.message ? "contact-message-error" : undefined
                  }
                />
                {fieldErrors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-2 text-[11px] font-medium text-red-400"
                  >
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div
                  className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-[12px] font-medium text-red-300"
                  role="alert"
                  aria-live="polite"
                >
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 md:py-4 bg-blue text-white font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-blue-dim active:bg-blue-dim transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-manipulation min-h-[56px]"
              >
                {status === "sending" ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="text-[10px] text-muted-foreground text-center font-sans pt-1">
                No spam. I typically reply within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
