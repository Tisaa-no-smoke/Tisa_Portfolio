import type { Accent } from "@/lib/content";

const bg: Record<Accent, string> = {
  yellow: "bg-yellow",
  pink: "bg-pink",
  blue: "bg-blue",
  mint: "bg-mint",
};

// Bilingual poster heading: number label, English title, Khmer title on a color block.
export function SectionTitle({
  index,
  en,
  km,
  accent,
}: {
  index: string;
  en: string;
  km: string;
  accent: Accent;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end gap-x-6 gap-y-3">
      <span className="label tag">{index}</span>
      <h2 className="heading uppercase">{en}</h2>
      <span
        lang="km"
        className={`body-khmer ${bg[accent]} -rotate-2 border-[3px] border-ink px-3 text-on-accent shadow-[3px_3px_0_var(--ink)]`}
      >
        {km}
      </span>
    </div>
  );
}
