import { anfrageOptions } from "@/data/anfrage";
import { services } from "@/data/services";

/** Server-side length limits for contact form fields. */
export const CONTACT_LIMITS = {
  name: 120,
  company: 160,
  email: 160,
  phone: 80,
  objectAddress: 240,
  message: 3000,
} as const;

/** The JSON payload the client sends to POST /api/contact. */
export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone: string;
  objectAddress?: string;
  requestType: string;
  services: string[];
  message: string;
  privacyConsent: boolean;
  /** Hidden honeypot — must stay empty for real users. */
  honeypot?: string;
}

/** Normalised, validated contact data ready for the email layer. */
export interface CleanContact {
  name: string;
  company: string;
  email: string;
  phone: string;
  objectAddress: string;
  requestType: string;
  requestLabel: string;
  serviceNames: string[];
  message: string;
}

export type ContactValidation =
  | { kind: "spam" }
  | { kind: "invalid"; error: string }
  | { kind: "valid"; data: CleanContact };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requestLabelByValue = new Map(
  anfrageOptions.map((option) => [option.value, option.label]),
);
const serviceNameBySlug = new Map(
  services.map((service) => [service.slug, service.name]),
);

const GENERIC_ERROR = "Bitte prüfen Sie Ihre Eingaben und versuchen Sie es erneut.";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validate an unknown request body into clean contact data.
 * Returns `spam` for honeypot hits, `invalid` with a user-safe message,
 * or `valid` with normalised data. Never throws.
 */
export function validateContact(raw: unknown): ContactValidation {
  if (typeof raw !== "object" || raw === null) {
    return { kind: "invalid", error: GENERIC_ERROR };
  }
  const body = raw as Record<string, unknown>;

  // Honeypot: a filled hidden field means a bot. Treat as spam.
  if (asString(body.honeypot).length > 0) {
    return { kind: "spam" };
  }

  const name = asString(body.name);
  const company = asString(body.company);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const objectAddress = asString(body.objectAddress);
  const message = asString(body.message);
  const requestType = asString(body.requestType);

  // Required fields present.
  if (!name || !email || !phone || !message || !requestType) {
    return { kind: "invalid", error: GENERIC_ERROR };
  }

  // Length limits.
  if (
    name.length > CONTACT_LIMITS.name ||
    company.length > CONTACT_LIMITS.company ||
    email.length > CONTACT_LIMITS.email ||
    phone.length > CONTACT_LIMITS.phone ||
    objectAddress.length > CONTACT_LIMITS.objectAddress ||
    message.length > CONTACT_LIMITS.message
  ) {
    return { kind: "invalid", error: GENERIC_ERROR };
  }

  // Email format.
  if (!EMAIL_RE.test(email)) {
    return {
      kind: "invalid",
      error: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
    };
  }

  // Request type must be a known value.
  const requestLabel = requestLabelByValue.get(requestType);
  if (!requestLabel) {
    return { kind: "invalid", error: GENERIC_ERROR };
  }

  // Privacy consent must be explicitly true.
  if (body.privacyConsent !== true) {
    return {
      kind: "invalid",
      error: "Bitte bestätigen Sie die Datenschutzerklärung.",
    };
  }

  // Services: keep only known slugs, map to display names, dedupe & cap.
  const rawServices = Array.isArray(body.services) ? body.services : [];
  const serviceNames: string[] = [];
  const seen = new Set<string>();
  for (const entry of rawServices) {
    const slug = asString(entry);
    const displayName = serviceNameBySlug.get(slug);
    if (displayName && !seen.has(slug)) {
      seen.add(slug);
      serviceNames.push(displayName);
    }
    if (serviceNames.length >= serviceNameBySlug.size) break;
  }

  return {
    kind: "valid",
    data: {
      name,
      company,
      email,
      phone,
      objectAddress,
      requestType,
      requestLabel,
      serviceNames,
      message,
    },
  };
}
