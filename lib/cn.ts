/**
 * Tiny className joiner — filters out falsy values and joins with a space.
 * Avoids pulling in clsx / tailwind-merge for the design-system foundation.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
