import { PhoneCall, TrendingUp, UserCheck, Clock } from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";
import { SPEARHEAD } from "@/lib/content";

/**
 * Spearhead (DESIGN_CONTRACT IA §4), the demoable AI-receptionist hook.
 * Live-site copy [KEEP], elevated.
 */
const CARDS = [
  {
    icon: UserCheck,
    title: "Sounds Like a Real Person",
    body: "Natural conversation that callers can't tell from a human receptionist.",
  },
  {
    icon: PhoneCall,
    title: "Never Lose a Lead",
    body: "Answers every call, day or night, and captures the details automatically.",
  },
  {
    icon: TrendingUp,
    title: "More Calls, More Revenue",
    body: "Books appointments and qualifies leads while your team focuses on the work.",
  },
  {
    icon: Clock,
    title: "Never Clocks Out",
    body: "An AI team member that works 24/7, so your business runs even when you don't.",
  },
];

export function Spearhead() {
  return (
    <Section id="solutions">
      <Heading
        eyebrow="AI Voice Agents"
        title={SPEARHEAD.headline}
        intro="A receptionist that sounds human, never misses a lead, and works around the clock: the spearhead of a fully engineered operations system."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-[10px] border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
