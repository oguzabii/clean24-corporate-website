"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * A very restrained ambient glow — a slow, low-amplitude opacity/scale
 * "breathing" on a single blurred blob behind the final CTA. Renders static
 * when the user prefers reduced motion. GPU-friendly (opacity + transform).
 */
export function AmbientGlow({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className} aria-hidden />;
  }

  return (
    <motion.div
      className={className}
      aria-hidden
      initial={{ opacity: 0.45, scale: 0.97 }}
      animate={{ opacity: [0.45, 0.8, 0.45], scale: [0.97, 1.05, 0.97] }}
      transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
