import { Container } from "@/components/ui/primitives";
import { FLAGS } from "@/lib/flags";
import {
  SiOpenai,
  SiClaude,
  SiN8N,
  SiMake,
  SiZapier,
  SiElevenlabs,
  SiTwilio,
  SiAirtable,
  SiSupabase,
  SiCloudinary,
  SiCaldotcom,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

type StackItem = { label: string; Icon?: IconType };

const STACK: StackItem[] = [
  { label: "OpenAI", Icon: SiOpenai },
  { label: "Claude", Icon: SiClaude },
  { label: "n8n", Icon: SiN8N },
  { label: "Make", Icon: SiMake },
  { label: "Zapier", Icon: SiZapier },
  { label: "Vapi" },
  { label: "Retell" },
  { label: "ElevenLabs", Icon: SiElevenlabs },
  { label: "Twilio", Icon: SiTwilio },
  { label: "Airtable", Icon: SiAirtable },
  { label: "Pipedrive" },
  { label: "GoHighLevel" },
  { label: "Power Automate" },
  { label: "Supabase", Icon: SiSupabase },
  { label: "Cloudinary", Icon: SiCloudinary },
  { label: "cal.com", Icon: SiCaldotcom },
  { label: "Vercel", Icon: SiVercel },
  { label: "Grok" },
];

/**
 * Trust bar (DESIGN_CONTRACT IA §3). Flag-driven: interim = the stack we build
 * on; swap to client logos when real ones exist (FLAGS.trustBarMode).
 */
function StackLogo({ item }: { item: StackItem }) {
  const { Icon } = item;

  return (
    <li className="inline-flex items-center gap-2.5 whitespace-nowrap font-display text-sm font-semibold text-fg-muted transition-colors duration-200 hover:text-fg">
      {Icon ? <Icon className="h-6 w-6" aria-hidden /> : null}
      <span>{item.label}</span>
    </li>
  );
}

export function TrustBar() {
  const label =
    FLAGS.trustBarMode === "client"
      ? "Trusted by teams across healthcare, e-commerce, and field operations"
      : "The stack we build and automate on";

  return (
    <div className="border-y border-border bg-bg-raised/40">
      <Container className="flex flex-col items-center gap-4 py-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted">
          {label}
        </p>
        <div
          className="marquee-group marquee-mask w-full overflow-hidden"
          aria-label="Tools JoNex builds and automates on"
        >
          <div className="flex w-max animate-marquee">
            <ul className="flex shrink-0 items-center gap-10 pr-10 lg:gap-14 lg:pr-14">
              {STACK.map((item) => (
                <StackLogo key={item.label} item={item} />
              ))}
            </ul>
            <ul
              className="flex shrink-0 items-center gap-10 pr-10 lg:gap-14 lg:pr-14"
              aria-hidden="true"
            >
              {STACK.map((item) => (
                <StackLogo key={`${item.label}-duplicate`} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
