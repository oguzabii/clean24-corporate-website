import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { sendContactEmail, EmailConfigError } from "@/lib/email";

/** Generic, user-safe error copy — details are only logged server-side. */
const SEND_FAILED =
  "Ihre Anfrage konnte derzeit nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const result = validateContact(body);

  // Honeypot hit: accept silently without sending so bots get no signal.
  if (result.kind === "spam") {
    console.warn("[contact] Spam submission blocked (honeypot).");
    return NextResponse.json({ ok: true });
  }

  if (result.kind === "invalid") {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Detailed diagnostics stay on the server; the client sees a generic error.
    console.error("[contact] Failed to send contact email:", error);

    if (error instanceof EmailConfigError) {
      const message =
        process.env.NODE_ENV === "production"
          ? SEND_FAILED
          : `E-Mail-Versand ist nicht konfiguriert (${error.message}). Bitte RESEND_API_KEY und CONTACT_FROM_EMAIL in .env.local setzen.`;
      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }

    return NextResponse.json({ ok: false, error: SEND_FAILED }, { status: 502 });
  }
}
