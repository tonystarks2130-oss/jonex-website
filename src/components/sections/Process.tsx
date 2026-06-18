import { Section, Heading } from "@/components/ui/primitives";
import { SPEARHEAD } from "@/lib/content";

/**
 * Process (DESIGN_CONTRACT IA §9), 4 steps [KEEP] + "live in ~2 weeks"
 * anxiety-killer. NOTE: timeframe pending James's canonical call ("~2 weeks"
 * vs old FAQ "5 to 7 business days"), flagged in HANDOFF open items.
 */
const TIMEFRAMES = [
  "30-minute call",
  "We do the building",
  "You sign off",
  "Live in ~2 weeks",
];

export function Process() {
  return (
    <Section id="work">
      <Heading
        eyebrow="How It Works"
        title="From first call to live in about two weeks"
        intro="No long discovery decks. We scope it, build it, test it with you, and ship."
      />
      <ol className="mt-12 grid gap-6 md:grid-cols-4">
        {SPEARHEAD.process.map((step, i) => (
          <li key={step} className="relative">
            <span className="font-display text-4xl font-bold text-accent/30">
              0{i + 1}
            </span>
            <h3 className="mt-2 font-display text-lg font-semibold">{step}</h3>
            <p className="mt-1 text-sm text-fg-muted">{TIMEFRAMES[i]}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
