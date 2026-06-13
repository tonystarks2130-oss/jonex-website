import { Search, Workflow, Rocket } from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";

/**
 * Problem → outcome (DESIGN_CONTRACT IA §6) — the consultative "tier-above"
 * signal. NEW copy (Creator-drafted, pending James approval → CONTENT-NEW.md).
 */
const STEPS = [
  {
    icon: Search,
    title: "Identify Bottlenecks",
    body: "We map where time, leads, and revenue leak out of your operations — before writing a line of code.",
  },
  {
    icon: Workflow,
    title: "Build Intelligent Systems",
    body: "Engineered, secure automation and custom software that removes the bottleneck for good.",
  },
  {
    icon: Rocket,
    title: "Scale Operations",
    body: "Your team does more without adding headcount — the system carries the load as you grow.",
  },
];

export function ProblemOutcome() {
  return (
    <Section>
      <Heading
        eyebrow="How We Work"
        title="We don't sell tools. We engineer outcomes."
        intro="Most shops wire up a no-code template and walk away. We start with your operation, find what's actually slowing it down, and build the system that fixes it."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <div key={title} className="relative">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold text-accent">
                0{i + 1}
              </span>
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-2 leading-7 text-fg-muted">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
