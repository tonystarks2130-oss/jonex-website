"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/** View Transitions API — present in modern Chromium; absent in older Safari/FF. */
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

/**
 * Theme toggle (DESIGN_CONTRACT §Theme toggle spec). Real <button> with
 * aria-label; persists to localStorage. The swap is a smooth full-page
 * crossfade via the View Transitions API (snapshots the page and dissolves
 * text + gradients + glass together — no per-property snap or link "blink").
 * Falls back to the .theme-transition class crossfade where View Transitions
 * are unsupported, and to an instant swap under prefers-reduced-motion. The
 * no-flash script (ThemeScript) sets the initial theme before paint; this
 * reads it on mount.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function applyTheme(next: Theme) {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("jonex-theme", next);
    } catch {
      /* private mode / storage disabled — toggle still works for the session */
    }
    setTheme(next);
  }

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const doc = document as DocumentWithViewTransition;
    if (!reduceMotion && typeof doc.startViewTransition === "function") {
      // Smooth bitmap crossfade of the whole page (see ::view-transition in globals.css).
      doc.startViewTransition(() => applyTheme(next));
      return;
    }

    // Fallback: class-based color crossfade (no View Transitions support).
    if (!reduceMotion) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 400);
    }
    applyTheme(next);
  }

  const nextLabel = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} theme`}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border text-fg-muted transition-colors hover:text-accent ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
