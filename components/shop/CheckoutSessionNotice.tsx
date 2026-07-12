"use client";

import { useSearchParams } from "next/navigation";

/**
 * Acknowledges that a Stripe session reference is PRESENT in the URL —
 * nothing more. The value is never displayed, stored or trusted client-side;
 * payment confirmation happens exclusively via the verified server webhook.
 */
export function CheckoutSessionNotice() {
  const params = useSearchParams();
  const hasSession = Boolean(params.get("session_id"));
  if (!hasSession) return null;

  return (
    <p className="mt-3 text-sm leading-6 text-navy-600">
      Eine Zahlungsreferenz wurde übermittelt. Sie wird ausschliesslich
      serverseitig geprüft — bitte betrachten Sie diese Seite nicht als
      Bestellbestätigung.
    </p>
  );
}
