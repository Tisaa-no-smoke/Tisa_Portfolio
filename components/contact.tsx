import { profile, socials } from "@/lib/content";
import { IdBadge } from "./id-badge";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="brutal relative grid gap-12 bg-yellow p-6 text-on-accent sm:p-14 lg:grid-cols-[1fr_auto] lg:gap-10">
        <p className="label tag absolute -top-4 left-6 sm:left-8 bg-surface text-ink">05 · Contact</p>
        <div className="min-w-0">
          <p lang="km" className="body-khmer text-[20px]">
            តោះធ្វើការជាមួយគ្នា
          </p>
          <h2 className="display-xl mt-3 text-[clamp(34px,9vw,96px)] uppercase lg:text-[clamp(56px,5.4vw,76px)]">
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="body mt-8 max-w-xl text-[19px] leading-[30px]">
            I&apos;m eager to join a development team, learn from real projects and contribute. Internships and junior
            roles are welcome. Say hi!
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={`mailto:${profile.email}`} className="btn w-full justify-center bg-ink px-4 text-[15px] text-paper sm:w-auto sm:px-[22px] sm:text-[17px]">
              <span className="min-w-0 [overflow-wrap:anywhere]">{profile.email}</span> <span aria-hidden>→</span>
            </a>
            <a href={profile.phoneHref} className="btn btn-plain flex-1 justify-center whitespace-nowrap sm:flex-none">
              {profile.phone}
            </a>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="btn btn-plain flex-1 justify-center sm:flex-none">
                {s.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>

          <p className="label mt-8 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden>
              <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {profile.location}
          </p>
        </div>

        {/* hangs from above the box on wide screens */}
        <div className="lg:-mt-[calc(3.5rem+7rem)]">
          <IdBadge />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t-[3px] border-ink px-4 py-8 sm:px-6">
      <p className="label">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="label text-ink-muted">Built with Next.js · Hand-pinned in Phnom Penh</p>
      <a href="#top" className="label tag">
        Back to top ↑
      </a>
    </footer>
  );
}
