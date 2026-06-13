import Image from "next/image";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { CalButton } from "@/components/integrations/CalButton";
import { Container } from "@/components/ui/primitives";
import { BRAND } from "@/lib/content";

const LINKS = [
  { href: "#solutions", label: "Solutions" },
  { href: "#industries", label: "Industries" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/** Sticky glass nav (DESIGN_CONTRACT IA §1). */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/70 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 font-display tracking-tight"
          aria-label="JoNeX — AI Technology & Consulting"
        >
          <Image
            src="/brand/jonex-icon.png"
            alt="JoNeX"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full ring-1 ring-border"
            priority
          />
          <span className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="text-lg font-bold">{BRAND.short}</span>
            <span
              className="hidden text-lg font-light text-fg-muted/40 xl:inline"
              aria-hidden="true"
            >
              |
            </span>
            <span className="hidden whitespace-nowrap text-sm font-medium text-fg-muted xl:inline">
              AI Technology &amp; Consulting
            </span>
          </span>
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
