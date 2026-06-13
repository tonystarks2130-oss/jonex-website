import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "@/components/ui/primitives";
import { Footer } from "@/components/sections/Footer";
import { BRAND } from "@/lib/content";

/**
 * Shared chrome for the legal routes (privacy / terms / data-deletion).
 * Minimal header (the homepage Nav uses in-page anchors that don't resolve
 * off "/"), a readable prose container on the token system, then the shared
 * Footer. Child legal copy is rendered verbatim from the prior site.
 *
 * Prose is styled via child-selectors so each policy page can be written as
 * clean semantic JSX (h2 / p / ul / a) without per-element classes.
 */
export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <a href="/" className="font-display text-lg font-bold tracking-tight">
            {BRAND.short}
            <span className="text-accent">.</span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to site
            </a>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main className="flex-1 py-16 md:py-24">
        <Container className="max-w-3xl">
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-fg-muted">Last updated: {lastUpdated}</p>
          <div className="mt-10 space-y-6 [&_a]:text-accent [&_a:hover]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg [&_li]:text-fg-muted [&_li]:leading-7 [&_p]:leading-7 [&_p]:text-fg-muted [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
            {children}
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
