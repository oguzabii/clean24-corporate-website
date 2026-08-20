"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { mainNav, type NavItem } from "@/data/navigation";

/**
 * Desktop mega navigation. Dropdowns use explicit state so a clicked
 * destination always wins over lingering hover/focus state after navigation.
 */
export function DesktopNav() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [suppressHover, setSuppressHover] = useState(false);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    const closeAfterRouteChange = window.setTimeout(() => {
      setOpenMenu(null);
      setSuppressHover(true);
    }, 0);
    return () => window.clearTimeout(closeAfterRouteChange);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setSuppressHover(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeForNavigation = () => {
    setOpenMenu(null);
    setSuppressHover(true);
  };

  return (
    <nav
      className="hidden items-center gap-x-5 lg:flex"
      aria-label="Hauptnavigation"
      onPointerLeave={() => {
        setOpenMenu(null);
        setSuppressHover(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenMenu(null);
          setSuppressHover(true);
          (event.target as HTMLElement).blur();
        }
      }}
    >
      {mainNav.map((item) =>
        item.items ? (
          <NavDropdown
            key={item.label}
            item={item}
            pathname={pathname}
            open={openMenu === item.label}
            suppressHover={suppressHover}
            onOpen={() => setOpenMenu(item.label)}
            onClose={() => setOpenMenu(null)}
            onAllowHover={() => setSuppressHover(false)}
            onNavigate={closeForNavigation}
          />
        ) : (
          <Link
            key={item.label}
            href={item.href}
            onClick={closeForNavigation}
            className={cn(
              "rounded-sm py-2 text-sm font-medium transition-colors hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
              isActive(pathname, item.href) ? "text-teal-700" : "text-navy-700",
            )}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}

function NavDropdown({
  item,
  pathname,
  open,
  suppressHover,
  onOpen,
  onClose,
  onAllowHover,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  open: boolean;
  suppressHover: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAllowHover: () => void;
  onNavigate: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const links = item.items ?? [];
  const hasDescriptions = links.some((l) => l.description);
  // Detailed lists stay single-column; long label-only lists use two columns.
  const twoCol = !hasDescriptions && links.length > 6;

  const active = isActive(pathname, item.href);

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={() => {
        if (suppressHover) {
          onAllowHover();
        }
        onOpen();
      }}
      onPointerMove={() => {
        if (suppressHover) {
          onAllowHover();
          onOpen();
        }
      }}
      onPointerLeave={onClose}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          onClose();
        }
      }}
    >
      <Link
        href={item.href}
        onFocus={onOpen}
        onClick={onNavigate}
        className={cn(
          "inline-flex items-center gap-1 rounded-sm py-2 text-sm font-medium transition-colors hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
          active ? "text-teal-700" : "text-navy-700",
        )}
        aria-haspopup="true"
        aria-expanded={open}
        aria-current={active ? "page" : undefined}
      >
        {item.label}
        <Chevron open={open} />
      </Link>

      <div
        className={cn(
          "absolute left-0 top-full z-50 pt-3 transition-all duration-150",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div
          className={`max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-navy-100 bg-white p-3 shadow-xl shadow-navy-950/10 ${
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
                  onFocus={onOpen}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md px-3 py-2 transition-colors hover:bg-mist focus-visible:outline-none focus-visible:bg-mist",
                    isActive(pathname, link.href) && "bg-mist",
                  )}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                >
                  <span className="block hyphens-auto break-words text-sm font-medium text-navy-900">
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

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn(
        "h-3 w-3 text-navy-400 transition-transform duration-150",
        open && "rotate-180",
      )}
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
