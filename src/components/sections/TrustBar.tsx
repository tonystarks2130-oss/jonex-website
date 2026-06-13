import { Container } from "@/components/ui/primitives";
import { FLAGS } from "@/lib/flags";

/**
 * Trust bar (DESIGN_CONTRACT IA §3). Flag-driven: interim = the stack we build
 * on; swap to client logos when real ones exist (FLAGS.trustBarMode).
 */
const STACK = ["n8n", "cal.com", "Cloudinary", "Vercel", "OpenAI"];

export function TrustBar() {
  const label =
    FLAGS.trustBarMode === "client"
      ? "Trusted by teams across healthcare, e-commerce, and field operations"
      : "Engineered on a modern, secure automation stack";
  return (
    <div className="border-y border-border bg-bg-raised/40">
      <Container className="flex flex-col items-center gap-4 py-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted">
          {label}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {STACK.map((s) => (
            <li
              key={s}
              className="font-display text-sm font-semibold text-fg-muted/80"
            >
              {s}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
