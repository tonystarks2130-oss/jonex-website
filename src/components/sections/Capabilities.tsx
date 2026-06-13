import { Bot, MessagesSquare, Workflow, Code2, type LucideIcon } from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";
import { CAPABILITIES } from "@/lib/content";

/**
 * Core capabilities (DESIGN_CONTRACT IA §8) — 4-item icon grid, real icons.
 * Labels verbatim from the brand guide.
 */
const ICONS: LucideIcon[] = [Bot, MessagesSquare, Workflow, Code2];
const BLURBS = [
  "Autonomous agents that reason, act, and complete real work end-to-end.",
  "Human-grade voice and chat that answer, qualify, and book — on every channel.",
  "Workflows wired across your tools so the busywork runs itself.",
  "Custom software built around your operation, not a rigid template.",
];

export function Capabilities() {
  return (
    <Section className="border-y border-border bg-bg-raised/40">
      <Heading
        eyebrow="Core Capabilities"
        title="Four building blocks. One engineered system."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((cap, i) => {
          const Icon = ICONS[i] ?? Bot;
          return (
            <div
              key={cap}
              className="lift rounded-[10px] border border-border bg-surface p-6"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-accent/30 bg-accent/5">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug">
                {cap}
              </h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{BLURBS[i]}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
