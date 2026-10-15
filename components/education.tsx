import Image from "next/image";
import { education, type Accent } from "@/lib/content";

const accentBg: Record<Accent, string> = {
  yellow: "bg-yellow",
  pink: "bg-pink",
  blue: "bg-blue",
  mint: "bg-mint",
};

export function EducationCards() {
  return (
    <ol className="grid gap-6">
      {education.map((e, i) => (
        <li
          key={e.school}
          className="brutal sticker bg-surface"
          style={{ "--tilt": `${i % 2 ? -1 : 1}deg` } as React.CSSProperties}
        >
          <div className={`${accentBg[e.accent]} flex items-center justify-between gap-3 border-b-[3px] border-ink px-5 py-2.5 text-on-accent`}>
            <span className="label">Education</span>
            <span className="label">{e.when}</span>
          </div>
          <div className="flex items-center gap-4 p-5">
            <div className="relative size-16 shrink-0 overflow-hidden border-[3px] border-ink bg-paper shadow-[3px_3px_0_var(--ink)] sm:size-20">
              <Image src={e.logo.src} alt={`${e.school} logo`} fill sizes="80px" className="object-contain p-2" />
            </div>
            <div>
              <h3 className="title">{e.school}</h3>
              <p className="body mt-1 text-ink-muted">{e.course}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
