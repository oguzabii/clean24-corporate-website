import { cn } from "@/lib/cn";

export interface Feature {
  title: string;
  text: string;
}

/** Reusable premium feature card grid for interior pages. */
export function FeatureGrid({
  items,
  columns = 3,
  className,
}: {
  items: Feature[];
  columns?: 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
        >
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-teal-400/40 text-teal-600"
            aria-hidden
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 8.5 6 12l7.5-8" />
            </svg>
          </span>
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-navy-900">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-navy-600">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
