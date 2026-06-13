import { Phone, Headphones } from "lucide-react";
import { CalButton } from "@/components/integrations/CalButton";
import { Container } from "@/components/ui/primitives";
import { HERO } from "@/lib/content";

const TRUST = ["Never misses a lead", "Sounds human", "Works 24/7"];

/**
 * Hero (DESIGN_CONTRACT IA §2). H1 with ONE cyan word; dual CTA; trust strip.
 * Right column = HeroArtifact placeholder slot (Decision 4 — rendered options
 * land before Phase 3; James chose "surprise me").
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-20 md:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted">
            {HERO.titleLead}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            The AI that picks up your{" "}
            <span className="text-accent">phone</span> — and runs the operations
            behind it.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-fg-muted">
            {HERO.subhead}
          </p>
          <div className="flex flex-wrap gap-3">
            <CalButton>
              <Phone className="h-4 w-4" aria-hidden="true" /> Book a Free
              Strategy Call
            </CalButton>
            <a
              href="#hear-the-ai"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-border px-6 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <Headphones className="h-4 w-4" aria-hidden="true" /> Listen to the
              AI
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {TRUST.map((t) => (
              <li key={t} className="text-sm text-fg-muted">
                <span className="mr-2 text-accent">▹</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* HeroArtifact placeholder slot — replaced in Phase 3 with the chosen render. */}
        <div
          aria-hidden="true"
          className="relative hidden aspect-square items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-surface to-bg-raised md:flex"
        >
          <span className="text-sm text-fg-muted">[ hero artifact ]</span>
        </div>
      </Container>
    </section>
  );
}
