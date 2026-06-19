"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { type Testimonial } from "@/lib/content";

/**
 * Testimonial showcase, modelled on the "Timed Cards Opening" hero pattern:
 * a full feature panel (eyebrow + large title + quote) on the left, a rail of
 * the other testimonials along the bottom, prev/next controls, a large counter,
 * and a timed progress bar. The featured panel is keyed by the active item, so
 * React replaces it outright on a swap (never two copies = no ghost) and the new
 * quote fades in. The rail loops magazine-style: clicking a card makes it active
 * and it slides to the front via a FLIP transition; every card keeps its slot
 * identity so the rest slide too. No images: the hero is a gradient.
 */

const AUTO_MS = 6000;
const SLIDE_MS = 450;

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="glass flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d={dir === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function FeaturedPanel({ item }: { item: Testimonial }) {
  const title = item.company ?? item.name;
  const showAttribution = Boolean(item.company);
  return (
    <div className="flex min-h-[12rem] flex-col lg:min-h-[16.75rem]">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {item.role}
      </span>
      <h3 className="mt-3 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-fg md:text-5xl">
        {title}
      </h3>
      <blockquote className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      {showAttribution && (
        <figcaption className="mt-6 flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-sm font-bold text-accent"
            aria-hidden
          >
            {item.initial}
          </span>
          <span className="font-display text-sm font-semibold text-fg">{item.name}</span>
        </figcaption>
      )}
    </div>
  );
}

export function TestimonialShowcase({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const railRefs = useRef<Array<HTMLButtonElement | null>>([]);
  // Left positions of each rail card (by item index) captured just before a
  // reorder, used to FLIP-slide them from their old slot to the new one.
  const prevLeft = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current && items.length > 1) {
        select((activeRef.current + 1) % items.length);
      }
    }, AUTO_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  function captureRailPositions() {
    const map = new Map<number, number>();
    railRefs.current.forEach((el, i) => {
      if (el) map.set(i, el.getBoundingClientRect().left);
    });
    prevLeft.current = map;
  }

  function select(i: number) {
    if (i === activeRef.current) return;
    if (!reducedRef.current) captureRailPositions();
    setActive(i);
  }

  // FLIP: after the rail reorders, slide each card from where it was to where
  // it landed. No view transitions, so nothing can ghost or blank the page.
  useLayoutEffect(() => {
    const prev = prevLeft.current;
    if (prev.size === 0 || reducedRef.current) return;
    railRefs.current.forEach((el, i) => {
      if (!el) return;
      const was = prev.get(i);
      if (was == null) return;
      const dx = was - el.getBoundingClientRect().left;
      if (!dx) return;
      el.style.transition = "none";
      el.style.transform = `translateX(${dx}px)`;
      window.requestAnimationFrame(() => {
        el.style.transition = `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
        el.style.transform = "";
      });
    });
    prevLeft.current = new Map();
  }, [active]);

  const pause = () => {
    pausedRef.current = true;
    setPaused(true);
  };
  const resume = () => {
    pausedRef.current = false;
    setPaused(false);
  };

  const current = items[active];
  if (!current) return null;
  // Magazine loop: list every card starting from the active one, wrapping.
  const order = Array.from({ length: items.length }, (_, k) => (active + k) % items.length);
  // Subtle per-slide glow shift so each card feels distinct without photos.
  const glowX = `${12 + (active / Math.max(1, items.length - 1)) * 64}%`;

  return (
    <div
      className="testimonial-hero relative mt-10 overflow-hidden rounded-3xl border border-border p-6 md:p-8"
      style={{ "--glow-x": glowX } as React.CSSProperties}
      onPointerEnter={pause}
      onPointerLeave={resume}
    >
      {/* Feature panel: keyed by active so it remounts (no ghost) + fades in */}
      <div className="relative max-w-3xl">
        <div key={active} className="tm-panel-in">
          <FeaturedPanel item={current} />
        </div>
      </div>

      {/* Controls + rail */}
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-3">
          <ArrowButton dir="prev" onClick={() => select((active - 1 + items.length) % items.length)} />
          <ArrowButton dir="next" onClick={() => select((active + 1) % items.length)} />
        </div>

        <ul
          className="flex gap-4 overflow-x-auto pb-2 lg:max-w-[44rem]"
          role="tablist"
          aria-label="Client testimonials"
        >
          {order.map((oi) => {
            const t = items[oi];
            return (
              <li key={t.name + t.role} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={oi === active}
                  ref={(el) => {
                    railRefs.current[oi] = el;
                  }}
                  onClick={() => select(oi)}
                  className={`tm-tile group relative flex h-44 w-40 flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-colors ${
                    oi === active
                      ? "border-accent/70"
                      : "border-border hover:border-accent/45"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-display text-base font-bold uppercase leading-tight tracking-tight text-fg">
                      {t.company ?? t.name}
                    </span>
                    {t.company && (
                      <span className="flex items-center gap-2">
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-xs font-bold text-accent"
                          aria-hidden
                        >
                          {t.initial}
                        </span>
                        <span className="truncate text-xs font-semibold text-fg">{t.name}</span>
                      </span>
                    )}
                  </div>
                  <div className="leading-tight">
                    {t.industry && (
                      <span className="block text-[11px] font-medium uppercase tracking-wide text-fg-muted">
                        {t.industry}
                      </span>
                    )}
                    {t.solution && (
                      <span className="mt-0.5 block text-xs font-semibold text-accent">
                        {t.solution}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Timed progress bar */}
      <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-fg/10">
        <span
          key={active}
          data-paused={paused}
          style={{ animationDuration: `${AUTO_MS}ms` }}
          className="timer-bar block h-full rounded-full bg-accent"
        />
      </div>
    </div>
  );
}
