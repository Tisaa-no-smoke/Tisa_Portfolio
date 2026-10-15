import type { Metadata, Viewport } from "next";
import { Archivo_Black, JetBrains_Mono, Jersey_10, Kantumruy_Pro, Silkscreen, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({ variable: "--font-archivo-src", weight: "400", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk-src", weight: ["400", "500", "700"], subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains-src", weight: ["400", "700"], subsets: ["latin"] });
const jersey = Jersey_10({ variable: "--font-jersey-src", weight: "400", subsets: ["latin"] });
const silkscreen = Silkscreen({ variable: "--font-pixel-src", weight: ["400", "700"], subsets: ["latin"] });
const kantumruy = Kantumruy_Pro({ variable: "--font-kantumruy-src", weight: ["400", "500", "700"], subsets: ["khmer"] });

export const metadata: Metadata = {
  title: "Sao Kuntisa (Tisa) — Full Stack Developer",
  description:
    "Full stack developer with a frontend specialty, and Software Development student at Norton University, Phnom Penh. Builds modern web apps end to end with React, Next.js, Laravel and Flask.",
  openGraph: {
    title: "Sao Kuntisa (Tisa) — Full Stack Developer",
    description: "A developer who loves turning ideas into reality.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF6E5" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

// Set the theme before paint so there is no flash of the wrong theme.
// Also decide whether the intro plays: on every load, except for visitors who prefer reduced motion.
const themeScript = `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}
try{document.documentElement.dataset.intro=matchMedia("(prefers-reduced-motion: reduce)").matches?"skip":"play"}catch(e){document.documentElement.dataset.intro="skip"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${archivo.variable} ${grotesk.variable} ${jetbrains.variable} ${kantumruy.variable} ${silkscreen.variable} ${jersey.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
