"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver (DESIGN_CONTRACT §Motion). Mounted once in layout.
 *
 * Adds `.reveal-ready` to <html> on mount, which is what ARMS the hidden-state
 * CSS, so if JS never runs, `[data-reveal]` content stays fully visible (SEO/AEO
 * + a11y). Then an IntersectionObserver adds `.is-visible` as elements enter.
 * Honors prefers-reduced-motion (CSS neutralises the transform either way).
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    root.classList.add("reveal-ready");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
