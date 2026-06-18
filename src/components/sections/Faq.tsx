import { Section, Heading } from "@/components/ui/primitives";
import { FAQS } from "@/lib/content";

/**
 * FAQ (DESIGN_CONTRACT IA §13), objection-handling. Native <details> for
 * keyboard-accessible accordion (no JS). Copy lives in content.ts (shared with
 * the FAQPage JSON-LD); healthcare-compliance entry is the one taraai can't answer.
 */
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
