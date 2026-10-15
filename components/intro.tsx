"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useSyncExternalStore } from "react";
import { Logo } from "./logo";
import { Car } from "./photo-frame";

gsap.registerPlugin(useGSAP);

// The inline script in app/layout.tsx sets html[data-intro] to "play", or "skip" for reduced motion.
const subscribe = () => () => {};
const getMode = () => document.documentElement.dataset.intro ?? "skip";

const letters = [
  { ch: "T", color: "var(--yellow)" },
  { ch: "I", color: "var(--pink)" },
  { ch: "S", color: "var(--blue)" },
  { ch: "A", color: "var(--mint)" },
];

function markDone() {
  document.documentElement.dataset.intro = "done";
}

export function Intro() {
  const mode = useSyncExternalStore(subscribe, getMode, () => "play");
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const key = useRef<HTMLButtonElement>(null);
  const idle = useRef<gsap.core.Tween | null>(null);
  const show = useRef<gsap.core.Timeline | null>(null);

  function finish() {
    markDone();
    setDone(true);
  }

  useGSAP(
    () => {
      if (mode !== "play") return;
      key.current?.focus({ preventScroll: true });
      gsap.from(".intro-start", { y: 40, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" });
      idle.current = gsap.to(".intro-key", { y: -8, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1 });
      return () => show.current?.kill();
    },
    { scope: root, dependencies: [mode] },
  );

  function start() {
    if (show.current || !root.current) return;
    idle.current?.kill();
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({ onComplete: finish });
    show.current = tl;

    tl
      // the key sinks like a real keycap, then the start screen drops away
      .to(q(".intro-key"), { x: 8, y: 8, boxShadow: "0px 0px 0px rgba(0,0,0,0)", duration: 0.1, ease: "power1.in" })
      .to(q(".intro-start"), { y: 90, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, "+=0.12")
      .set(q(".intro-build"), { autoAlpha: 1 })
      // the road slides out, bricks fall and bounce into place
      .from(q(".intro-plate"), { scaleX: 0, duration: 0.4, ease: "power3.out" })
      .from(
        q(".intro-brick"),
        {
          y: () => -window.innerHeight * 0.9,
          rotation: () => gsap.utils.random(-30, 30),
          duration: 0.75,
          ease: "bounce.out",
          stagger: 0.11,
        },
        "-=0.1",
      )
      .from(q(".intro-tag"), { scale: 0, rotation: -25, duration: 0.4, ease: "back.out(3)" }, "-=0.15")
      // the car drives across the road; bricks hop as it passes
      .fromTo(q(".intro-car"), { x: "-15vw" }, { x: "115vw", duration: 1.4, ease: "power1.inOut" }, "+=0.05")
      .to(q(".intro-brick"), { y: -16, duration: 0.14, ease: "power1.out", yoyo: true, repeat: 1, stagger: 0.09 }, "<0.35")
      // curtain with hazard tape lifts to reveal the site
      .to(root.current, { yPercent: -100, duration: 0.75, ease: "power3.inOut" }, "+=0.1");
  }

  function skip() {
    idle.current?.kill();
    show.current?.kill();
    gsap.to(root.current, { yPercent: -100, duration: 0.45, ease: "power3.in", onComplete: finish });
  }

  if (mode !== "play" || done) return null;

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
      className="intro fixed inset-0 z-[100] overflow-hidden bg-paper"
      onKeyDown={(e) => e.key === "Escape" && skip()}
    >
      <div className="intro-dots absolute inset-0" aria-hidden />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
        <Logo />
        <button type="button" onClick={skip} className="btn btn-plain px-4 py-2.5 text-[15px]">
          Skip <span aria-hidden>→</span>
        </button>
      </div>

      {/* stage 1: press start */}
      <div className="intro-start absolute inset-0 grid place-items-center px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="label tag">Portfolio · Sao Kuntisa</p>
          <button
            ref={key}
            type="button"
            onClick={start}
            className="intro-key rounded-[10px] border-[3px] border-ink bg-yellow px-10 py-8 text-on-accent shadow-[10px_10px_0_var(--ink)] sm:px-16 sm:py-10"
          >
            <span className="block font-heading text-[clamp(36px,9vw,72px)] leading-none uppercase">Press start</span>
            <span lang="km" className="mt-3 block font-km text-lg font-medium sm:text-xl">
              ចុចដើម្បីចាប់ផ្ដើម
            </span>
          </button>
          <p className="label text-ink-muted">
            Click or press <kbd className="tag py-1">Enter ↵</kbd>
          </p>
        </div>
      </div>

      {/* stage 2: bricks build the name */}
      <div className="intro-build invisible absolute inset-0 grid place-items-center">
        <div className="relative flex flex-col items-center">
          <div className="flex items-end gap-[1.5vw] sm:gap-3">
            {letters.map((l) => (
              <span
                key={l.ch}
                style={{ "--brick": l.color } as React.CSSProperties}
                className="intro-brick relative grid aspect-square w-[clamp(52px,15vw,150px)] place-items-center border-[3px] border-ink bg-[var(--brick)] font-heading text-[clamp(34px,10vw,104px)] leading-none text-on-accent shadow-[6px_6px_0_var(--ink)]"
              >
                <span className="brick-studs" aria-hidden>
                  <span />
                  <span />
                </span>
                {l.ch}
              </span>
            ))}
          </div>

          {/* full-width road the bricks land on and the car drives along */}
          <div className="intro-plate baseplate light-island plate-yellow relative h-10 w-screen border-y-[3px] border-ink">
            <Car className="intro-car" />
          </div>

          <p className="intro-tag label mt-8 -rotate-2 border-[3px] border-ink bg-pink px-4 py-3 text-on-accent shadow-[4px_4px_0_var(--ink)]">
            Sao Kuntisa · Full Stack Developer
          </p>
        </div>

      </div>

      <div className="hazard absolute inset-x-0 bottom-0 h-7 border-t-[3px] border-b-0 border-on-accent" aria-hidden />
    </div>
  );
}
