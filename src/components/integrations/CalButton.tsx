import type { ReactNode } from "react";
import { CAL } from "@/lib/integrations";

/**
 * Booking CTA. Carries the exact [data-cal-link] attributes; cal.com's
 * embed.js (loaded once by CalProvider) delegates clicks to open the popup.
 * Works for buttons rendered after hydration because embed.js binds on
 * document. Single source for every booking CTA on the page.
 */
export function CalButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold";
  const styles =
    variant === "primary"
      ? "btn-grad"
      : "glass text-fg transition-colors hover:border-accent hover:text-accent";
  return (
    <button
      type="button"
      data-cal-link={CAL.link}
      data-cal-config={JSON.stringify(CAL.config)}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
