// Healthcare specialty — JoNeX's flagship vertical, HIPAA-aligned positioning.

import {
  Cloud,
  ShieldCheck,
  Lock,
  Workflow,
  PhoneCall,
  Code2,
  Globe,
  Users,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

import { Heading, Section } from "@/components/ui/primitives";
import { HEALTHCARE_SPECIALTY } from "@/lib/content";

const trustIcons: LucideIcon[] = [Cloud, ShieldCheck, Lock, Workflow];
const capIcons: LucideIcon[] = [
  PhoneCall,
  Workflow,
  Code2,
  Globe,
  Users,
  LayoutDashboard,
];

export function HealthcareSpecialty() {
  const { eyebrow, title, intro, trustPoints, capabilities, servedSegments, disclosure } =
    HEALTHCARE_SPECIALTY;

  return (
    <Section id="healthcare">
      <Heading eyebrow={eyebrow} title={title} intro={intro} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point, index) => {
          const Icon = trustIcons[index] ?? ShieldCheck;

          return (
            <div key={point.label} className="glass-card lift rounded-[10px] p-5">
              <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-3 font-display text-base font-semibold">
                {point.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">
                {point.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap, index) => {
          const Icon = capIcons[index] ?? Workflow;

          return (
            <article
              key={cap.name}
              className={`glass-card lift rounded-[10px] p-6 ${
                cap.flagship ? "ring-1 ring-accent/55" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold">{cap.name}</h3>
                {cap.flagship && (
                  <span className="ml-auto rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Flagship
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-fg-muted">{cap.detail}</p>
            </article>
          );
        })}
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {servedSegments.map((seg) => (
          <li
            key={seg}
            className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted"
          >
            {seg}
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-fg-muted/80">
        {disclosure}
      </p>
    </Section>
  );
}
