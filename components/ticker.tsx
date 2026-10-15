import { ticker } from "@/lib/content";

export function Ticker() {
  // The motto is short, so repeat it enough to fill wide screens before the loop restarts.
  const set = [...ticker, ...ticker];
  const items = [...set, ...set];
  return (
    <div
      className="-rotate-1 overflow-hidden border-y-[3px] border-ink bg-ink py-4 text-paper"
      aria-label={ticker.map((t) => t.text).join(", ")}
    >
      <div className="marquee-track flex w-max gap-8" aria-hidden>
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-2xl uppercase">
            <span lang={t.km ? "km" : undefined} className={t.km ? "font-km font-bold" : "font-heading"}>
              {t.text}
            </span>
            <span className="text-yellow">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
