/** Premium services section for JoNex offerings. */

import {
  ArrowRight,
  Bot,
  Boxes,
  Check,
  Compass,
  Globe,
  Hammer,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

import { Heading, Section } from "@/components/ui/primitives";
import { HELP_AREAS, SERVICE_OFFERINGS } from "@/lib/content";

const serviceIcons: LucideIcon[] = [Globe, Bot, Boxes];
const helpIcons: LucideIcon[] = [Compass, Hammer, LifeBuoy];

export function Services() {
  return (
    <Section>
      <Heading
        align="center"
        eyebrow="What We Build"
        title="AI Systems Built Around Your Business"
        intro="AI-powered systems for businesses that need more than a pretty website: from websites and automation to custom software and managed operations."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_OFFERINGS.map((service, index) => {
          const Icon = serviceIcons[index] ?? Globe;

          return (
            <article
              key={service.title}
              className="glass-card lift flex flex-col rounded-2xl p-7 lg:p-8"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-fg">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {service.description}
              </p>

              <p className="mt-3 text-xs text-fg-muted">
                <span className="font-semibold text-fg">Best for:</span>{" "}
                {service.bestFor.replace("Best for: ", "")}
              </p>

              <div className="mt-auto pt-6">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  Explore service
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 glass-panel rounded-3xl p-8 lg:mt-16 lg:p-12">
        <h3 className="font-display text-lg font-semibold text-fg">
          How We Help
        </h3>

        <div className="mt-8 grid gap-8 md:grid-cols-3 lg:gap-12">
          {HELP_AREAS.map((column, index) => {
            const Icon = helpIcons[index] ?? Compass;

            return (
              <div key={column.label}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-md bg-accent/10 p-1.5 text-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                    {column.label}
                  </h4>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-fg"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
