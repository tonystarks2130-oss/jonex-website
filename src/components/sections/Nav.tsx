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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/70 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {BRAND.short}
          <span className="text-accent">.</span>
        </a>

        {/* Centered link cluster (Tara-style arrangement); flex-1 keeps it
            visually centered between the logo and the right actions. */}
        <nav
          className="hidden flex-1 items-center justify-center gap-9 md:flex"
          aria-label="Primary"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Hide booking CTA on phones (wrapper guarantees it, regardless of
              the button's own inline-flex); hero CTA carries mobile booking. */}
          <div className="hidden sm:block">
            <CalButton>Book a Free Strategy Call</CalButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
