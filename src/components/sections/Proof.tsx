import { Section, Heading } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/CountUp";

/**
 * Proof / results (DESIGN_CONTRACT IA §10) — capability stat block. These are
 * honest statements about how we deliver (always-on, fast to live, fully owned),
 * not fabricated client metrics. Named client outcomes/testimonials are added
 * only once we have real, consented results — never invented.
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
    </Section>
  );
}
