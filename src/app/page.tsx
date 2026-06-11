import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { BRAND, HERO } from "@/lib/content";

/**
 * Foundation placeholder — proves the token system + theme toggle render
 * before the 15 IA sections (Phase 1b) replace this. Uses only tokens.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            {BRAND.short}
          </span>
          <ThemeToggle />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">
            {HERO.titleLead}
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Technology <span className="text-accent">Consulting</span>
          </h1>
          <p className="max-w-xl text-lg leading-8 text-fg-muted">
            {HERO.subhead}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {HERO.capabilityStrip.map((c) => (
            <span
              key={c}
              className="rounded-[10px] border border-border bg-surface px-3 py-1.5 text-sm text-fg-muted"
            >
              {c}
            </span>
          ))}
        </div>

        <p className="text-sm text-fg-muted">
          Foundation scaffold — token system + dark/light theme live. The 15 IA
          sections land next.
        </p>
      </div>
    </main>
  );
}
