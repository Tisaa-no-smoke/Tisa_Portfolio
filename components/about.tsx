import { languages, softSkills } from "@/lib/content";
import { EducationCards } from "./education";
import { SectionTitle } from "./section-title";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionTitle index="01" en="About me" km="អំពីខ្ញុំ" accent="pink" />

      <div className="grid items-start gap-10 lg:grid-cols-2">
        {/* zine page */}
        <div className="brutal sticker relative bg-surface p-6 [--tilt:-0.8deg] sm:p-8">
          <p className="font-heading text-[clamp(26px,3.4vw,40px)] leading-[1] uppercase">
            Always learning. Always building. <span className="bg-yellow px-2 text-on-accent">Always improving.</span>
          </p>
          <div className="body mt-6 space-y-3 text-[15px] leading-6">
            <p>
              Hi, I&apos;m Tisa, a developer who loves turning ideas into reality. I&apos;m a Software Development student
              at Norton University in Phnom Penh, Cambodia.
            </p>
            <p>
              I&apos;m passionate about building modern web applications and creating meaningful digital experiences. I
              like exploring new technologies, solving problems, and turning creative ideas into products that work well
              and are easy to use.
            </p>
            <p>
              I&apos;m a full stack developer: I build the database, the API and the interface. But frontend is my
              strongest side and where I&apos;m most at home: user-friendly interfaces, interactive web experiences,
              animation and modern UI/UX design. I keep sharpening both ends of the stack, and I&apos;m keen to learn new
              technologies, especially AI.
            </p>
            <p>
              I&apos;m eager to join a development team, learn from practical experience and contribute to real
              projects. For me, development is more than writing code. It&apos;s about learning, experimenting and
              building something that makes an impact.
            </p>
          </div>
          <p lang="km" className="body-khmer mt-6 border-t-[3px] border-ink pt-5 text-ink-muted">
            ខ្ញុំចូលចិត្តបង្កើតកម្មវិធីដែលមនុស្សប្រើបានពិតប្រាកដ។
          </p>
        </div>

        <div className="grid content-start gap-6">
          <EducationCards />

          <div className="brutal sticker mt-2 bg-surface p-5 [--tilt:0.8deg]">
            <p className="label text-ink-muted">Soft skills</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <li key={s} className="tag label bg-yellow text-on-accent">
                  {s}
                </li>
              ))}
            </ul>
            <p className="label mt-5 text-ink-muted">Languages</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {languages.map((l) => (
                <li key={l} className="tag label">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
