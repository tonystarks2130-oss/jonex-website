"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

/**
 * Nav search: a magnifier button that opens a small input with live suggestions
 * for the page's sections. Picking one (click, Enter, or arrow keys) smooth
 * scrolls to that section. Targets are the real section ids on the page.
 */
type Entry = { id: string; label: string; keywords: string };

const INDEX: Entry[] = [
  { id: "top", label: "Home", keywords: "home top start" },
  { id: "solutions", label: "Solutions & Services", keywords: "services build software website app saas custom" },
  { id: "industries", label: "Industries", keywords: "healthcare ecommerce home services professional construction sectors" },
  { id: "healthcare", label: "Healthcare", keywords: "hipaa clinic medical dental ehr compliance" },
  { id: "ai-voice", label: "AI Voice Agent", keywords: "voice call receptionist phone agent dex answering" },
  { id: "hear-the-ai", label: "Hear the AI", keywords: "audio demo sample listen recording" },
  { id: "stack-orbit", label: "Engineered Stack", keywords: "integrations tech stack modmed azure aws automation" },
  { id: "work", label: "Our Work", keywords: "work clients testimonials reviews proof results stories" },
  { id: "behind", label: "Behind JoNex", keywords: "team founders people jeremy jimmy james" },
  { id: "about", label: "About", keywords: "about company who mission" },
];

export function NavSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? INDEX.filter((e) => `${e.label} ${e.keywords}`.toLowerCase().includes(q))
    : INDEX;

  useEffect(() => {
    // preventScroll: focusing the input must not yank the page to the top.
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setHighlight(0);
  }

  function go(id: string) {
    close();
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[highlight];
      if (r) go(r.id);
    } else if (e.key === "Escape") {
      close();
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label="Search the site"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border text-fg-muted transition-colors hover:text-accent"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-bg-raised shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlight(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Search the site..."
              className="w-full bg-transparent py-3 text-sm text-fg outline-none placeholder:text-fg-muted"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto p-1.5">
            {results.length === 0 ? (
              <li className="px-3 py-2 text-sm text-fg-muted">No matches</li>
            ) : (
              results.map((r, i) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => go(r.id)}
                    className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      i === highlight ? "bg-accent/10 text-fg" : "text-fg-muted"
                    }`}
                  >
                    {r.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
