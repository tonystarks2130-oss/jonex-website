import type { ReactNode } from "react";

/** Centered max-width container with responsive gutters. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Vertical section rhythm (DESIGN_CONTRACT §Visual: py-24 md:py-36). */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`seam-top py-20 md:py-32 ${className}`}>
      <Container>
        <div data-reveal>{children}</div>
      </Container>
    </section>
  );
}

/** Small cyan eyebrow label above a heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
    </span>
  );
}

/** Section heading + optional intro, Space Grotesk display. */
export function Heading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-2xl space-y-4 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
        {title}
      </h2>
      {intro && <p className="text-lg leading-8 text-fg-muted">{intro}</p>}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
};

/** Link-styled button. Primary = cyan fill; ghost = hairline outline. */
export function Button({
  children,
  href = "#",
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex h-12 items-center justify-center gap-2 rounded-[10px] px-6 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-contrast hover:opacity-90"
      : "border border-border text-fg hover:border-accent hover:text-accent";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}
