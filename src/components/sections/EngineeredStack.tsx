// Engineered stack — categorized capability showcase.

import {
  Stethoscope,
  ShieldCheck,
  AudioLines,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Heading, Section } from "@/components/ui/primitives";
import { ENGINEERED_STACK } from "@/lib/content";

const icons: LucideIcon[] = [Stethoscope, ShieldCheck, AudioLines, Workflow];

export function EngineeredStack() {
  return (
    <Section>
      <Heading
        eyebrow="Our Engineered Stack"
        title="Enterprise systems, engineered end-to-end"
        intro="We work across the modern AI and automation stack — and go deep where it matters most: secure, HIPAA-aligned healthcare systems built on enterprise cloud, integrated with the clinical software you already run."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {ENGINEERED_STACK.map((layer, index) => {
          const Icon = icons[index] ?? Workflow;

          return (
            <article
              key={layer.label}
              className="glass-card lift rounded-[10px] p-6"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold">
                  {layer.label}
                </h3>
              </div>

              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-fg-muted">
                {layer.caption}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border px-2 py-1 text-xs text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
