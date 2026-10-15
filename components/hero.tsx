import { profile } from "@/lib/content";
import { PhotoFrame } from "./photo-frame";

export function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:pt-16">
      <div>
        <p className="label mb-6 flex flex-wrap items-center gap-3">
          <span className="tag bg-mint text-on-accent">
            <span className="status-dot inline-block size-2.5 rounded-full border-2 border-on-accent bg-on-accent" aria-hidden />
            Open to internships
          </span>
          <span className="text-ink-muted">
            {profile.role} · {profile.subtitle} · {profile.city}
          </span>
        </p>

        <p lang="km" className="display-khmer mb-2 inline-block -rotate-2 border-[3px] border-ink bg-pink px-5 text-on-accent shadow-[6px_6px_0_var(--ink)]">
          ជម្រាបសួរ
        </p>

        <h1 className="display-xl mt-6 uppercase">
          Hello, I&apos;m <span className="inline-block whitespace-nowrap bg-yellow px-3 text-on-accent">Tisa</span>
        </h1>

        <p className="title mt-5">{profile.name}</p>

        <p className="body mt-6 max-w-xl text-[19px] leading-[30px]">
          {profile.intro} I&apos;m a full stack developer and Software Development student at Norton University. I
          build web apps end to end, but frontend is where I shine: clean UI, animation and interactive experiences.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#work" className="btn flex-1 justify-center whitespace-nowrap sm:flex-none">
            See my work <span aria-hidden>→</span>
          </a>
          <a href="#contact" className="btn btn-plain flex-1 justify-center whitespace-nowrap sm:flex-none">
            Get in touch <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <PhotoFrame />
    </section>
  );
}
