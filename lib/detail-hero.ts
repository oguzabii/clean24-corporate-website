export function isLongSingleWordTitle(title: string) {
  return getLongestMeaningfulWordLength(title) >= 14;
}

export function getDetailTitleClassName(title: string) {
  const sizeClass = isLongSingleWordTitle(title)
    ? "text-[clamp(2rem,8.4vw,5.5rem)]"
    : "text-[clamp(2.6rem,10vw,5.8rem)]";

  return [
    "mt-7 max-w-full whitespace-normal hyphens-none font-semibold leading-[0.94] tracking-tight [overflow-wrap:normal] [text-wrap:balance] [word-break:normal]",
    sizeClass,
  ].join(" ");
}

function getLongestMeaningfulWordLength(title: string) {
  return title
    .normalize("NFC")
    .split(/[\s&/+,.:;()]+/)
    .flatMap((part) => part.split(/[-–—]+/))
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter(Boolean)
    .reduce((longest, word) => Math.max(longest, word.length), 0);
}
