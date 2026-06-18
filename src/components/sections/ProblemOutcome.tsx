import {
  ShieldCheck,
  Users,
  Laptop,
  ScrollText,
  Lock,
  DatabaseBackup,
  ShieldAlert,
  LockKeyhole,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";

/**
 * "How We Work" — the security baseline every engagement runs on. Healthcare
 * buyers scrutinise this, so each control is paired with a plain-English "what
 * it means for you" line (from the JoNeX blueprint's ten core controls).
 */
type Control = { icon: LucideIcon; title: string; body: string };

const CONTROLS: Control[] = [
  { icon: ShieldCheck, title: "Multi-factor authentication", body: "A stolen password alone never gets into your systems." },
  { icon: Users, title: "Role-based access", body: "People see only what their role needs — nothing more." },
  { icon: Laptop, title: "Device encryption", body: "Every machine that touches your data is fully encrypted." },
  { icon: ScrollText, title: "Audit logging", body: "Every access is recorded: who, what, and when." },
  { icon: Lock, title: "Encrypted data", body: "Protected at rest and in transit, end to end." },
  { icon: DatabaseBackup, title: "Tested backups", body: "Encrypted backups, restore-tested — nothing gets lost." },
  { icon: ShieldAlert, title: "Incident response", body: "A documented plan in place before anything goes wrong." },
  { icon: LockKeyhole, title: "Least-privilege access", body: "Access is minimal and pulled the moment it isn't needed." },
  { icon: GraduationCap, title: "Security training", body: "The whole team is trained to handle PHI safely." },
  { icon: ClipboardCheck, title: "Vendor vetting", body: "Every third-party tool is assessed before it touches your data." },
];

export function ProblemOutcome() {
  return (
    <Section>
      <Heading
        eyebrow="How We Work"
        title="Secure by default — at every step."
        intro="We deploy into your own cloud and build on a ten-point security baseline — the same controls on every engagement, so patient data is protected from day one."
      />

      <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CONTROLS.map(({ icon: Icon, title, body }, i) => (
          <li
            key={title}
            className="glass-card lift flex flex-col rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-black tracking-wide text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-sm font-semibold leading-snug">
              {title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
