import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-2 border-[3px] border-ink bg-surface px-3 py-3 sm:gap-x-4 sm:px-4 shadow-[6px_6px_0_var(--ink)]"
      >
        <a href="#top" aria-label="Tisa, back to top">
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          <NavLinks variant="desktop" />
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href="#contact" className="btn px-4 py-2.5 text-[15px]">
            Hire me
          </a>
        </div>
        <ul className="-mx-3 mt-3 flex w-[calc(100%+1.5rem)] justify-between overflow-x-auto border-t-[3px] border-ink px-2 pt-2 [scrollbar-width:none] md:hidden">
          <NavLinks variant="mobile" />
        </ul>
      </nav>
    </header>
  );
}
