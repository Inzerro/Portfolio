import { NextResponse } from "next/server";

import { buildContactEmail, sendContactEmail } from "@/lib/contact-mail";
import { contactFormSchema } from "@/lib/contact-schema";

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

export async function POST(request: Request) {
  const now = Date.now();
  const ip = getClientIp(request);

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

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form delivery failed:", error);

    return NextResponse.json(
      {
        error:
          "The message could not be delivered right now. Please try again later or email me directly.",
      },
      { status: 500 },
    );
  }
}
