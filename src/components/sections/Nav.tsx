import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { CalButton } from "@/components/integrations/CalButton";
import { Container } from "@/components/ui/primitives";
import { BRAND } from "@/lib/content";

const LINKS = [
  { href: "#solutions", label: "Solutions" },
  { href: "#industries", label: "Industries" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

/** Sticky glass nav (DESIGN_CONTRACT IA §1). */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {BRAND.short}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CalButton className="hidden sm:inline-flex">
            Book a Free Strategy Call
          </CalButton>
        </div>
      </Container>
    </header>
  );
}
