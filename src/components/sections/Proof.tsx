import { Section, Heading } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/CountUp";
import { TESTIMONIALS } from "@/lib/content";
import { TestimonialShowcase } from "@/components/sections/TestimonialShowcase";

/**
 * Proof / results (DESIGN_CONTRACT IA §10). Two bands:
 *  1. Capability stats: honest statements about how we deliver (always-on,
 *     fast to live, fully owned), not fabricated client metrics.
 *  2. Client testimonials: REAL, team-supplied (content.ts TESTIMONIALS).
 *     Rendered as a floating field of teaser cards; click one for the full
 *     verbatim quote in a modal. Names are first name + last initial only.
 */
const STATS = [
  { value: "24/7", label: "Calls answered, never missed" },
  { value: "~2 wks", label: "From kickoff to live" },
  { value: "100%", label: "Built and owned, no rented black box" },
];

export function Proof() {
  return (
    <Section className="border-y border-border bg-bg-raised/40">
      <Heading eyebrow="What you can count on" title="Built to deliver where it matters" />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="lift rounded-[10px] border border-border bg-surface p-6 text-center"
          >
            <div className="font-display text-4xl font-bold text-accent">
              <CountUp value={s.value} />
            </div>
            <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Heading
          eyebrow="What clients say"
          title="Trusted by the businesses we build for"
          intro="Tap any name to open their story."
        />
        <TestimonialShowcase items={TESTIMONIALS} />
      </div>
    </Section>
  );
}
