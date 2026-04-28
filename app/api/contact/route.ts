import { NextResponse } from "next/server";

import { buildContactEmail, sendContactEmail } from "@/lib/contact-mail";
import { contactFormSchema } from "@/lib/contact-schema";
import { storeContactSubmission } from "@/lib/contact-storage";

const MIN_SUBMIT_DELAY_MS = 1500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const submissionsByIp = new Map<string, number[]>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function getUserAgent(request: Request) {
  return request.headers.get("user-agent") || "unknown";
}

function isRateLimited(ip: string, now: number) {
  const attempts = submissionsByIp.get(ip) || [];
  const recentAttempts = attempts.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentAttempts.length >= MAX_REQUESTS_PER_WINDOW) {
    submissionsByIp.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  submissionsByIp.set(ip, recentAttempts);

  return false;
}

function getMailConfig() {
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!toEmail || !fromEmail) {
    throw new Error("Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.");
  }

  return { toEmail, fromEmail };
}

function hasMailConfig() {
  return Boolean(process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

export async function POST(request: Request) {
  const now = Date.now();
  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);

  if (isRateLimited(ip, now)) {
    return NextResponse.json(
      {
        error:
          "Too many attempts right now. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Unsupported request format." },
      { status: 415 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return NextResponse.json(
      {
        error: "Please check the form fields and try again.",
        fieldErrors: {
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          message: fieldErrors.message?.[0],
        },
      },
      { status: 400 },
    );
  }

  const { website, formStartedAt, name, email, message } = parsed.data;

  if (website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (now - formStartedAt < MIN_SUBMIT_DELAY_MS) {
    return NextResponse.json(
      {
        error:
          "Your message was submitted too quickly. Please review it and try again.",
      },
      { status: 400 },
    );
  }

  const submission = {
    id: crypto.randomUUID(),
    createdAt: new Date(now).toISOString(),
    ip,
    userAgent,
    name,
    email,
    message,
  };

  let stored = false;
  let emailed = false;

  try {
    await storeContactSubmission(submission);
    stored = true;
  } catch (error) {
    console.error("Contact form storage failed:", error);
  }

  if (hasMailConfig()) {
    try {
      const { fromEmail, toEmail } = getMailConfig();
      const emailContent = buildContactEmail({ name, email, message });

      await sendContactEmail({
        fromEmail,
        toEmail,
        replyTo: email,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      });

      emailed = true;
    } catch (error) {
      console.error("Contact form email delivery failed:", error);
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      {
        error:
          "The message could not be delivered right now. Please try again later or contact me directly by email or Telegram.",
      },
      { status: 500 },
    );
  }

  const delivery = stored && emailed ? "email+storage" : emailed ? "email" : "storage";

  return NextResponse.json(
    {
      ok: true,
      delivery,
      submissionId: submission.id,
    },
    { status: 200 },
  );
}
