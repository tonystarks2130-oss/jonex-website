import { AudioDemo } from "@/components/media/AudioDemo";
import { Container } from "@/components/ui/primitives";
import { VOICE_DEMOS } from "@/lib/integrations";
import { Check } from "lucide-react";

type DemoMeta = {
  title: string;
  description: string;
  badge: string;
  duration: string;
};

const DEMO_META: Record<string, DemoMeta> = {
  dental: {
    title: "Dental Clinic Receptionist",
    description: "New patient asks about availability and services.",
    badge: "Appointment inquiry",
    duration: "1:14 demo",
  },
  barbershop: {
    title: "Barbershop Receptionist",
    description: "Caller asks about schedule, pricing, and booking.",
    badge: "Booking request",
    duration: "0:58 demo",
  },
  "real-estate": {
    title: "Real Estate Agent",
    description: "Buyer asks about property details and viewing times.",
    badge: "Lead qualification",
    duration: "1:22 demo",
  },
};

const TRUST_PILLS = [
  "Answers naturally",
  "Captures caller details",
  "Books or routes next step",
];

export function HearTheAI() {
  return (
    <section
      id="hear-the-ai"
      className="seam-top border-y border-border bg-bg-raised/40 py-20 md:py-24"
    >
      <Container>
        <div data-reveal>
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              HEAR THE DIFFERENCE
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-fg md:text-4xl">
              Listen to JoNeX handle real customer calls
            </h2>
            <p className="text-lg leading-8 text-fg-muted">
              Hear how our AI receptionist answers questions, captures details,
              and guides callers to the right next step - naturally, calmly, and
              on-brand.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {TRUST_PILLS.map((pill) => (
              <span key={pill} className="pill inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-accent" />
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VOICE_DEMOS.map((demo) => {
              const meta = DEMO_META[demo.id] ?? {
                title: demo.label,
                description: "",
                badge: "Voice demo",
                duration: "Demo",
              };

              return (
                <AudioDemo
                  key={demo.id}
                  src={demo.src}
                  title={meta.title}
                  description={meta.description}
                  badge={meta.badge}
                  duration={meta.duration}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
