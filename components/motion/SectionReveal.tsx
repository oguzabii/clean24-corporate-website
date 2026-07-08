"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "./config";

type Tag = "div" | "section" | "article" | "ul" | "ol" | "li";

/**
 * Reveals its children with a soft fade + upward (or scaled) entrance.
 * `trigger="view"` animates when the element scrolls into view (default);
 * `trigger="mount"` animates once on load (used for above-the-fold content).
 *
 * Client-isolated so surrounding content can stay server-rendered. When the
 * user prefers reduced motion, children render statically with no transform.
 */
export function SectionReveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 24,
  x = 0,
  scale = 1,
  duration = 0.6,
  trigger = "view",
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  trigger?: "view" | "mount";
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduceMotion) {
    return (
      <MotionTag className={className} data-reveal>
        {children}
      </MotionTag>
    );
  }

  const shown = { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <MotionTag
      className={className}
      data-reveal
      initial={{ opacity: 0, y, x, scale }}
      transition={{ duration, delay, ease: EASE }}
      {...(trigger === "mount"
        ? { animate: shown }
        : { whileInView: shown, viewport: { once, amount } })}
    >
      {children}
    </MotionTag>
  );
}
