import {
  clothingSizes,
  genderOptions,
  joinApplicationEvents,
  playingHandOptions,
  referralSourceOptions,
  tennisLevelOptions,
} from "@/data/join";
import { routing } from "@/i18n/routing";
import { sendWebsiteEmail } from "@/lib/server/email";
import { checkRateLimit } from "@/lib/server/rate-limit";

const MAX_REQUEST_LENGTH = 20_000;
const APPLICATION_LIMIT = 6;
const APPLICATION_WINDOW_MS = 10 * 60 * 1000;

const fieldLimits = {
  firstName: 80,
  lastName: 80,
  gender: 20,
  email: 254,
  phone: 60,
  country: 120,
  tennisLevel: 60,
  clubBackground: 1000,
  playingHand: 30,
  tshirtSize: 10,
  bottomSize: 10,
  eventSlug: 80,
  referralSource: 60,
  message: 3000,
  locale: 5,
  submissionId: 80,
} as const;

type JoinPayload = {
  [Field in keyof typeof fieldLimits]: string;
} & {
  privacyConsent: true;
};

function jsonResponse(body: object, status = 200, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readLimitedString(
  payload: Record<string, unknown>,
  field: keyof typeof fieldLimits,
) {
  const value = readString(payload[field]);
  return value.length <= fieldLimits[field] ? value : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidSubmissionId(submissionId: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    submissionId,
  );
}

function isAllowedOption(value: string, options: readonly string[]) {
  return options.includes(value);
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

  const rawPayload = value as Record<string, unknown>;
  const payload = Object.fromEntries(
    Object.keys(fieldLimits).map((field) => [
      field,
      readLimitedString(rawPayload, field as keyof typeof fieldLimits),
    ]),
  ) as Omit<JoinPayload, "privacyConsent">;

  const requiredFields: Array<keyof typeof fieldLimits> = [
    "firstName",
    "lastName",
    "gender",
    "email",
    "phone",
    "country",
    "tennisLevel",
    "tshirtSize",
    "bottomSize",
    "eventSlug",
    "locale",
    "submissionId",
  ];

  if (requiredFields.some((field) => !payload[field])) {
    return null;
  }

  if (
    !isValidEmail(payload.email) ||
    !isValidSubmissionId(payload.submissionId) ||
    !isAllowedOption(payload.gender, genderOptions) ||
    !isAllowedOption(payload.tennisLevel, tennisLevelOptions) ||
    (payload.playingHand &&
      !isAllowedOption(payload.playingHand, playingHandOptions)) ||
    !isAllowedOption(payload.tshirtSize, clothingSizes) ||
    !isAllowedOption(payload.bottomSize, clothingSizes) ||
    (payload.referralSource &&
      !isAllowedOption(payload.referralSource, referralSourceOptions)) ||
    !isAllowedOption(payload.locale, routing.locales) ||
    rawPayload.privacyConsent !== true
  ) {
    return null;
  }

  const selectedEvent = joinApplicationEvents.find(
    (event) => event.slug === payload.eventSlug,
  );

  if (!selectedEvent) {
    return null;
  }

  return {
    ...payload,
    privacyConsent: true as const,
    selectedEvent,
  };
}

const emailLabels = {
  gender: {
    male: "Male",
    female: "Female",
  },
  tennisLevel: {
    recreational: "Recreational",
    intermediate: "Intermediate",
    advancedAmateur: "Advanced amateur",
    competitiveAmateur: "Competitive amateur",
    formerCompetitivePlayer: "Former competitive player",
  },
  playingHand: {
    rightHanded: "Right-handed",
    leftHanded: "Left-handed",
  },
  referralSource: {
    instagram: "Instagram",
    friendInvitation: "Friend / invitation",
    tennisClub: "Tennis club",
    event: "Event",
    pressMedia: "Press / media",
    googleWebSearch: "Google / web search",
    other: "Other",
  },
} as const;

function optionalValue(value: string) {
  return value || "Not provided";
}

function getMappedLabel(
  group: Record<string, string>,
  value: string,
) {
  return group[value] ?? optionalValue(value);
}

function buildEmailText(payload: NonNullable<ReturnType<typeof validatePayload>>) {
  const timestamp = new Date().toISOString();

  return [
    "NEW GOLDEN ERA SPORTS TOUR APPLICATION",
    "",
    "PERSONAL DETAILS",
    "",
    "First name:",
    payload.firstName,
    "",
    "Last name:",
    payload.lastName,
    "",
    "Gender:",
    getMappedLabel(emailLabels.gender, payload.gender),
    "",
    "Email:",
    payload.email,
    "",
    "Phone / WhatsApp:",
    payload.phone,
    "",
    "Country:",
    payload.country,
    "",
    "TENNIS PROFILE",
    "",
    "Tennis level:",
    getMappedLabel(emailLabels.tennisLevel, payload.tennisLevel),
    "",
    "Club / tennis background:",
    optionalValue(payload.clubBackground),
    "",
    "Playing hand:",
    getMappedLabel(emailLabels.playingHand, payload.playingHand),
    "",
    "PLAYER KIT",
    "",
    "T-shirt size:",
    payload.tshirtSize,
    "",
    "Shorts / Pants size:",
    payload.bottomSize,
    "",
    "EVENT",
    "",
    "Selected event:",
    payload.selectedEvent.city,
    "",
    "ADDITIONAL INFORMATION",
    "",
    "How they heard about Golden Era:",
    getMappedLabel(emailLabels.referralSource, payload.referralSource),
    "",
    "Message:",
    optionalValue(payload.message),
    "",
    "SYSTEM INFORMATION",
    "",
    "Website language:",
    payload.locale.toUpperCase(),
    "",
    "Submission timestamp:",
    timestamp,
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

  const rateLimit = checkRateLimit({
    request,
    namespace: "join-application",
    limit: APPLICATION_LIMIT,
    windowMs: APPLICATION_WINDOW_MS,
  });

  if (!rateLimit.allowed) {
    return jsonResponse(
      { ok: false, code: "RATE_LIMITED" },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  const delivery = await sendWebsiteEmail({
    replyTo: payload.email,
    subject: `New Tour Application — ${payload.firstName} ${payload.lastName} — ${payload.selectedEvent.city}`,
    text: buildEmailText(payload),
    idempotencyKey: `join-${payload.submissionId}`,
  });

  if (!delivery.ok) {
    const status = delivery.code === "EMAIL_NOT_CONFIGURED" ? 503 : 502;
    return jsonResponse({ ok: false, code: delivery.code }, status);
  }

  return jsonResponse({ ok: true });
}
