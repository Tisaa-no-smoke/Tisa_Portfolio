import { learning, skillGroups, type Skill, type SkillGroup } from "@/lib/content";
import { SectionTitle } from "./section-title";

const lineIcons = {
  frontend: "M3 4h18v12H3zM8 20h8M12 16v4M9.5 7.5 7.5 10l2 2.5M14.5 7.5l2 2.5-2 2.5",
  frameworks: "M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5",
  backend: "M3 4h18v7H3zM3 13h18v7H3zM7 7.5h2M7 16.5h2",
  data: "M4 6c0 1.7 3.6 3 8 3s8-1.3 8-3-3.6-3-8-3-8 1.3-8 3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  cube: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3ZM12 12l8-4.5M12 12v9M12 12 4 7.5",
};

function LineIcon({ d, size = 22 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="shrink-0" aria-hidden>
      <path d={d} />
    </svg>
  );
}

function Brick({ skill, color, index, wip }: { skill: Skill; color: SkillGroup["color"]; index: number; wip?: boolean }) {
  const studs = skill.name.length > 9 ? 3 : 2;
  return (
    <li
      className={`brick brick-${color} ${wip ? "brick-wip" : ""}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <span className="brick-studs" aria-hidden>
        {Array.from({ length: studs }, (_, i) => (
          <span key={i} />
        ))}
      </span>
      {/* white badge with the logo in its real brand color */}
      <span className="brick-badge" aria-hidden>
        {skill.logo ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill={`#${skill.logo.hex}`}>
            <path d={skill.logo.path} />
          </svg>
        ) : (
          <LineIcon d={skill.name === "pgAdmin" ? lineIcons.data : lineIcons.cube} size={18} />
        )}
      </span>
      {skill.name}
    </li>
  );
}

const headerBg: Record<SkillGroup["color"], string> = {
  yellow: "bg-yellow text-on-accent",
  pink: "bg-pink text-on-accent",
  blue: "bg-blue text-on-accent",
  mint: "bg-mint text-on-accent",
  surface: "bg-mint text-on-accent",
};

const tilts = ["-1deg", "0.8deg", "0.6deg", "-0.8deg"];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionTitle index="03" en="Skills" km="ជំនាញ" accent="blue" />

      <div className="grid gap-10 lg:grid-cols-2">
        {skillGroups.map((g, gi) => (
          <div
            key={g.group}
            className="brutal sticker flex flex-col bg-surface"
            style={{ "--tilt": tilts[gi % tilts.length] } as React.CSSProperties}
          >
            <div className={`${headerBg[g.color]} flex flex-wrap items-center gap-x-3 gap-y-1 border-b-[3px] border-ink px-5 py-3`}>
              <LineIcon d={lineIcons[g.icon]} />
              <h3 className="font-heading text-xl uppercase">{g.group}</h3>
              <span lang="km" className="ml-auto font-km text-sm font-medium">
                {g.km}
              </span>
            </div>
            <ul className={`baseplate light-island plate-${g.color === "surface" ? "mint" : g.color} flex flex-1 flex-wrap content-start gap-x-4 gap-y-6 px-5 pt-8 pb-6`}>
              {g.items.map((s, i) => (
                <Brick key={s.name} skill={s} color={g.color} index={i} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* still under construction */}
      <div className="brutal mt-12 overflow-hidden bg-yellow">
        <div className="light-island">
          <div className="hazard" aria-hidden />
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
            <div className="shrink-0">
              <p className="label flex items-center gap-2">
                <span className="status-dot inline-block size-2.5 rounded-full bg-on-accent" aria-hidden />
                Learning now
              </p>
              <p className="mt-2 font-heading text-2xl uppercase">Under construction</p>
              <p lang="km" className="font-km text-sm font-medium">
                កំពុងរៀន
              </p>
            </div>
            <ul className="on-yellow flex flex-wrap gap-x-4 gap-y-6 pt-3 lg:ml-auto lg:justify-end">
              {learning.map((s, i) => (
                <Brick key={s.name} skill={s} color="surface" index={i} wip />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
