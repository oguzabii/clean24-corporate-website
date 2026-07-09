import Image from "next/image";
import type { Founder } from "@/data/founders";

/**
 * Premium founder card with the real portrait. `showBio` renders the longer
 * bio (Unternehmen page); otherwise the short focus line (contact panel).
 */
export function FounderCard({
  founder,
  showBio = false,
}: {
  founder: Founder;
  showBio?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
      <div className="relative aspect-[4/5]">
        <Image
          src={founder.image}
          alt={founder.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="p-6">
        <h3 className="text-lg font-semibold tracking-tight text-navy-900">
          {founder.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-teal-600">
          {founder.role}
        </p>
        <p className="mt-3 text-sm leading-6 text-navy-600">
          {showBio ? founder.bio : founder.focus}
        </p>
      </figcaption>
    </figure>
  );
}
