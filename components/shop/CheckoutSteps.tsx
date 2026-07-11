import { shopConfig } from "@/data/shop-config";
import { cn } from "@/lib/cn";

/**
 * Non-interactive preview of the future checkout flow. Renders the step
 * labels from shopConfig.checkoutSteps; only `activeIndex` is highlighted.
 * Server-component friendly (no client JS).
 */
export function CheckoutSteps({ activeIndex = 0 }: { activeIndex?: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {shopConfig.checkoutSteps.map((step, i) => {
        const active = i === activeIndex;
        const last = i === shopConfig.checkoutSteps.length - 1;
        return (
          <li key={step} className="flex items-center gap-x-2">
            <span
              aria-current={active ? "step" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium",
                active
                  ? "border-teal-400 bg-teal-500 text-white"
                  : "border-navy-200 bg-white text-navy-500",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold",
                  active ? "bg-white/25 text-white" : "bg-navy-100 text-navy-600",
                )}
                aria-hidden
              >
                {i + 1}
              </span>
              {step}
            </span>
            {!last ? (
              <span className="h-px w-4 bg-navy-200 sm:w-6" aria-hidden />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
