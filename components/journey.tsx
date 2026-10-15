import { achievements } from "@/lib/content";
import { SectionTitle } from "./section-title";
import { Trophy } from "./work";

export function Journey() {
  return (
    <section id="awards" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionTitle index="02" en="Experience" km="បទពិសោធន៍" accent="yellow" />

      {achievements.map((a) => (
        <article
          key={a.event}
          className="brutal sticker tape relative grid gap-8 bg-yellow p-8 text-on-accent [--tilt:-1deg] sm:p-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-full border-[3px] border-[currentColor] bg-surface text-ink">
                <Trophy size={30} />
              </span>
              <p className="label">Competition · 2026</p>
            </div>
            <p className="mt-6 font-heading text-[clamp(48px,8vw,88px)] leading-[0.9] uppercase">{a.title}</p>
          </div>
          <div className="md:border-l-[3px] md:border-[currentColor] md:pl-12">
            <p className="title">{a.event}</p>
            <p className="label mt-2">{a.org}</p>
            <p className="body mt-6 border-t-[3px] border-[currentColor] pt-5">{a.detail}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
