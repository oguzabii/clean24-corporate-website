/** Clean24 contact details — single source of truth. */
export interface ContactInfo {
  company: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  email: string;
  emailHref: string;
  phone: string;
  phoneHref: string;
}

export const contact: ContactInfo = {
  company: "Clean24 Memis GmbH",
  street: "Glanzenbergstrasse 26",
  zip: "8953",
  city: "Dietikon",
  country: "Schweiz",
  email: "info@clean-24.ch",
  emailHref: "mailto:info@clean-24.ch",
  phone: "+41 44 516 19 23",
  phoneHref: "tel:+41445161923",
};
