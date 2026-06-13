import { Section, Heading } from "@/components/ui/primitives";

/**
 * FAQ (DESIGN_CONTRACT IA §13) — objection-handling. Native <details> for
 * keyboard-accessible accordion (no JS). NEW objection copy, Creator-drafted
 * pending James approval; healthcare-compliance entry is the one taraai can't
 * answer.
 */
const FAQS = [
  {
    q: "I don't know exactly what I need yet.",
    a: "That's the point of the free strategy call. We map your operation, find the bottleneck, and tell you what's worth building — no obligation.",
  },
  {
    q: "How fast can we go live?",
    a: "Most builds go live in about two weeks: a strategy call, we build it, we test it with you, then ship.",
  },
  {
    q: "Do you handle healthcare data and compliance?",
    a: "Yes. We build compliance-conscious systems for clinics and healthcare groups — revenue-cycle automation, eligibility, and claims — with security designed in, not bolted on.",
  },
  {
    q: "Do we own what you build, or rent it?",
    a: "You own it. We engineer systems on your infrastructure — no rented black box you can't leave.",
  },
];

export function Faq() {
  return (
    <Section>
      <Heading
        eyebrow="Got Questions?"
        title="We have answers"
        align="center"
      />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-border border-y border-border">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-base font-semibold marker:content-none">
              {f.q}
              <span className="text-accent transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-7 text-fg-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
