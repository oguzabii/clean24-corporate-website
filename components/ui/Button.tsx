import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "outline"
  | "outlineLight"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy-800 text-white hover:bg-navy-700",
  accent: "bg-teal-400 text-navy-950 hover:bg-teal-300",
  outline: "border border-navy-200 text-navy-800 hover:bg-navy-50",
  outlineLight: "border border-white/30 text-white hover:bg-white/10",
  ghost: "text-navy-800 hover:bg-navy-50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ComponentProps<"button">, keyof BaseProps> & { href?: undefined };
type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button. Renders a Next.js <Link> when `href` is provided,
 * otherwise a native <button>. Server-component friendly.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const href = (rest as { href?: string }).href;

  if (href) {
    return (
      <Link className={classes} {...(rest as ComponentProps<typeof Link>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
