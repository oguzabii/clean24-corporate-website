import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  LegalDocument,
  LegalSection,
  LegalList,
  LegalNote,
} from "@/components/legal/Legal";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Datenschutz | Clean24",
  description:
    "Datenschutzerklärung der Clean24 Memis GmbH – Informationen zur Bearbeitung von Personendaten bei der Kontaktaufnahme und beim Besuch dieser Website.",
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        lead="Informationen darüber, wie die Clean24 Memis GmbH mit Personendaten umgeht."
      />

      <Section tone="white">
        <LegalDocument>
          <LegalSection title="Allgemeines">
            <p>
              Der Schutz Ihrer Personendaten ist uns ein wichtiges Anliegen.
              Wir bearbeiten Personendaten im Einklang mit dem schweizerischen
              Datenschutzgesetz (DSG) und den anwendbaren datenschutzrechtlichen
              Bestimmungen. Nachfolgend informieren wir Sie darüber, welche
              Daten wir bearbeiten und zu welchem Zweck.
            </p>
            <p>
              Diese Website ist als statische Website aufgebaut. Sie enthält
              derzeit keine Benutzerkonten, keine Bezahlfunktionen und keine
              Newsletter-Anmeldung.
            </p>
          </LegalSection>

          <LegalSection title="Verantwortliche Stelle">
            <p>
              Verantwortlich für die Bearbeitung von Personendaten im
              Zusammenhang mit dieser Website ist:
            </p>
            <p className="not-italic">
              {contact.company}
              <br />
              {contact.street}
              <br />
              {contact.zip} {contact.city}, {contact.country}
              <br />
              E-Mail:{" "}
              <a
                href={contact.emailHref}
                className="text-navy-900 underline underline-offset-2 hover:text-teal-600"
              >
                {contact.email}
              </a>
              <br />
              Telefon:{" "}
              <a
                href={contact.phoneHref}
                className="text-navy-900 underline underline-offset-2 hover:text-teal-600"
              >
                {contact.phone}
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Bearbeitung von Personendaten">
            <p>
              Wir bearbeiten nur jene Personendaten, die für die Beantwortung
              Ihrer Anfrage, die Erbringung unserer Dienstleistungen sowie den
              Betrieb dieser Website erforderlich sind. Eine Bearbeitung erfolgt
              insbesondere, wenn Sie uns Daten aktiv übermitteln – etwa bei
              einer Kontaktaufnahme.
            </p>
          </LegalSection>

          <LegalSection title="Kontaktaufnahme per E-Mail, Telefon oder Formular">
            <p>
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, bearbeiten wir
              die von Ihnen mitgeteilten Angaben (z. B. Name, Firma,
              Kontaktdaten, Angaben zum Objekt sowie den Inhalt Ihrer Anfrage),
              um Ihr Anliegen zu bearbeiten und Ihnen zu antworten.
            </p>
            <p>
              Wenn Sie das Kontaktformular auf dieser Website absenden, werden
              die von Ihnen eingegebenen Angaben (insbesondere Name, allfällige
              Firma bzw. Verwaltung, E-Mail-Adresse, Telefonnummer, allfällige
              Objektadresse, Anfrageart, ausgewählte Leistungen sowie Ihre
              Nachricht) an Clean24 übermittelt und dort zur Bearbeitung Ihrer
              Anfrage verwendet. Die Übermittlung erfolgt nur, wenn Sie der
              Bearbeitung Ihrer Angaben zuvor zustimmen.
            </p>
          </LegalSection>

          <LegalSection title="Server-Logfiles / Hosting">
            <p>
              Beim Aufruf dieser Website können durch den Hosting-Anbieter
              technisch bedingt Daten in Server-Logfiles erfasst werden. Dazu
              können insbesondere gehören:
            </p>
            <LegalList
              items={[
                "IP-Adresse des zugreifenden Geräts",
                "Datum und Uhrzeit des Zugriffs",
                "aufgerufene Seite bzw. Datei",
                "übertragene Datenmenge sowie Browser- und Geräteangaben",
              ]}
            />
            <p>
              Diese Daten dienen dem sicheren und stabilen Betrieb der Website
              sowie der Fehleranalyse und werden nicht mit anderen
              Datenquellen zusammengeführt, um einzelne Personen zu
              identifizieren.
            </p>
          </LegalSection>

          <LegalSection title="Cookies">
            <p>
              Diese Website verwendet derzeit keine Cookies zu Analyse-,
              Tracking- oder Marketingzwecken. Es ist kein Cookie-Banner
              vorhanden, da keine einwilligungspflichtigen Cookies gesetzt
              werden. Sollten künftig Cookies eingesetzt werden, wird diese
              Datenschutzerklärung angepasst und – soweit erforderlich – eine
              entsprechende Einwilligung eingeholt.
            </p>
          </LegalSection>

          <LegalSection title="Externe Dienste">
            <p>
              Es sind derzeit keine externen Analyse-, Tracking-, Marketing-,
              Newsletter- oder Zahlungsdienste eingebunden. Bild- und
              Schriftdateien werden mit der Website ausgeliefert.
            </p>
            <p>
              Für die technische Übermittlung von Anfragen aus dem
              Kontaktformular kann ein spezialisierter E-Mail-Dienstleister
              eingesetzt werden, der die Nachricht in unserem Auftrag an unsere
              E-Mail-Adresse zustellt. Dabei werden die von Ihnen im Formular
              gemachten Angaben verarbeitet. Der Dienstleister verwendet diese
              Daten ausschliesslich zum Zweck der Zustellung und nicht zu
              eigenen Zwecken.
            </p>
            <p>
              Sollten künftig weitere Dienste von Drittanbietern eingesetzt
              werden, informieren wir an dieser Stelle darüber.
            </p>
          </LegalSection>

          <LegalSection title="Aufbewahrung und Sicherheit">
            <p>
              Wir bewahren Personendaten nur so lange auf, wie dies für die
              genannten Zwecke oder aufgrund gesetzlicher Vorgaben erforderlich
              ist. Wir treffen angemessene technische und organisatorische
              Massnahmen, um Personendaten vor unbefugtem Zugriff, Verlust oder
              Missbrauch zu schützen.
            </p>
          </LegalSection>

          <LegalSection title="Rechte betroffener Personen">
            <p>
              Im Rahmen der anwendbaren gesetzlichen Bestimmungen haben Sie
              insbesondere folgende Rechte:
            </p>
            <LegalList
              items={[
                "Auskunft über die zu Ihrer Person bearbeiteten Daten",
                "Berichtigung unrichtiger Daten",
                "Löschung oder Einschränkung der Bearbeitung, soweit zulässig",
                "Widerspruch gegen bestimmte Bearbeitungen",
              ]}
            />
            <p>
              Zur Ausübung dieser Rechte genügt eine Mitteilung an die oben
              genannte verantwortliche Stelle.
            </p>
          </LegalSection>

          <LegalSection title="Änderungen dieser Datenschutzerklärung">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um
              sie an geänderte Rechtslagen oder an Änderungen unserer Website
              und Dienstleistungen anzupassen. Massgebend ist die jeweils auf
              dieser Seite veröffentlichte Fassung.
            </p>
          </LegalSection>

          <LegalNote>
            Diese Datenschutzerklärung beschreibt den aktuellen technischen
            Stand der Website. Vor der finalen Veröffentlichung sollte sie bei
            Bedarf durch eine Fachperson geprüft und bei künftigen technischen
            Änderungen aktualisiert werden.
          </LegalNote>
        </LegalDocument>
      </Section>
    </>
  );
}
