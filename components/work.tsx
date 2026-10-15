import { projects, type Accent, type Project } from "@/lib/content";
import { SectionTitle } from "./section-title";

const accentBg: Record<Accent, string> = {
  yellow: "bg-yellow",
  pink: "bg-pink",
  blue: "bg-blue",
  mint: "bg-mint",
};

export function Trophy({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="square" className="shrink-0" aria-hidden>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 20h8" />
    </svg>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const [primary, ...rest] = project.links;
  return (
    <article
      className={`brutal sticker tape relative flex flex-col bg-surface ${featured ? "lg:col-span-2" : ""}`}
      style={{ "--tilt": project.tilt } as React.CSSProperties}
    >
      {/* color header strip, like a window title bar */}
      <div className={`${accentBg[project.accent]} flex items-center justify-between border-b-[3px] border-ink px-6 py-3 text-on-accent`}>
        <span className="label">{project.tag}</span>
        <span className="label">{project.year}</span>
      </div>

      {project.award && (
        <p className="label flex items-center gap-3 border-b-[3px] border-ink bg-yellow px-6 py-3 text-on-accent">
          <Trophy />
          {project.award}
        </p>
      )}

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-10" : ""}`}>
        <div>
          <h3 className={featured ? "heading" : "title"}>{project.title}</h3>
          <p className="body mt-4">{project.summary}</p>
        </div>

        <div className={`mt-6 flex flex-1 flex-col ${featured ? "lg:mt-0" : ""}`}>
          <ul className="space-y-2.5">
            {project.points.map((p) => (
              <li key={p} className="body flex gap-3 text-[16px] leading-6">
                <span className="mt-0.5 font-heading text-pink" aria-hidden>
                  →
                </span>
                {p}
              </li>
            ))}
          </ul>

          <p className="label mt-6 text-ink-muted">{project.stack.join(" · ")}</p>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <a href={primary.href} className="btn">
              {primary.label} <span aria-hidden>→</span>
            </a>
            {rest.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="btn btn-plain">
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionTitle index="04" en="Selected Work" km="ស្នាដៃ" accent="yellow" />
      <div className="grid gap-x-10 gap-y-14 lg:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}
