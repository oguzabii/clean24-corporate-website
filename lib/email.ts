import type { CleanContact } from "./contact";
import { contact } from "@/data/contact";

/** Thrown when the email provider is not configured. Handled by the route. */
export class EmailConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailConfigError";
  }
}

/** Thrown when the email provider rejects or fails the request. */
export class EmailSendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailSendError";
  }
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatTimestamp(date: Date): string {
  return date.toLocaleString("de-CH", {
    timeZone: "Europe/Zurich",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

interface EmailBodies {
  subject: string;
  text: string;
  html: string;
}

/** Build the German notification email for a submitted contact request. */
export function buildContactEmail(data: CleanContact, submittedAt: Date): EmailBodies {
  const subject = `Neue Website-Anfrage: ${data.requestLabel}`;
  const timestamp = formatTimestamp(submittedAt);
  const services =
    data.serviceNames.length > 0 ? data.serviceNames.join(", ") : "—";

  const rows: [string, string][] = [
    ["Anfrageart", data.requestLabel],
    ["Name", data.name],
    ["Firma / Verwaltung", data.company || "—"],
    ["E-Mail", data.email],
    ["Telefon", data.phone],
    ["Objektadresse", data.objectAddress || "—"],
    ["Gewählte Leistungen", services],
    ["Nachricht", data.message],
    ["Eingegangen am", timestamp],
    ["Quelle", "Clean24 Website Kontaktformular"],
  ];

  const text = rows
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n");

  const htmlRows = rows
    .map(([label, value]) => {
      const safeValue = escapeHtml(value).replace(/\n/g, "<br>");
      return `<tr>
        <td style="padding:8px 16px 8px 0;vertical-align:top;color:#335a8e;font-weight:600;white-space:nowrap;">${escapeHtml(
          label,
        )}</td>
        <td style="padding:8px 0;vertical-align:top;color:#0c1d33;">${safeValue}</td>
      </tr>`;
    })
    .join("");

  const html = `<!doctype html>
<html lang="de">
  <body style="margin:0;background:#f4f7fb;padding:24px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d8e3f0;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:#0c1d33;padding:20px 24px;">
          <div style="color:#ffffff;font-size:18px;font-weight:700;">Clean24 — Neue Website-Anfrage</div>
          <div style="color:#84a1c9;font-size:13px;margin-top:4px;">${escapeHtml(
            data.requestLabel,
          )}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;">
            ${htmlRows}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}

/**
 * Send a contact request notification to Clean24 via Resend's REST API.
 *
 * Reads configuration from environment variables:
 *  - RESEND_API_KEY (required)
 *  - CONTACT_FROM_EMAIL (required — must be a verified sender)
 *  - CONTACT_TO_EMAIL (optional — defaults to the company address)
 *
 * Throws EmailConfigError when unconfigured and EmailSendError on failure.
 * Never returns a fake success.
 */
export async function sendContactEmail(data: CleanContact): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || contact.email;

  if (!apiKey || !from) {
    const missing = [
      !apiKey && "RESEND_API_KEY",
      !from && "CONTACT_FROM_EMAIL",
    ]
      .filter(Boolean)
      .join(", ");
    throw new EmailConfigError(`Missing email configuration: ${missing}`);
  }

  const { subject, text, html } = buildContactEmail(data, new Date());

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new EmailSendError(
      `Resend responded ${response.status}: ${detail.slice(0, 500)}`,
    );
  }
}
