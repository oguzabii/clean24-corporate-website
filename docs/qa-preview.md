# Preview QA Checklist — Clean24 Corporate Website

Run through this on the Vercel Preview URL before promoting to production.
Test on a real desktop browser and a real phone (or DevTools device mode).

## Layout & navigation

- [ ] **Desktop homepage** renders: hero, Kompetenzbereiche, Leistungen,
      Branchen, Qualitätsversprechen, Verwaltungen, Ablauf, final CTA, footer.
- [ ] **Mobile homepage** renders cleanly; sections stack in order.
- [ ] **Header navigation** (Kompetenzen, Leistungen, Branchen, Verwaltungen,
      Kontakt) works from the homepage and from a subpage (e.g. `/impressum`).
- [ ] `/#leistungen` etc. scroll to the right section when clicked from a subpage.
- [ ] **Footer navigation** links all resolve (Leistungen, Branchen, Kontakt,
      Rechtliches).
- [ ] **Mobile sticky CTA** stays visible and usable; buttons are tappable.
- [ ] **No horizontal overflow** on mobile (375px) or desktop.

## CTA routing

- [ ] **Offerte anfordern** (header button, hero, Leistungen, final CTA, footer)
      → `https://formular.clean-24.ch/`.
- [ ] **Sales Engine link** actually opens `https://formular.clean-24.ch/`.
- [ ] **Kontakt aufnehmen** → `/kontakt`.
- [ ] **Leistungen entdecken** → scrolls to `/#leistungen`.
- [ ] **Anfrage für Verwaltungen senden** → opens a mail draft to
      `info@clean-24.ch` with subject "Anfrage Verwaltung / Objektbetreuung".
- [ ] **Jetzt anrufen** → dials `+41 44 516 19 23`.
- [ ] **E-Mail links** → open a draft to `info@clean-24.ch`.

## Pages

- [ ] `/kontakt` — routing page with three cards (Offerte / Verwaltungen /
      Telefonisch), direct-contact card, and the service overview.
- [ ] `/impressum` — company details incl. UID `CHE-260.909.323`.
- [ ] `/datenschutz` — states contact via e-mail/phone, offer inquiries routed
      to `formular.clean-24.ch`; **no** mention of a website contact-form backend.
- [ ] `/agb` — 14 sections; Umzugsreinigung/Abgabegarantie wording present.
- [ ] `/api/contact` returns **404** (route intentionally removed).
- [ ] `/robots.txt` and `/sitemap.xml` respond and reference `clean-24.ch`.

## Content integrity

- [ ] **No fake claims** — no invented metrics, certifications, reviews, or
      client logos anywhere.
- [ ] **Umzugsreinigung is not homepage-first** — it appears only as one of the
      twelve services, not as the primary focus.
- [ ] **Real photos load** — hero and all four Kompetenz images render (no broken
      images, no placeholders).
- [ ] **Logo display acceptable** in header and footer (not distorted).
- [ ] **Legal pages reachable** from the footer on every page.

## Technical / performance quick check

- [ ] Browser console shows **no errors** on each route.
- [ ] Favicon shows the Clean24 icon (not the default Next.js icon).
- [ ] Page titles read correctly: homepage full title; subpages "<Seite> | Clean24".
- [ ] Lighthouse (mobile) quick pass — no severe issues on Performance /
      Accessibility / SEO. (Images are optimized via `next/image`.)
- [ ] Reload each page directly by URL (deep-link) — all load without error.

## Known temporary items

- [ ] Favicon uses the wide logo on a white square (temporary). A dedicated
      square / transparent icon asset would render crisper at small sizes.
- [ ] Legal texts (Impressum, Datenschutz, AGB) are drafts — have a Swiss legal
      professional review before the production domain goes live.
