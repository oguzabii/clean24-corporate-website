"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";
import { EASE } from "./config";

type Tag = "div" | "section" | "article" | "ul" | "ol" | "li";

const ReducedMotionContext = createContext(false);

/**
 * Reveals its direct <StaggerItem> children one after another. Use for grids,
 * lists and card rows. `trigger="view"` fires when scrolled into view (default);
 * `trigger="mount"` fires on load (hero). Respects prefers-reduced-motion.
 */
export function StaggerContainer({
  children,
  className,
  as = "div",
  trigger = "view",
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  trigger?: "view" | "mount";
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const MotionTag = motion[as] as typeof motion.div;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? {}
        : { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <ReducedMotionContext.Provider value={reduceMotion}>
      <MotionTag
        className={className}
        variants={container}
        initial="hidden"
        {...(trigger === "mount"
          ? { animate: "visible" }
          : { whileInView: "visible", viewport: { once, amount } })}
      >
        {children}
      </MotionTag>
    </ReducedMotionContext.Provider>
  );
}

/**
 * A single staggered child. `y`/`x` control the entrance offset (e.g. x for a
 * slight horizontal reveal). Inherits reduced-motion from its container.
 */
export function StaggerItem({
  children,
  className,
  as = "div",
  y = 16,
  x = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
  x?: number;
  duration?: number;
}) {
  const reduceMotion = useContext(ReducedMotionContext);
  const MotionTag = motion[as] as typeof motion.div;

  const item: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, x },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration, ease: EASE },
        },
      };

  return (
    <MotionTag className={className} variants={item} data-reveal>
      {children}
    </MotionTag>
  );
}
