import { CalButton } from "@/components/integrations/CalButton";
import { Container } from "@/components/ui/primitives";
import { SPEARHEAD } from "@/lib/content";

/**
 * Final CTA (DESIGN_CONTRACT IA §14), last booking ask + free-audit de-risk.
 */
export function FinalCta() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-surface to-bg-raised p-10 text-center md:p-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Find your biggest bottleneck for free.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-fg-muted">
            Book a 30-minute strategy call. We'll map where your operation leaks
            time and revenue, and tell you what's worth building. No pitch deck.
          </p>
          <div className="mt-8 flex justify-center">
            <CalButton>{SPEARHEAD.primaryCta}</CalButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
