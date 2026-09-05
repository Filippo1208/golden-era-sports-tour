import { sendWebsiteEmail } from "@/lib/server/email";

const MAX_REQUEST_LENGTH = 12_000;

const fieldLimits = {
  firstName: 80,
  lastName: 80,
  email: 254,
  subject: 160,
  message: 3000,
} as const;

type ContactField = keyof typeof fieldLimits;
type ContactPayload = Record<ContactField, string>;

function jsonResponse(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost?.split(",")[0]?.trim() ?? request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function validatePayload(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const payload = value as Record<string, unknown>;
  const parsed = Object.fromEntries(
    Object.entries(fieldLimits).map(([field, limit]) => {
      const fieldValue = readString(payload[field]);

      return [field, fieldValue.length <= limit ? fieldValue : ""];
    }),
  ) as ContactPayload;

  const hasMissingField = Object.values(parsed).some((field) => !field);

  if (hasMissingField || !isValidEmail(parsed.email)) {
    return null;
  }

  return parsed;
}

function buildEmailText(payload: ContactPayload) {
  return [
    "New Golden Era Sports Tour website enquiry",
    "",
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) {
    return jsonResponse({ ok: false, code: "INVALID_ORIGIN" }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse({ ok: false, code: "UNSUPPORTED_MEDIA_TYPE" }, 415);
  }

  const rawBody = await request.text();

  if (rawBody.length > MAX_REQUEST_LENGTH) {
    return jsonResponse({ ok: false, code: "PAYLOAD_TOO_LARGE" }, 413);
  }

  let value: unknown;

  try {
    value = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ ok: false, code: "INVALID_JSON" }, 400);
  }

  const rawPayload =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;

  if (rawPayload && readString(rawPayload.companyWebsite)) {
    return jsonResponse({ ok: true });
  }

  const payload = validatePayload(value);

  if (!payload) {
    return jsonResponse({ ok: false, code: "VALIDATION_ERROR" }, 422);
  }

  const delivery = await sendWebsiteEmail({
    replyTo: payload.email,
    subject: `[Golden Era Website] ${payload.subject.replace(/[\r\n]+/g, " ")}`,
    text: buildEmailText(payload),
    idempotencyKey: crypto.randomUUID(),
  });

  if (!delivery.ok) {
    const status = delivery.code === "EMAIL_NOT_CONFIGURED" ? 503 : 502;
    return jsonResponse({ ok: false, code: delivery.code }, status);
  }

  return jsonResponse({ ok: true });
}
