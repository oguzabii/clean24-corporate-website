import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import { contact } from "@/data/contact";

/**
 * Mobile-only sticky conversion bar fixed to the bottom of the viewport.
 * Hidden on large screens. The leading spacer prevents the fixed bar from
 * covering page content. Pure CSS — no client-side JavaScript.
 */
export function MobileStickyCta() {
  return (
    <>
      <div className="h-32 sm:h-20 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-100 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-2 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:gap-3">
          <div className="min-w-0 flex-1">
            <Button
              href={contact.phoneHref}
              variant="outline"
              size="md"
              className="w-full px-3"
            >
              {cta.call.label}
            </Button>
          </div>
          <div className="min-w-0 flex-1">
            <Button
              href={cta.primary.href}
              variant="accent"
              size="md"
              className="w-full px-3"
            >
              {cta.primary.label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
