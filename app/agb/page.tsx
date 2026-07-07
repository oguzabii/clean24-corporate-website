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
  title: "AGB | Clean24",
  description:
    "Allgemeine Geschäftsbedingungen (AGB) der Clean24 Memis GmbH für Reinigungs- und Facility-Dienstleistungen – Entwurf zur Prüfung.",
};

export default function AgbPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Allgemeine Geschäftsbedingungen"
        lead="Grundlagen der Zusammenarbeit zwischen der Clean24 Memis GmbH und ihren Kundinnen und Kunden."
      />

      <Section tone="white">
        <LegalDocument>
          <LegalNote>
            Diese AGB sind ein praxisnaher Entwurf und stellen kein
            abschliessend rechtlich geprüftes Dokument dar. Vor der
            verbindlichen Verwendung sollten sie durch eine Fachperson geprüft
            werden. Massgebend sind stets die Angaben in der individuellen
            Offerte bzw. Auftragsbestätigung.
          </LegalNote>

          <LegalSection index={1} title="Geltungsbereich">
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
              Dienstleistungen der {contact.company} (nachfolgend „Clean24“) im
              Bereich der Reinigung und des Facility-Service. Abweichende oder
              ergänzende Vereinbarungen gelten nur, soweit sie schriftlich in
              der Offerte oder Auftragsbestätigung festgehalten sind.
            </p>
          </LegalSection>

          <LegalSection index={2} title="Angebot und Vertragsabschluss">
            <p>
              Offerten von Clean24 sind freibleibend, sofern nicht ausdrücklich
              anders angegeben. Ein Vertrag kommt mit der Auftragsbestätigung
              durch Clean24 oder mit dem Beginn der vereinbarten Leistung
              zustande. Massgebend für Umfang und Inhalt der Leistung sind die
              Angaben in der Offerte bzw. Auftragsbestätigung.
            </p>
          </LegalSection>

          <LegalSection index={3} title="Leistungsumfang">
            <p>
              Der Leistungsumfang richtet sich nach der vereinbarten Offerte.
              Enthalten sind die dort beschriebenen Arbeiten; nicht ausdrücklich
              aufgeführte Leistungen sind nicht Bestandteil des Auftrags. Clean24
              erbringt die Leistungen fachgerecht und mit geeignetem Personal
              und Material.
            </p>
          </LegalSection>

          <LegalSection index={4} title="Mitwirkungspflichten des Kunden">
            <p>
              Der Kunde stellt sicher, dass die für die Leistungserbringung
              erforderlichen Voraussetzungen gegeben sind. Dazu gehören
              insbesondere:
            </p>
            <LegalList
              items={[
                "rechtzeitiger und sicherer Zugang zum Objekt",
                "Zugang zu Strom und Wasser, soweit für die Arbeiten erforderlich",
                "Information über objektspezifische Besonderheiten oder Gefahren",
                "Bereitstellung notwendiger Angaben für die Terminplanung",
              ]}
            />
          </LegalSection>

          <LegalSection index={5} title="Termine und Zugang zum Objekt">
            <p>
              Termine werden zwischen den Parteien vereinbart. Kann eine
              Leistung aus Gründen, die der Kunde zu vertreten hat (z. B.
              fehlender Zugang zum Objekt), nicht oder nur teilweise erbracht
              werden, kann der dadurch entstandene Aufwand in Rechnung gestellt
              werden.
            </p>
          </LegalSection>

          <LegalSection index={6} title="Preise und Zahlungsbedingungen">
            <p>
              Es gelten die in der Offerte genannten Preise. Sofern nicht anders
              vereinbart, verstehen sich die Preise in Schweizer Franken (CHF)
              zuzüglich der gesetzlichen Mehrwertsteuer. Rechnungen sind – wenn
              nicht anders vereinbart – innert 30 Tagen ab Rechnungsdatum ohne
              Abzug zahlbar.
            </p>
          </LegalSection>

          <LegalSection index={7} title="Abnahme und Mängelmeldung">
            <p>
              Der Kunde prüft die erbrachte Leistung nach Abschluss. Allfällige
              Mängel sind Clean24 unverzüglich und möglichst konkret zu melden,
              damit eine Nachbesserung im vereinbarten Leistungsumfang erfolgen
              kann. Wird kein Mangel innert angemessener Frist gemeldet, gilt die
              Leistung als vertragsgemäss erbracht.
            </p>
          </LegalSection>

          <LegalSection index={8} title="Abgabegarantie / Umzugsreinigung">
            <p>
              Bei der Umzugsreinigung (Übergabereinigung) gilt eine
              Abgabegarantie ausschliesslich dann, wenn sie in der Offerte bzw.
              Auftragsbestätigung ausdrücklich vereinbart und als solche
              bezeichnet ist.
            </p>
            <p>
              Ist eine Abgabegarantie vereinbart, bezieht sich eine allfällige
              Nachreinigung auf den vereinbarten Leistungsumfang und setzt
              voraus, dass festgestellte Beanstandungen unverzüglich – in der
              Regel im Rahmen der offiziellen Wohnungsabnahme – gemeldet werden.
              Clean24 ist Gelegenheit zur Nachbesserung zu geben.
            </p>
            <p>
              Die Abgabegarantie umfasst keine über den vereinbarten Umfang
              hinausgehenden Arbeiten und stellt keine zeitlich oder inhaltlich
              unbegrenzte Garantie dar. Massgebend sind stets die Angaben der
              individuellen Offerte; Bestimmungen dieser AGB gelten nur, soweit
              sie dieser nicht widersprechen.
            </p>
          </LegalSection>

          <LegalSection
            index={9}
            title="Zusatzaufwand und nicht vereinbarte Leistungen"
          >
            <p>
              Zeigt sich vor Ort ein Aufwand, der über den vereinbarten Umfang
              hinausgeht (z. B. aussergewöhnliche Verschmutzung oder zusätzlich
              gewünschte Arbeiten), wird dieser nach Möglichkeit vorgängig
              abgestimmt und separat verrechnet. Nicht vereinbarte Leistungen
              werden nur nach Rücksprache ausgeführt.
            </p>
          </LegalSection>

          <LegalSection index={10} title="Haftung">
            <p>
              Clean24 haftet für Schäden, die auf eine Verletzung
              vertraglicher Pflichten zurückzuführen sind, im Rahmen der
              gesetzlichen Bestimmungen. Für leichte Fahrlässigkeit sowie für
              indirekte Schäden und Folgeschäden ist die Haftung – soweit
              gesetzlich zulässig – ausgeschlossen. Schäden sind Clean24
              unverzüglich zu melden.
            </p>
          </LegalSection>

          <LegalSection index={11} title="Absage / Verschiebung">
            <p>
              Vereinbarte Termine können bis zu einem angemessenen Zeitpunkt vor
              dem Einsatz kostenlos verschoben oder abgesagt werden. Bei
              kurzfristigen Absagen kann der bereits entstandene oder
              eingeplante Aufwand angemessen in Rechnung gestellt werden. Die
              konkreten Fristen werden, soweit erforderlich, in der Offerte
              festgehalten.
            </p>
          </LegalSection>

          <LegalSection index={12} title="Datenschutz">
            <p>
              Clean24 bearbeitet Personendaten im Rahmen der Auftragsabwicklung
              vertraulich und im Einklang mit dem schweizerischen
              Datenschutzgesetz. Weitere Informationen finden Sie in unserer
              Datenschutzerklärung.
            </p>
          </LegalSection>

          <LegalSection
            index={13}
            title="Anwendbares Recht und Gerichtsstand"
          >
            <p>
              Auf das Vertragsverhältnis ist ausschliesslich schweizerisches
              Recht anwendbar. Gerichtsstand ist – soweit gesetzlich zulässig –
              der Sitz der {contact.company} in {contact.city}.
            </p>
          </LegalSection>

          <LegalSection index={14} title="Schlussbestimmungen">
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder
              werden, bleibt die Gültigkeit der übrigen Bestimmungen davon
              unberührt. An die Stelle unwirksamer Bestimmungen tritt eine
              Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
              Änderungen und Ergänzungen bedürfen der Schriftform.
            </p>
          </LegalSection>
        </LegalDocument>
      </Section>
    </>
  );
}
