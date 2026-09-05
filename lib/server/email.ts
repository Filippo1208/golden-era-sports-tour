import "server-only";

import { contactDetails } from "@/data/contact";

type WebsiteEmailInput = {
  subject: string;
  text: string;
  replyTo: string;
  idempotencyKey: string;
};

export type EmailDeliveryResult =
  | { ok: true }
  | { ok: false; code: "EMAIL_NOT_CONFIGURED" | "EMAIL_DELIVERY_FAILED" };

export async function sendWebsiteEmail({
  subject,
  text,
  replyTo,
  idempotencyKey,
}: WebsiteEmailInput): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim() || contactDetails.email;

  if (!apiKey || !from) {
    return { ok: false, code: "EMAIL_NOT_CONFIGURED" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Website email delivery failed", response.status);
      return { ok: false, code: "EMAIL_DELIVERY_FAILED" };
    }

    return { ok: true };
  } catch {
    console.error("Website email delivery failed before receiving a response");
    return { ok: false, code: "EMAIL_DELIVERY_FAILED" };
  }
}
