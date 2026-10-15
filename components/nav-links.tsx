"use client";

import { useEffect, useState } from "react";

export const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About me" },
  { href: "#work", label: "Project" },
  { href: "#contact", label: "Contact" },
];

// Page sections in order, and which menu link each one belongs to.
const sections: [id: string, link: string][] = [
  ["top", "#top"],
  ["about", "#about"],
  ["awards", "#about"],
  ["skills", "#about"],
  ["work", "#work"],
  ["contact", "#contact"],
];

function currentLink() {
  // At the very bottom the contact block may never reach the trigger line.
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) return "#contact";
  const line = window.scrollY + window.innerHeight * 0.35;
  let active = "#top";
  for (const [id, link] of sections) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= line) active = link;
  }
  return active;
}

export function NavLinks({ variant }: { variant: "desktop" | "mobile" }) {
  const [active, setActive] = useState("#top");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(currentLink()));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const base =
    variant === "desktop"
      ? "label block border-[2px] px-3 py-2 transition-colors duration-150"
      : "label block border-[2px] px-1.5 py-1.5 text-[11px] transition-colors duration-150 min-[375px]:px-2 min-[375px]:text-[12px]";

  return links.map((l) => {
    const on = active === l.href;
    return (
      <li key={l.href}>
        <a
          href={l.href}
          aria-current={on ? "location" : undefined}
          className={`${base} ${
            on
              ? "border-ink bg-yellow text-on-accent shadow-[2px_2px_0_var(--ink)]"
              : "border-transparent hover:border-ink hover:bg-yellow hover:text-on-accent"
          }`}
        >
          {l.label}
        </a>
      </li>
    );
  });
}
