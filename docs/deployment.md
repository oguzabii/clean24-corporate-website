# Deployment — Clean24 Corporate Website

The corporate website (`clean-24.ch`) is a static Next.js 16 app. It is a
**showcase site**: it has no backend, no database, and no contact-form email
system. Offer inquiries are routed to the separate Sales Engine at
`https://formular.clean-24.ch/`.

## Architecture

- `clean-24.ch` — this repository (corporate showcase)
- `formular.clean-24.ch` — Sales Engine / lead intake / offer flow (separate project)

## Prerequisites

- The repository is pushed to GitHub.
- A Vercel account with access to that GitHub repo.

## Import into Vercel

1. Go to <https://vercel.com/new>.
2. **Import Git Repository** and select the `clean24-corporate-website` repo.
3. Vercel auto-detects the framework as **Next.js**. Leave the defaults:
   - **Framework Preset:** Next.js
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Output Directory:** (leave default — Next.js managed)
   - **Root Directory:** `./`
4. **Environment Variables:** none required. Do **not** add `RESEND_API_KEY`,
   `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, or any SMTP variables — the email
   system was intentionally removed. There is nothing to configure.
5. Click **Deploy**.

Every push creates a **Preview Deployment**; pushes to the production branch
create a **Production Deployment**.

## No email / no secrets

This project sends no email and reads no secrets. There is no `.env` file to
provide. If you ever see a build or runtime error mentioning `RESEND` or
`CONTACT_*`, it is stale — those references were removed in Phase 5–6.

## Testing the deployed preview

1. Open the Preview URL Vercel prints after the build (e.g.
   `https://clean24-corporate-website-<hash>.vercel.app`).
2. Walk through `docs/qa-preview.md`.
3. Key checks:
   - Homepage hero photo loads.
   - **Offerte anfordern** (header, hero, footer, final CTA) opens
     `https://formular.clean-24.ch/`.
   - `/kontakt`, `/impressum`, `/datenschutz`, `/agb` all load.
   - `/api/contact` returns **404** (route intentionally removed).
   - `/robots.txt` and `/sitemap.xml` respond.

## Verifying CTA links on the preview

| CTA | Expected target |
| --- | --- |
| Offerte anfordern | `https://formular.clean-24.ch/` |
| Leistungen entdecken | `/#leistungen` |
| Kontakt aufnehmen | `/kontakt` |
| Anfrage für Verwaltungen senden | `mailto:info@clean-24.ch?subject=Anfrage%20Verwaltung%20/%20Objektbetreuung` |
| Jetzt anrufen | `tel:+41445161923` |
| E-Mail-Links | `mailto:info@clean-24.ch` |

## Connecting the production domain (clean-24.ch) later

1. In the Vercel project: **Settings → Domains → Add**.
2. Add `clean-24.ch` (and optionally `www.clean-24.ch` with a redirect to the
   apex).
3. Vercel shows the required DNS records. At the domain's DNS provider:
   - Apex `clean-24.ch` → the A record Vercel provides (or `ALIAS`/`ANAME` if
     supported).
   - `www` → `CNAME` to `cname.vercel-dns.com`.
4. Keep the `formular.clean-24.ch` subdomain pointed at the Sales Engine
   project — do **not** repoint it here.
5. After DNS propagates and the SSL certificate is issued, verify the site over
   HTTPS and re-run the CTA checks.

> The site’s SEO metadata (canonical URL, Open Graph, `robots.txt`, `sitemap.xml`)
> already uses `https://clean-24.ch`, so no code change is needed when the domain
> goes live.

## Rollback

If a deployment introduces a problem:

1. Vercel project → **Deployments**.
2. Find the last known-good deployment.
3. Open its menu → **Promote to Production** (or **Rollback**).

Production instantly serves the previous build; no rebuild required.

## Vercel configuration

No `vercel.json` is included — it is not needed. Vercel auto-detects the Next.js
framework, install/build commands, and output. Add `vercel.json` only if a real
need appears later (custom headers, redirects, or region pinning).
