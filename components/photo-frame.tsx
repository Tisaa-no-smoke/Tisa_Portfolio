"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

type Side = "top" | "right" | "bottom" | "left";

// Must match the .car `drive` animation in globals.css.
const LOOP = 14;
// Typical board size; the frame is 380–440px wide, close enough for the timing to line up.
const BOARD_W = 410;
const BOARD_H = (BOARD_W * 5) / 4;

// When the car is over stud i, as seconds into the drive loop. Mirrors the `drive` keyframes:
// top edge 0–19.6%, right 22.6–47%, bottom 50–69.6% (right to left), left 72.6–97% (bottom to top).
function pressDelay(side: Side, i: number, count: number) {
  const len = side === "top" || side === "bottom" ? BOARD_W : BOARD_H;
  const f = (48 + (i * (len - 96)) / (count - 1)) / len; // studs start 40px in, plus half a stud
  const pct = { top: f * 19.6, right: 22.6 + f * 24.4, bottom: 50 + (1 - f) * 19.6, left: 72.6 + (1 - f) * 24.4 }[side];
  // the stud sinks just before the car's front wheels reach it
  return ((pct / 100) * LOOP - 0.25 + LOOP) % LOOP;
}

// Studs sit on the frame border like a toy baseplate; each edge has its own accent.
// The car presses each one down as it drives over, and it pops back up behind the car.
function Studs({ side, count, color }: { side: Side; count: number; color: string }) {
  const pos = {
    top: "top-0 inset-x-10 -translate-y-1/2 flex-row",
    bottom: "bottom-0 inset-x-10 translate-y-1/2 flex-row",
    left: "left-0 inset-y-10 -translate-x-1/2 flex-col",
    right: "right-0 inset-y-10 translate-x-1/2 flex-col",
  }[side];
  return (
    <div data-side={side} className={`pointer-events-none absolute z-10 flex justify-between ${pos}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        // the slot is what pops on during the build-in, so GSAP never touches the stud's CSS-animated scale
        <span key={i} className="pf-stud">
          <span className={`stud stud-press block ${color}`} style={{ animationDelay: `${pressDelay(side, i, count)}s` }} />
        </span>
      ))}
    </div>
  );
}

function Brick({ className, color }: { className: string; color: string }) {
  return (
    <span className={`pf-brick absolute z-20 grid size-10 place-items-center border-[3px] border-ink ${color} ${className}`} aria-hidden>
      <span className="size-4 rounded-full border-[3px] border-ink" />
    </span>
  );
}

// Split-flap label: words flip over in steps, like a departures board.
const FLAP_STEP = 3;
function Flap({ words }: { words: string[] }) {
  const period = FLAP_STEP * words.length;
  return (
    <span className="flap" style={{ "--flap-period": `${period}s` } as React.CSSProperties} aria-hidden>
      {words.map((w, i) => (
        // negative delays so every word is mid-cycle on load; the first one starts out showing
        <span key={w} style={{ animationDelay: `${((FLAP_STEP * i - 0.5 + period) % period) - period}s` }}>
          {w}
        </span>
      ))}
    </span>
  );
}

// Top-down toy car with headlights and a little exhaust trail.
export function Car({ className = "car" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <span className="car-beam" />
      <svg width="46" height="30" viewBox="0 0 46 30" className="relative">
        <rect x="6" y="1.5" width="9" height="5" fill="var(--ink)" />
        <rect x="30" y="1.5" width="9" height="5" fill="var(--ink)" />
        <rect x="6" y="23.5" width="9" height="5" fill="var(--ink)" />
        <rect x="30" y="23.5" width="9" height="5" fill="var(--ink)" />
        <rect x="1.5" y="5" width="42" height="20" fill="var(--pink)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="17" y="8.5" width="12" height="13" fill="var(--blue)" stroke="var(--ink)" strokeWidth="2.5" />
        <circle cx="23" cy="15" r="2.5" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
        <rect x="40" y="7" width="4" height="4" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
        <rect x="40" y="19" width="4" height="4" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      </svg>
      <span className="car-puff [animation-delay:0ms]" />
      <span className="car-puff [animation-delay:300ms]" />
      <span className="car-puff [animation-delay:600ms]" />
    </div>
  );
}

export function PhotoFrame() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const cleanups: (() => void)[] = [];

      // Pop-art shadow drifts toward the cursor, so the misprint shifts as you look around the page.
      if (matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
        const toX = gsap.quickTo(".pf-shadow", "x", { duration: 0.5, ease: "power3.out" });
        const toY = gsap.quickTo(".pf-shadow", "y", { duration: 0.5, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = root.current?.getBoundingClientRect();
          if (!r) return;
          const dx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2));
          const dy = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2));
          toX(dx * 10);
          toY(dy * 5);
        };
        addEventListener("pointermove", onMove);
        cleanups.push(() => removeEventListener("pointermove", onMove));
      }

      // The frame builds itself once the intro curtain is gone. Reduced-motion visitors skip the intro,
      // so they never get here and see the finished frame.
      if (html.dataset.intro === "play") {
        const q = gsap.utils.selector(root);
        const studs = [
          ...q('[data-side="top"] .pf-stud'),
          ...q('[data-side="right"] .pf-stud'),
          ...q('[data-side="bottom"] .pf-stud').reverse(),
          ...q('[data-side="left"] .pf-stud').reverse(),
        ];
        const tl = gsap
          .timeline({ paused: true })
          // board slides up, corner bricks drop and bounce, studs pop on clockwise
          .from(".pf-board", { y: 60, autoAlpha: 0, duration: 0.45, ease: "back.out(1.8)" })
          .from(
            ".pf-brick",
            { y: -160, rotation: () => gsap.utils.random(-40, 40), autoAlpha: 0, duration: 0.7, ease: "bounce.out", stagger: 0.08 },
            "-=0.15",
          )
          .from(studs, { scale: 0, duration: 0.22, ease: "back.out(3)", stagger: 0.025 }, "-=0.55")
          // photo prints top to bottom, then the shadow and the car appear
          .fromTo(
            ".pf-photo",
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "steps(10)", clearProps: "clipPath" },
            "-=0.4",
          )
          .from(".pf-shadow-wrap", { autoAlpha: 0, duration: 0.3, ease: "steps(3)" })
          // opacity only: a GSAP transform would fight the car's CSS translate/rotate
          .fromTo(".car", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "steps(4)" }, "<")
          // tags slap on like stickers and the frame shakes
          .from(".pf-tag", { scale: 1.8, rotation: (i) => (i ? -14 : 14), autoAlpha: 0, duration: 0.2, ease: "power4.in", stagger: 0.2 })
          .to(root.current, { x: 5, duration: 0.05, ease: "none", yoyo: true, repeat: 3 });

        // Wait for the intro to finish, then build when the frame is actually on screen.
        let io: IntersectionObserver | undefined;
        const mo = new MutationObserver(() => {
          if (html.dataset.intro === "play") return;
          mo.disconnect();
          io = new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;
              io?.disconnect();
              tl.play();
            },
            { threshold: 0.35 },
          );
          if (root.current) io.observe(root.current);
        });
        mo.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
        cleanups.push(() => {
          mo.disconnect();
          io?.disconnect();
        });
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[420px] px-5 pt-5 pb-8 lg:max-w-[480px]">
      <div className="relative aspect-[4/5]">
        {/* the board */}
        <div className="pf-board absolute inset-0 overflow-hidden border-[3px] border-ink bg-blue shadow-[10px_10px_0_var(--ink)]">
          <div className="board-grid absolute inset-0" aria-hidden />
          <div className="pf-shadow-wrap absolute inset-0" aria-hidden>
            <div className="pf-shadow pop-shadow" />
          </div>
          <Image
            src="/tisa-cutout.png"
            alt="Sao Kuntisa in a black suit, arms crossed"
            fill
            priority
            sizes="(min-width: 1024px) 480px, 90vw"
            className="pf-photo object-contain object-bottom pt-6"
          />
        </div>

        <Studs side="top" count={6} color="bg-yellow" />
        <Studs side="right" count={7} color="bg-mint" />
        <Studs side="bottom" count={6} color="bg-pink" />
        <Studs side="left" count={7} color="bg-blue" />

        <Brick className="-top-4 -left-4" color="bg-yellow" />
        <Brick className="-top-4 -right-4" color="bg-pink" />
        <Brick className="-bottom-4 -left-4" color="bg-mint" />
        <Brick className="-right-4 -bottom-4" color="bg-yellow" />

        {/* car drives around the border */}
        <div className="pointer-events-none absolute inset-0 z-30">
          <Car />
        </div>

        {/* floating tags */}
        <div className="bob absolute top-[44%] -right-3 z-20 sm:top-10 sm:-right-10">
          <span className="pf-tag label relative flex items-center gap-2 border-[3px] border-ink bg-yellow px-3 py-2 text-on-accent sm:px-4 sm:py-3 shadow-[4px_4px_0_var(--ink)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden>
              <path d="M4 20l4-1L19 8l-3-3L5 16l-1 4ZM14 7l3 3" />
            </svg>
            <span className="sr-only">Full stack developer, frontend first</span>
            <Flap words={["Full Stack Dev", "Frontend-first", "React · Next.js"]} />
          </span>
        </div>
        <div className="bob absolute bottom-12 -left-3 z-20 [animation-delay:-1.6s] sm:bottom-16 sm:-left-10">
          <span className="pf-tag label relative flex items-center gap-2 border-[3px] border-ink bg-pink px-3 py-2 text-on-accent sm:px-4 sm:py-3 shadow-[4px_4px_0_var(--ink)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden>
              <path d="M5 3l14 7-6 2-2 6-6-15ZM13 12l6 6" />
            </svg>
            UI &amp; Animation
          </span>
        </div>
      </div>
    </div>
  );
}
