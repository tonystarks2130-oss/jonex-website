import { MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { BRAND, FOOTER_COPY } from "@/lib/content";
import { CONTACT } from "@/lib/integrations";

/**
 * Footer (DESIGN_CONTRACT IA §15) — brand-guide footer copy verbatim,
 * WhatsApp + Telegram message buttons, preserved legal links.
 * NOTE: WhatsApp/Telegram use generic Lucide marks for now (lucide dropped
 * brand glyphs) — swap to proper brand SVGs in Phase 2 polish.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-raised/40">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.5fr_1fr]">
        <div className="max-w-md space-y-4">
          <p className="font-display text-lg font-bold tracking-tight">
            {BRAND.short}
            <span className="text-accent">.</span>
          </p>
          <p className="text-sm font-semibold text-fg">{FOOTER_COPY.tagline}</p>
          <p className="text-sm leading-6 text-fg-muted">{FOOTER_COPY.blurb}</p>
          <p className="text-sm leading-6 text-fg-muted">
            {FOOTER_COPY.availability}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
            Message us
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={CONTACT.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] border border-border px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={CONTACT.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] border border-border px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Telegram {CONTACT.telegram.handle}
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-fg-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {FOOTER_COPY.name}. All rights reserved.
          </p>
          <nav className="flex gap-5" aria-label="Legal">
            <a href="/privacy" className="hover:text-fg">
              Privacy
            </a>
            <a href="/terms" className="hover:text-fg">
              Terms
            </a>
            <a href="/data-deletion" className="hover:text-fg">
              Data Deletion
            </a>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
