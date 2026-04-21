type SendContactEmailArgs = {
  fromEmail: string;
  toEmail: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildContactEmail(args: {
  name: string;
  email: string;
  message: string;
}) {
  const safeName = escapeHtml(args.name);
  const safeEmail = escapeHtml(args.email);
  const safeMessage = escapeHtml(args.message).replace(/\n/g, "<br />");

  return {
    subject: `New portfolio message from ${args.name}`,
    text: `New contact form submission\n\nName: ${args.name}\nEmail: ${args.email}\n\nMessage:\n${args.message}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin: 0 0 16px;"><strong>Email:</strong> ${safeEmail}</p>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; background: #f9fafb;">
          <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
          <p style="margin: 0;">${safeMessage}</p>
        </div>
      </div>
    `,
  };
}

export async function sendContactEmail({
  fromEmail,
  toEmail,
  replyTo,
  subject,
  text,
  html,
}: SendContactEmailArgs) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${errorText}`);
  }

  return response.json();
}
