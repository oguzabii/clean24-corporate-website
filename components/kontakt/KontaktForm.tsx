"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { anfrageOptions } from "@/data/anfrage";
import { services } from "@/data/services";
import { contact } from "@/data/contact";

const inputClass =
  "w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 transition-colors focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40";
const labelClass = "block text-sm font-medium text-navy-800";

/**
 * UI-only contact form. Backend submission is intentionally not wired yet —
 * on submit we prevent default and show a prepared-state confirmation. The
 * request type can be preselected via the `?anfrage=` query parameter.
 */
export function KontaktForm({ defaultAnfrage }: { defaultAnfrage: string }) {
  const [anfrageart, setAnfrageart] = useState(defaultAnfrage);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleService(slug: string) {
    setSelectedServices((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // No backend yet: prepare locally and confirm. Do not attempt to send.
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-8 sm:p-10">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-500 text-white">
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 10.5 8 14l8-9" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy-900">
          Vielen Dank für Ihre Anfrage.
        </h3>
        <p className="mt-3 text-[0.95rem] leading-7 text-navy-600">
          Ihre Anfrage wurde vorbereitet. Die technische Übermittlung wird im
          nächsten Schritt angebunden. Für dringende Anliegen erreichen Sie uns
          direkt:
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href={contact.phoneHref} variant="outline" size="md">
            {contact.phone}
          </Button>
          <Button href={contact.emailHref} variant="outline" size="md">
            {contact.email}
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-navy-800 underline-offset-4 hover:text-teal-600 hover:underline"
        >
          Weitere Anfrage erfassen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Quick request-type selection */}
      <fieldset>
        <legend className="text-sm font-medium text-navy-800">
          Ihr Anliegen
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {anfrageOptions.map((option) => {
            const active = option.value === anfrageart;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setAnfrageart(option.value)}
                aria-pressed={active}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  active
                    ? "border-teal-400 bg-teal-50/70 ring-1 ring-teal-400"
                    : "border-navy-100 bg-white hover:border-teal-300"
                }`}
              >
                <span className="block text-sm font-semibold text-navy-900">
                  {option.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-navy-500">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Vor- und Nachname"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="firma" className={labelClass}>
            Firma / Verwaltung{" "}
            <span className="font-normal text-navy-400">(optional)</span>
          </label>
          <input
            id="firma"
            name="firma"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Unternehmen oder Verwaltung"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="name@beispiel.ch"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="telefon" className={labelClass}>
            Telefon
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
            placeholder="+41 …"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="objekt" className={labelClass}>
            Objektadresse{" "}
            <span className="font-normal text-navy-400">(optional)</span>
          </label>
          <input
            id="objekt"
            name="objekt"
            type="text"
            autoComplete="street-address"
            className={inputClass}
            placeholder="Strasse, PLZ, Ort des Objekts"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="anfrageart" className={labelClass}>
            Anfrageart
          </label>
          <select
            id="anfrageart"
            name="anfrageart"
            value={anfrageart}
            onChange={(event) => setAnfrageart(event.target.value)}
            className={inputClass}
          >
            {anfrageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Service selection — helps identify the relevant cleaning type. */}
      <fieldset>
        <legend className={labelClass}>
          Gewünschte Leistung{" "}
          <span className="font-normal text-navy-400">
            (optional, Mehrfachauswahl)
          </span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((service) => {
            const active = selectedServices.includes(service.slug);
            return (
              <button
                key={service.slug}
                type="button"
                onClick={() => toggleService(service.slug)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-teal-400 bg-teal-500 text-white"
                    : "border-navy-200 bg-white text-navy-700 hover:border-teal-300"
                }`}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="nachricht" className={labelClass}>
          Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          required
          rows={5}
          className={inputClass}
          placeholder="Beschreiben Sie kurz Ihr Objekt, den gewünschten Umfang und mögliche Termine."
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-navy-600">
        <input
          type="checkbox"
          name="datenschutz"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-navy-300 text-teal-500 focus:ring-teal-400"
        />
        <span>
          Ich habe die{" "}
          <Link
            href="/datenschutz"
            className="font-medium text-navy-800 underline underline-offset-2 hover:text-teal-600"
          >
            Datenschutzerklärung
          </Link>{" "}
          gelesen und bin mit der Bearbeitung meiner Angaben zur Beantwortung
          der Anfrage einverstanden.
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg">
          Anfrage senden
        </Button>
        <p className="text-sm text-navy-500">
          Hinweis: Die Formularanbindung folgt. Ihre Angaben werden derzeit noch
          nicht übermittelt.
        </p>
      </div>
    </form>
  );
}
