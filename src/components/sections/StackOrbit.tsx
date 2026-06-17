import type { CSSProperties } from "react";
import {
  SiClaude,
  SiN8N,
  SiTwilio,
  SiOpenai,
  SiElevenlabs,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiGithub,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Stethoscope } from "lucide-react";

import { Heading, Section } from "@/components/ui/primitives";
import { STACK_ORBIT_COPY } from "@/lib/content";

type Chip = { label: string; Icon?: IconType };

// Curated highlights (the full list lives in the Engineered Stack grid above).
// Mix of real brand glyphs + clean wordmarks for the marks without an icon.
const INNER: Chip[] = [
  { label: "Claude", Icon: SiClaude },
  { label: "Azure" },
  { label: "Epic" },
  { label: "n8n", Icon: SiN8N },
  { label: "athenahealth" },
  { label: "Twilio", Icon: SiTwilio },
];

const OUTER: Chip[] = [
  { label: "Azure OpenAI", Icon: SiOpenai },
  { label: "AWS" },
  { label: "ElevenLabs", Icon: SiElevenlabs },
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "PostgreSQL", Icon: SiPostgresql },
  { label: "ModMed" },
  { label: "React", Icon: SiReact },
  { label: "GitHub", Icon: SiGithub },
];

function ChipView({ chip }: { chip: Chip }) {
  const { Icon } = chip;
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface/85 px-3 py-1.5 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.55)] backdrop-blur">
      {Icon ? <Icon className="h-4 w-4 text-fg" aria-hidden="true" /> : null}
      <span className="font-display text-xs font-semibold text-fg-muted">
        {chip.label}
      </span>
    </div>
  );
}

function OrbitRing({
  chips,
  radius,
  durationSec,
  reverse = false,
}: {
  chips: Chip[];
  radius: number; // percent of container half-size, from center
  durationSec: number;
  reverse?: boolean;
}) {
  const ringDir = reverse ? "orbit-rotate-rev" : "orbit-rotate";
  const chipDir = reverse ? "orbit-rotate" : "orbit-rotate-rev";
  const dur = { "--orbit-dur": `${durationSec}s` } as CSSProperties;

  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60"
        style={{ width: `${radius * 2}%`, height: `${radius * 2}%` }}
        aria-hidden="true"
      />
      <div className={`absolute inset-0 ${ringDir}`} style={dur}>
        {chips.map((chip, i) => {
          const theta = (i / chips.length) * 2 * Math.PI - Math.PI / 2;
          const left = 50 + radius * Math.cos(theta);
          const top = 50 + radius * Math.sin(theta);
          return (
            <div
              key={chip.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className={chipDir} style={dur}>
                <ChipView chip={chip} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function StackOrbit() {
  const { eyebrow, title, intro } = STACK_ORBIT_COPY;

  return (
    <Section id="stack-orbit" className="border-y border-border bg-bg-raised/40">
      <Heading eyebrow={eyebrow} title={title} intro={intro} />

      <div className="relative mx-auto mt-10 aspect-square w-full max-w-[600px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <OrbitRing chips={OUTER} radius={42} durationSec={80} />
        <OrbitRing chips={INNER} radius={26} durationSec={58} reverse />

        {/* Center clinician core — placeholder glyph; the AI-doctor image swaps in here. */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div
            className="flex h-28 w-28 items-center justify-center rounded-full border border-accent/40 bg-surface sm:h-32 sm:w-32"
            style={{
              boxShadow:
                "0 0 60px -8px color-mix(in srgb, var(--accent) 55%, transparent)",
            }}
          >
            <Stethoscope className="h-12 w-12 text-accent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Section>
  );
}
