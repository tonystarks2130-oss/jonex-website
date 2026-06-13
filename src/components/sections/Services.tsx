import { Globe, Smartphone, LayoutGrid } from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";
import { CONSULTING_SERVICES, ENGAGEMENT_MODELS } from "@/lib/content";

/**
 * Services / engagement models (DESIGN_CONTRACT IA §11). Brand-guide lists
 * verbatim + the missing build cards (website / mobile app / SaaS).
 */
const BUILD_CARDS = [
  { icon: Globe, title: "Website Build", body: "Premium marketing sites engineered to convert." },
  { icon: Smartphone, title: "Mobile App Build", body: "Native-grade apps for your operation and customers." },
  { icon: LayoutGrid, title: "SaaS Product", body: "Full product builds — from MVP to scaling platform." },
];

export function Services() {
  return (
    <Section>
      <Heading
        eyebrow="Services & Engagement"
        title="Consulting, builds, or a partner on retainer"
        intro="Engage us the way that fits — a one-off project, an embedded development partner, or fully managed operations."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {BUILD_CARDS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-[10px] border border-border bg-surface p-6"
          >
            <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg-muted">
            Consulting Services
          </h3>
          <ul className="mt-4 space-y-2">
            {CONSULTING_SERVICES.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-fg">
                <span className="text-accent">▹</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg-muted">
            Flexible Engagement Models
          </h3>
          <ul className="mt-4 space-y-2">
            {ENGAGEMENT_MODELS.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-fg">
                <span className="text-accent">▹</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
