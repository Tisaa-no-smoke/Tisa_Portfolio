"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/lib/content";

gsap.registerPlugin(useGSAP);

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// 3×3 pixel checker for the top-right corner
const checker = [1, 0, 1, 0, 1, 0, 1, 0, 1];

export function IdBadge() {
  const swing = useRef<HTMLDivElement>(null);
  const idle = useRef<gsap.core.Tween | null>(null);
  const drag = useRef<{ x: number; id: number } | null>(null);

  function startIdle() {
    if (!swing.current || reducedMotion()) return;
    idle.current = gsap.fromTo(
      swing.current,
      { rotation: -2.5 },
      { rotation: 2.5, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 },
    );
  }

  // Drop in on a lanyard when Contact scrolls into view, then sway.
  useGSAP(
    () => {
      const el = swing.current;
      if (!el || reducedMotion()) return;
      gsap.set(el, { transformOrigin: "50% 0%", yPercent: -45, autoAlpha: 0 });
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          gsap
            .timeline({ onComplete: startIdle })
            .to(el, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "bounce.out" })
            .fromTo(el, { rotation: 10 }, { rotation: 0, duration: 1.4, ease: "elastic.out(1, 0.3)" }, 0.35);
        },
        { threshold: 0.25 },
      );
      io.observe(el);
      return () => io.disconnect();
    },
    { scope: swing },
  );

  // Drag sideways to swing it; let go and it springs back.
  function onPointerDown(e: React.PointerEvent) {
    if (!swing.current) return;
    idle.current?.kill();
    gsap.killTweensOf(swing.current);
    drag.current = { x: e.clientX, id: e.pointerId };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current || !swing.current) return;
    const rotation = gsap.utils.clamp(-28, 28, (e.clientX - drag.current.x) * -0.18);
    gsap.to(swing.current, { rotation, duration: 0.2, ease: "power2.out" });
  }
  function onPointerUp() {
    if (!drag.current || !swing.current) return;
    drag.current = null;
    gsap.to(swing.current, { rotation: 0, duration: 1.6, ease: "elastic.out(1, 0.22)", onComplete: startIdle });
  }

  return (
    <div className="light-island relative mx-auto w-full max-w-[280px] sm:max-w-[310px] lg:w-[310px]">
      <div ref={swing} className="flex flex-col items-center">
        {/* lanyard + clip */}
        <div className="badge-strap h-40 w-10 border-x-[3px] border-ink lg:h-52" aria-hidden />
        <div className="relative -mt-1 grid h-10 w-7 place-items-start justify-center rounded-b-md border-[3px] border-ink bg-ink" aria-hidden>
          <span className="mt-1 h-4 w-3 rounded-full border-[3px] border-yellow" />
        </div>

        {/* the card */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative -mt-1 w-full cursor-grab touch-pan-y overflow-hidden rounded-[14px] border-[3px] border-ink bg-white shadow-[8px_8px_0_var(--ink)] select-none active:cursor-grabbing"
        >
          {/* slot, heart, checker */}
          <span className="absolute top-3 left-1/2 h-3.5 w-16 -translate-x-1/2 rounded-full border-[3px] border-ink bg-paper" aria-hidden />
          <span className="absolute top-3 left-3 grid size-8 place-items-center border-[3px] border-ink bg-pink" aria-hidden>
            <svg width="16" height="14" viewBox="0 0 8 7" shapeRendering="crispEdges" fill="white">
              <path d="M1 0h2v1h2V0h2v1h1v2H7v1H6v1H5v1H4v1H4V6H3V5H2V4H1V3H0V1h1z" />
            </svg>
          </span>
          <span className="absolute top-3 right-3 grid grid-cols-3" aria-hidden>
            {checker.map((on, i) => (
              <span key={i} className={`size-2 ${on ? "bg-pink" : "bg-transparent"}`} />
            ))}
          </span>

          <div className="px-5 pt-14 pb-9">
            {/* photo in a brick frame */}
            <div className="relative">
              <div className="badge-studs h-5 border-[3px] border-b-0 border-ink bg-yellow" aria-hidden />
              <div className="relative aspect-[5/5.2] overflow-hidden border-[3px] border-ink bg-blue">
                <div className="board-grid absolute inset-0" aria-hidden />
                <Image
                  src="/tisa-cutout.png"
                  alt={`${profile.name} in a black suit`}
                  fill
                  sizes="310px"
                  draggable={false}
                  className="object-contain object-bottom pt-3"
                />
              </div>
              {/* side bricks */}
              <span className="absolute top-8 -right-3 flex w-5 flex-col items-center gap-1.5 border-[3px] border-ink bg-pink py-2" aria-hidden>
                <span className="size-2.5 rounded-full border-2 border-ink" />
                <span className="size-2.5 rounded-full border-2 border-ink" />
                <span className="size-2.5 rounded-full border-2 border-ink" />
              </span>
              <span className="absolute bottom-6 -left-3 h-16 w-5 border-[3px] border-ink bg-mint" aria-hidden>
                <span className="mx-auto mt-2 block size-2.5 rounded-full border-2 border-ink" />
              </span>
              {/* little brick pile */}
              <span className="absolute -right-3 -bottom-3 flex flex-col items-end" aria-hidden>
                <span className="relative h-6 w-12 border-[3px] border-ink bg-pink">
                  <span className="absolute -top-2 left-1.5 h-2 w-3 rounded-t-sm border-[3px] border-b-0 border-ink bg-pink" />
                  <span className="absolute -top-2 right-1.5 h-2 w-3 rounded-t-sm border-[3px] border-b-0 border-ink bg-pink" />
                </span>
                <span className="-mt-[3px] h-6 w-16 border-[3px] border-ink bg-yellow" />
              </span>
            </div>

            {/* name */}
            <div className="mt-6 border-[3px] border-ink px-4 pt-3 pb-2 shadow-[4px_4px_0_var(--ink)]">
              <p className="font-[family-name:var(--font-pixel-tall)] text-[46px] leading-[0.82] tracking-wide uppercase">
                Sao
                <br />
                <span className="badge-name-accent">Kuntisa</span>
              </p>
            </div>

            {/* role pill */}
            <div className="mt-5 flex items-center">
              <p className="label flex items-center gap-2 rounded-full border-[3px] border-ink bg-yellow px-3 py-2 text-[11px]">
                <span className="size-3 rounded-full border-2 border-ink bg-pink" />
                {profile.role}
              </p>
              <span className="h-[3px] flex-1 bg-ink" />
              <span className="size-3 border-[3px] border-ink bg-pink" />
            </div>
          </div>

          {/* stud strip along the bottom */}
          <div className="badge-bottom absolute inset-x-0 bottom-0 h-5 border-t-[3px] border-ink" aria-hidden />
        </div>
      </div>
    </div>
  );
}
