import Link from "next/link";
import { mainNav, type NavItem } from "@/data/navigation";

/**
 * Desktop mega navigation. Dropdowns open on hover and on keyboard focus
 * (pure CSS via `group-hover` + `group-focus-within`), so no client JS is
 * needed and the menu stays server-rendered and keyboard-accessible.
 */
export function DesktopNav() {
  return (
    <nav
      className="hidden items-center gap-x-6 lg:flex"
      aria-label="Hauptnavigation"
    >
      {mainNav.map((item) =>
        item.items ? (
          <NavDropdown key={item.label} item={item} />
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-sm py-2 text-sm font-medium text-navy-700 transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}

function NavDropdown({ item }: { item: NavItem }) {
  const links = item.items ?? [];
  const hasDescriptions = links.some((l) => l.description);
  // Detailed lists stay single-column; long label-only lists use two columns.
  const twoCol = !hasDescriptions && links.length > 6;

  return (
    <div className="group relative">
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 rounded-sm py-2 text-sm font-medium text-navy-700 transition-colors hover:text-teal-600 group-focus-within:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
        aria-haspopup="true"
      >
        {item.label}
        <Chevron />
      </Link>

      {/* pt-3 bridges the gap so hover doesn't drop between trigger and panel */}
      <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div
          className={`rounded-2xl border border-navy-100 bg-white p-3 shadow-xl shadow-navy-950/10 ${
            twoCol ? "w-[30rem]" : hasDescriptions ? "w-80" : "w-60"
          }`}
        >
          <ul
            className={
              twoCol ? "grid grid-cols-2 gap-x-2" : "flex flex-col"
            }
          >
            {links.map((link, i) => (
              <li key={`${link.label}-${i}`}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-mist focus-visible:outline-none focus-visible:bg-mist"
                >
                  <span className="block text-sm font-medium text-navy-900">
                    {link.label}
                  </span>
                  {link.description ? (
                    <span className="mt-0.5 block text-xs leading-5 text-navy-500">
                      {link.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="h-3 w-3 text-navy-400 transition-transform duration-150 group-hover:rotate-180 group-focus-within:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}
