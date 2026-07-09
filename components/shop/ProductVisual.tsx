import type { ProductVisual as VisualKind } from "@/data/shop";
import { cn } from "@/lib/cn";

/**
 * Premium CSS/SVG product placeholder — a calm brand-toned panel with a
 * minimalist product silhouette. Used until real product photos exist; never
 * implies a specific physical package or brand label.
 */
export function ProductVisual({
  kind,
  className,
}: {
  kind: VisualKind;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-50 via-white to-glass",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 120 120"
        className="h-1/2 w-1/2 text-navy-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {shapes[kind]}
      </svg>
    </div>
  );
}

const shapes: Record<VisualKind, React.ReactNode> = {
  // Bottle + box (set)
  set: (
    <>
      <rect x="20" y="46" width="34" height="52" rx="4" />
      <path d="M31 46v-8h12v8" />
      <line x1="20" y1="62" x2="54" y2="62" className="text-teal-400" stroke="currentColor" />
      <rect x="64" y="34" width="40" height="64" rx="4" />
      <line x1="64" y1="50" x2="104" y2="50" />
    </>
  ),
  // Spray bottle
  spray: (
    <>
      <rect x="42" y="44" width="34" height="54" rx="5" />
      <path d="M52 44v-9h9v9" />
      <path d="M61 35h13l6 6" />
      <line x1="42" y1="60" x2="76" y2="60" className="text-teal-400" stroke="currentColor" />
    </>
  ),
  // Glass / window pane
  glass: (
    <>
      <rect x="30" y="24" width="60" height="72" rx="4" />
      <line x1="60" y1="24" x2="60" y2="96" />
      <line x1="30" y1="60" x2="90" y2="60" />
      <path d="M40 34l14 14" className="text-teal-400" stroke="currentColor" />
    </>
  ),
  // Kitchen (bottle + drop)
  kitchen: (
    <>
      <rect x="38" y="42" width="30" height="56" rx="5" />
      <path d="M46 42v-8h14v8" />
      <path d="M84 40c6 8 6 14 0 18-6-4-6-10 0-18z" className="text-teal-400" stroke="currentColor" />
    </>
  ),
  // Bath (bottle + sparkle)
  bath: (
    <>
      <rect x="36" y="44" width="30" height="54" rx="5" />
      <path d="M44 44v-8h14v8" />
      <path d="M84 40v20M74 50h20" className="text-teal-400" stroke="currentColor" />
    </>
  ),
  // Tools (cloths / accessories)
  tools: (
    <>
      <rect x="26" y="40" width="30" height="58" rx="4" />
      <rect x="64" y="52" width="30" height="46" rx="4" />
      <line x1="26" y1="56" x2="56" y2="56" />
      <line x1="64" y1="66" x2="94" y2="66" className="text-teal-400" stroke="currentColor" />
    </>
  ),
  // Box / carton (move-out starter kit)
  box: (
    <>
      <path d="M30 46l30-14 30 14v34l-30 14-30-14z" />
      <path d="M30 46l30 14 30-14" />
      <line x1="60" y1="60" x2="60" y2="94" />
      <path d="M45 39l30 14" className="text-teal-400" stroke="currentColor" />
    </>
  ),
  // Cloth / folded microfibre stack
  cloth: (
    <>
      <rect x="30" y="40" width="60" height="18" rx="4" />
      <rect x="30" y="62" width="60" height="18" rx="4" />
      <line x1="42" y1="49" x2="78" y2="49" className="text-teal-400" stroke="currentColor" />
      <line x1="42" y1="71" x2="78" y2="71" />
    </>
  ),
  // Checklist / plan sheet
  checklist: (
    <>
      <rect x="34" y="26" width="52" height="68" rx="5" />
      <path d="M46 44l5 5 8-9" className="text-teal-400" stroke="currentColor" />
      <path d="M46 64l5 5 8-9" className="text-teal-400" stroke="currentColor" />
      <line x1="64" y1="42" x2="78" y2="42" />
      <line x1="64" y1="62" x2="78" y2="62" />
    </>
  ),
};
