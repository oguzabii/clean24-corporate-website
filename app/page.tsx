export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          Premium Swiss Cleaning &amp; Facility Brand
        </span>

        <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl dark:text-zinc-50">
          Clean24
        </h1>

        <p className="text-2xl font-light text-zinc-700 sm:text-3xl dark:text-zinc-300">
          Sauberkeit mit System.
        </p>

        <p className="max-w-md text-base leading-7 text-zinc-500 dark:text-zinc-400">
          Clean24 Corporate Experience — the technical foundation is in place.
          The full corporate website is coming soon.
        </p>

        <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          Phase 1 · Project Bootstrap
        </p>
      </main>
    </div>
  );
}
