import { About } from "@/components/about";
import { Contact, Footer } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Journey } from "@/components/journey";
import { Nav } from "@/components/nav";
import { Skills } from "@/components/skills";
import { Ticker } from "@/components/ticker";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <a href="#work" className="btn sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]">
        Skip to content
      </a>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Journey />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
