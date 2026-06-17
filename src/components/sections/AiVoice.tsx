import { PhoneCall } from "lucide-react";

import { Heading, Section } from "@/components/ui/primitives";
import { AI_VOICE_HIGHLIGHT } from "@/lib/content";

export function AiVoice() {
  const {
    eyebrow,
    title,
    intro,
    sampleClinic,
    sampleLabel,
    transcript,
    steps,
    capabilities,
  } = AI_VOICE_HIGHLIGHT;

  return (
    <Section id="ai-voice">
      <Heading eyebrow={eyebrow} title={title} intro={intro} />

      <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-6">
        <article className="glass-card lift rounded-[10px] p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <PhoneCall className="h-6 w-6 text-accent" aria-hidden="true" />
            <h3 className="font-display text-base font-semibold">
              {sampleClinic}
            </h3>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
              {sampleLabel}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {transcript.map((turn, index) => {
              const isAi = turn.speaker === "AI";

              return (
                <div
                  key={`${turn.speaker}-${index}`}
                  className={`flex ${isAi ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[10px] px-4 py-3 text-sm leading-6 ${
                      isAi
                        ? "bg-accent/10 text-fg"
                        : "border border-border bg-fg/[0.05] text-fg-muted"
                    }`}
                  >
                    <span
                      className={`mb-1 block text-[10px] font-semibold uppercase tracking-wider ${
                        isAi ? "text-accent" : "text-fg-muted"
                      }`}
                    >
                      {turn.speaker}
                    </span>
                    {turn.line}
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="glass-card lift rounded-[10px] p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Behind the call
          </p>

          <ol className="mt-6">
            {steps.map((step, index) => (
              <li
                key={step}
                className="relative flex gap-4 pb-6 last:pb-0 before:absolute before:bottom-0 before:left-[15px] before:top-8 before:w-px before:bg-border last:before:hidden"
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-bg">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-fg-muted">{step}</p>
              </li>
            ))}
          </ol>

          <ul className="mt-8 flex flex-wrap gap-2">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted"
              >
                {capability}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
