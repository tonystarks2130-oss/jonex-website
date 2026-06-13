import { ShieldCheck, HeartPulse, Cpu } from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";

/**
 * About / Why JoNeX (DESIGN_CONTRACT IA §12) — engineered/secure/healthcare-
 * aware + the Filipino-reliability trust play (warm, global English; never
 * Taglish/peso). NEW copy, Creator-drafted pending James approval.
 */
const PILLARS = [
  {
    icon: Cpu,
    title: "Engineered, not wired",
    body: "Real software engineering and security awareness — the tier above no-code template shops.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare-aware",
    body: "Revenue-cycle and compliance-conscious systems built for regulated operations.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability you can trust",
    body: "The dedication the world already trusts from Filipino talent — loyal, reliable, engineered.",
  },
];

export function About() {
  return (
    <Section id="about">
      <Heading
        eyebrow="Why JoNeX"
        title="The reliability the world trusts — engineered into your operations"
        intro="We build and own what we ship. No rented black boxes, no template factory — systems designed around your business and supported like partners."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-4">
            <Icon
              className="mt-1 h-6 w-6 shrink-0 text-accent"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-fg-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
