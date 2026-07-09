/**
 * Clean24 founders — the two real people behind the company.
 * Oğuzhan and Yavuz Memis are brothers and both Geschäftsleitung & Gründer.
 * Do not add invented employees or generated portraits here.
 */
export interface Founder {
  slug: string;
  name: string;
  role: string;
  /** Short focus line (used on the contact founder panel). */
  focus: string;
  /** Longer bio paragraph (used on the Unternehmen page). */
  bio: string;
  /** Portrait asset in /public (real photo). */
  image: string;
  imageAlt: string;
}

export const founders: Founder[] = [
  {
    slug: "oguzhan-memis",
    name: "Oğuzhan Memis",
    role: "Geschäftsleitung & Gründer",
    focus: "Kundenbetreuung, Offerten, Verwaltungen und allgemeine Anfragen.",
    bio: "Oğuzhan steht für Kundenbetreuung, Offerten, Verwaltungen und klare Kommunikation. Sein Fokus liegt darauf, Anfragen strukturiert aufzunehmen, Erwartungen sauber zu klären und Kunden durch den passenden Ablauf zu führen.",
    image: "/contact/oguzhan-memis.png",
    imageAlt: "Oğuzhan Memis, Geschäftsleitung & Gründer von Clean24.",
  },
  {
    slug: "yavuz-memis",
    name: "Yavuz Memis",
    role: "Geschäftsleitung & Gründer",
    focus: "Einsatzplanung, Objektbetreuung, Qualität und operative Umsetzung.",
    bio: "Yavuz steht für Einsatzplanung, Objektbetreuung, Qualität und operative Umsetzung. Sein Fokus liegt darauf, dass vereinbarte Leistungen sauber geplant, zuverlässig ausgeführt und kontrolliert abgeschlossen werden.",
    image: "/contact/yavuz-memis.png",
    imageAlt: "Yavuz Memis, Geschäftsleitung & Gründer von Clean24.",
  },
];
