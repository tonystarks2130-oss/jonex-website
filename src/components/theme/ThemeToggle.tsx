"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/**
 * Theme toggle (DESIGN_CONTRACT §Theme toggle spec). Real <button> with
 * aria-label; persists to localStorage; animates the swap via the
 * .theme-transition class (added only on click, removed after the fade) so
 * the no-flash script never animates on first load. The no-flash script
 * (ThemeScript) sets the initial theme before paint; this reads it on mount.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    try {
      localStorage.setItem("jonex-theme", next);
    } catch {
      /* private mode / storage disabled — toggle still works for the session */
    }
    setTheme(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
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
