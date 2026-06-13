import { Phone, Headphones, Check } from "lucide-react";
import { CalButton } from "@/components/integrations/CalButton";
import { Container } from "@/components/ui/primitives";
import { HeroArtifact } from "@/components/sections/HeroArtifact";
import { HERO } from "@/lib/content";

/**
 * Hero (DESIGN_CONTRACT IA §2). H1 with ONE cyan word; dual CTA; proof strip.
 * Richness pass (2026-06-13): grid texture + ambient glows backdrop, glass pill
 * badges, gradient/glass CTAs, glass proof strip. Right column = HeroArtifact
 * (Live Call Visualizer) with floating outcome cards on desktop.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="hero-grid hero-glow relative overflow-hidden py-24 md:py-32 lg:py-36"
    >
      <Container className="grid items-start gap-14 md:grid-cols-2 md:gap-16 lg:gap-24 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:gap-28">
        <div>
          {/* glass pill badges */}
          <div className="flex flex-wrap gap-3">
            {HERO.badges.map((b, i) => (
              <span key={b} className="pill">
                {i === 0 && <span className="pill-dot" aria-hidden="true" />}
                {b}
              </span>
            ))}
          </div>
          <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-[4rem] xl:text-[4.25rem]">
            The AI that picks up your{" "}
            <span className="text-accent">phone</span> — and runs the operations
            behind it.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-fg-muted">
            {HERO.subhead}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CalButton>
              <Phone className="h-4 w-4" aria-hidden="true" /> Book a Free
              Strategy Call
            </CalButton>
            <a
              href="#hear-the-ai"
              className="glass inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold text-fg transition-colors hover:text-accent"
            >
              <Headphones className="h-4 w-4" aria-hidden="true" /> Listen to the
              AI
            </a>
          </div>
          {/* glass proof strip */}
          <ul className="glass mt-8 flex max-w-2xl flex-wrap gap-x-6 gap-y-2.5 rounded-2xl px-5 py-3.5">
            {HERO.proof.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 text-sm text-fg-muted"
              >
                <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* HeroArtifact — Live Call Visualizer + floating outcome cards. */}
        <HeroArtifact />
      </Container>
    </section>
  );
}
