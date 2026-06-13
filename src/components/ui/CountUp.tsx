"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up for stat numbers (DESIGN_CONTRACT §Motion). Extracts the first
 * integer in `value` (e.g. "100%", "~2 wks", "24/7") and animates 0→N when the
 * element first scrolls into view, re-assembling the surrounding text. Honors
 * prefers-reduced-motion (renders the final value instantly) and degrades to the
 * static value if there is no integer or no JS.
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const match = value.match(/\d+/);
  const target = match ? parseInt(match[0], 10) : null;
  const pre = match ? value.slice(0, match.index) : value;
  const post = match ? value.slice((match.index ?? 0) + match[0].length) : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target ?? 0);
  const done = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setN(target);
      return;
    }

    setN(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {pre}
      {target === null ? "" : n}
      {post}
    </span>
  );
}
