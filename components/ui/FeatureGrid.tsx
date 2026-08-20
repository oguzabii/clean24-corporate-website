import { cn } from "@/lib/cn";

export interface Feature {
  title: string;
  text: string;
}

/** Reusable editorial feature rail for interior pages. */
export function FeatureGrid({
  items,
  columns = 3,
  className,
}: {
  items: Feature[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-x-10 gap-y-9",
        columns === 1
          ? "grid-cols-1"
          : columns === 2
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.title}
          className="border-t border-navy-100 pt-5"
        >
          <span className="text-sm font-semibold tabular-nums text-teal-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-navy-900">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-navy-600">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
