import {
  HeartPulse,
  ShoppingCart,
  Wrench,
  Briefcase,
  Building2,
  HardHat,
  type LucideIcon,
} from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";
import { INDUSTRIES } from "@/lib/content";

/**
 * Industries (DESIGN_CONTRACT IA §7) — 6, Healthcare leads + deepest.
 * Copy verbatim from the brand guide.
 */
const ICONS: Record<string, LucideIcon> = {
  Healthcare: HeartPulse,
  "E-Commerce": ShoppingCart,
  "Home Services": Wrench,
  "Professional Services": Briefcase,
  "Multi-Location & Franchise Operations": Building2,
  "Construction & Field Operations": HardHat,
};

export function Industries() {
  return (
    <Section id="industries">
      <Heading
        eyebrow="Industries We Serve"
        title="Built for the operations that run your sector"
        intro="Healthcare is our flagship — real revenue-cycle automation, not just receptionists. Every vertical gets systems engineered to its workflow."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((ind) => {
          const Icon = ICONS[ind.name] ?? Briefcase;
          const flagship = ind.name === "Healthcare";
          return (
            <div
              key={ind.name}
              className={`glass-card lift rounded-[10px] p-6 ${
                flagship ? "ring-1 ring-accent/55" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold">
                  {ind.name}
                </h3>
                {flagship && (
                  <span className="ml-auto rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Flagship
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-fg-muted">
                {ind.segments}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {ind.solutions.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-border px-2 py-1 text-xs text-fg-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
