import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { About, Focus, Work } from "./components/Sections";
import { Gallery, Writing } from "./components/Media";
import Contact from "./components/Contact";
import { useRevealScope } from "./hooks";

export default function App() {
  const scope = useRevealScope<HTMLDivElement>();

  return (
    <div ref={scope} className="relative min-h-screen bg-ink text-paper antialiased">
      {/* ambient layered background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-blueprint" />
        <div className="absolute -top-40 left-1/2 h-[540px] w-[820px] -translate-x-1/2 rounded-full bg-amber/[0.05] blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[560px] rounded-full bg-mint/[0.04] blur-[120px]" />
      </div>
      <div className="noise-overlay" aria-hidden />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Work />
        <Focus />
        <Gallery />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}
