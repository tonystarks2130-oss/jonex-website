import { Section, Heading } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/CountUp";
import { FLAGS } from "@/lib/flags";

/**
 * Proof / results (DESIGN_CONTRACT IA §10) — stat block + TEXT-ONLY mock
 * testimonials (no faces/video, initials only, Jeremy-swappable). All numbers
 * and quotes are `_draft`/`_mock` — clearly placeholder, never a real named
 * client. FLAGS.stats / FLAGS.testimonials gate the swap to real.
 */
const STATS = [
  { value: "24/7", label: "Calls answered, never missed" },
  { value: "~2 wks", label: "From kickoff to live" },
  { value: "100%", label: "Built and owned, no rented black box" },
];

const TESTIMONIALS = [
  {
    quote:
      "The AI receptionist booked appointments our front desk used to miss after hours. It paid for itself the first month.",
    initials: "RM",
    role: "Clinic Operations Lead",
  },
  {
    quote:
      "They didn't just hand us a tool — they mapped our workflow and built the system around it. That's the difference.",
    initials: "JD",
    role: "Founder, Home Services",
  },
];

export function Proof() {
  return (
    <Section className="border-y border-border bg-bg-raised/40">
      <Heading eyebrow="Results" title="Engineered to move the numbers that matter" />

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

      {FLAGS.testimonials === "mock" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.initials}
              className="lift rounded-[10px] border border-border bg-surface p-6"
            >
              <blockquote className="leading-7 text-fg">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs font-semibold text-fg-muted">
                  {t.initials}
                </span>
                <span className="text-sm text-fg-muted">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      <p className="mt-4 text-center text-xs text-fg-muted/70">
        Sample results — illustrative placeholders, replaced with verified client
        outcomes.
      </p>
    </Section>
  );
}
