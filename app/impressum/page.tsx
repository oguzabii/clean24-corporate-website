import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  LegalDocument,
  LegalSection,
  LegalFacts,
  LegalNote,
} from "@/components/legal/Legal";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Impressum | Clean24",
  description:
    "Impressum der Clean24 Memis GmbH, Glanzenbergstrasse 26, 8953 Dietikon – Anbieterkennzeichnung, Kontakt und Unternehmensidentifikation.",
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Impressum"
        lead="Angaben zum Anbieter und Betreiber dieser Website."
      />

      <Section tone="white">
        <LegalDocument>
          <LegalSection title="Anbieter / Betreiber der Website">
            <p>
              Verantwortlich für den Inhalt und Betreiber dieser Website ist:
            </p>
            <LegalFacts
              rows={[
                { label: "Unternehmen", value: contact.company },
                { label: "Adresse", value: `${contact.street}` },
                {
                  label: "PLZ / Ort",
                  value: `${contact.zip} ${contact.city}`,
                },
                { label: "Land", value: contact.country },
              ]}
            />
          </LegalSection>

          <LegalSection title="Kontakt">
            <LegalFacts
              rows={[
                {
                  label: "E-Mail",
                  value: (
                    <a
                      href={contact.emailHref}
                      className="text-navy-900 underline underline-offset-2 hover:text-teal-600"
                    >
                      {contact.email}
                    </a>
                  ),
                },
                {
                  label: "Telefon",
                  value: (
                    <a
                      href={contact.phoneHref}
                      className="text-navy-900 underline underline-offset-2 hover:text-teal-600"
                    >
                      {contact.phone}
                    </a>
                  ),
                },
              ]}
            />
          </LegalSection>

          <LegalSection title="Unternehmensidentifikation">
            <LegalFacts
              rows={[
                { label: "Rechtsform", value: "Gesellschaft mit beschränkter Haftung (GmbH)" },
                { label: "UID / MWST-Nr.", value: contact.uid },
              ]}
            />
            <p>
              Die Unternehmens-Identifikationsnummer (UID) dient der
              eindeutigen Identifikation des Unternehmens in der Schweiz.
            </p>
          </LegalSection>

          <LegalSection title="Haftungsausschluss">
            <p>
              Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt
              erstellt und laufend aktualisiert. Für die Richtigkeit,
              Vollständigkeit und Aktualität der bereitgestellten Informationen
              wird jedoch keine Gewähr übernommen.
            </p>
            <p>
              Haftungsansprüche gegen die {contact.company} wegen Schäden
              materieller oder immaterieller Art, die aus dem Zugriff auf, der
              Nutzung oder Nichtnutzung der veröffentlichten Informationen
              entstehen, sind – soweit gesetzlich zulässig – ausgeschlossen.
            </p>
          </LegalSection>

          <LegalSection title="Urheberrechte">
            <p>
              Die Urheber- und alle weiteren Rechte an Inhalten, Bildern,
              Texten und Gestaltungselementen dieser Website liegen bei der{" "}
              {contact.company} oder den entsprechend genannten
              Rechteinhabern. Die Verwendung, Vervielfältigung oder
              Verbreitung von Elementen dieser Website bedarf der vorgängigen
              schriftlichen Zustimmung.
            </p>
          </LegalSection>

          <LegalSection title="Externe Links">
            <p>
              Diese Website kann Verweise (Links) auf Websites Dritter
              enthalten. Für den Inhalt verlinkter externer Seiten sind
              ausschliesslich deren Betreiber verantwortlich. Zum Zeitpunkt der
              Verlinkung wurden keine rechtswidrigen Inhalte festgestellt. Auf
              die aktuelle und künftige Gestaltung verlinkter Seiten hat die{" "}
              {contact.company} keinen Einfluss und übernimmt hierfür keine
              Haftung.
            </p>
          </LegalSection>

          <LegalNote>
            Dieser Text ist ein sorgfältig erstellter Entwurf. Vor der finalen
            Veröffentlichung sollten die rechtlichen Angaben bei Bedarf durch
            eine Fachperson geprüft werden.
          </LegalNote>
        </LegalDocument>
      </Section>
    </>
  );
}
