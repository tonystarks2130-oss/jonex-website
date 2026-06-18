"use client";

import { useEffect, useRef } from "react";

type Bubble = {
  label: string;
  logo: string;
  size: number;
  /** roam-zone centre as % of the orbit container */
  cx: number;
  cy: number;
  /** wander amplitude in px */
  ax: number;
  ay: number;
  /** wander speed + phase so each swims differently */
  fx: number;
  fy: number;
  px: number;
  py: number;
};

/** Cloud + security services, each roaming its own zone around the figure. */
const BUBBLES: Bubble[] = [
  { label: "Azure",         logo: "/logos/azure.svg",         size: 96, cx: 50, cy: 11, ax: 44, ay: 28, fx: 0.11, fy: 0.15, px: 0.0, py: 1.1 },
  { label: "AWS",           logo: "/logos/aws.svg",           size: 90, cx: 84, cy: 31, ax: 38, ay: 40, fx: 0.13, fy: 0.10, px: 2.0, py: 0.4 },
  { label: "Azure Monitor", logo: "/logos/azure-monitor.svg", size: 92, cx: 84, cy: 71, ax: 40, ay: 38, fx: 0.09, fy: 0.16, px: 3.4, py: 2.2 },
  { label: "Blob Storage",  logo: "/logos/blob-storage.png",  size: 92, cx: 50, cy: 90, ax: 46, ay: 24, fx: 0.14, fy: 0.11, px: 1.3, py: 3.0 },
  { label: "Key Vault",     logo: "/logos/key-vault.svg",     size: 90, cx: 16, cy: 71, ax: 38, ay: 40, fx: 0.10, fy: 0.17, px: 4.7, py: 1.7 },
  { label: "Entra ID",      logo: "/logos/entra-id.svg",      size: 92, cx: 16, cy: 31, ax: 38, ay: 40, fx: 0.16, fy: 0.12, px: 5.5, py: 4.1 },
];

const FLEE_RADIUS = 150; // px - how close the cursor gets before it bolts
const FLEE_STRENGTH = 120; // px - how hard it darts away
const EASE = 0.1; // approach factor per frame (lower = more fluid glide)

export function OrbitBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Raw client coords only, we resolve them against the cached rect inside
    // the animation frame, so pointermove never forces a layout (that was the
    // stutter when the cursor approached the bubbles).
    const pointer = { clientX: -9999, clientY: -9999, active: false };
    // current position in px (seeded to roam-centre on first frame)
    const pos = BUBBLES.map(() => ({ x: 0, y: 0, seeded: false }));

    const onMove = (e: PointerEvent) => {
      pointer.clientX = e.clientX;
      pointer.clientY = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    // The bubble layer itself is pointer-transparent (so the integration tiles
    // underneath stay hoverable); track the cursor on the stage instead.
    const tracker =
      (container.closest(".stack-orbit-stage") as HTMLElement | null) ??
      container;
    tracker.addEventListener("pointermove", onMove);
    tracker.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const t = (now - startedAt) / 1000;
      const r = container.getBoundingClientRect();
      const pointerX = pointer.clientX - r.left;
      const pointerY = pointer.clientY - r.top;

      BUBBLES.forEach((b, i) => {
        const el = bubbleRefs.current[i];
        if (!el) return;

        // free-roaming wander path (Lissajous) around its zone
        let targetX = (b.cx / 100) * r.width + b.ax * Math.sin(t * b.fx * Math.PI * 2 + b.px);
        let targetY = (b.cy / 100) * r.height + b.ay * Math.sin(t * b.fy * Math.PI * 2 + b.py);

        const p = pos[i];
        if (!p.seeded) {
          p.x = targetX;
          p.y = targetY;
          p.seeded = true;
        }

        // flee the cursor
        if (pointer.active) {
          const dx = p.x - pointerX;
          const dy = p.y - pointerY;
          const dist = Math.hypot(dx, dy) || 0.001;
          if (dist < FLEE_RADIUS) {
            const push = (1 - dist / FLEE_RADIUS) * FLEE_STRENGTH;
            targetX += (dx / dist) * push;
            targetY += (dy / dist) * push;
          }
        }

        // keep it inside the container
        const m = b.size / 2;
        targetX = Math.min(Math.max(targetX, m), r.width - m);
        targetY = Math.min(Math.max(targetY, m), r.height - m);

        p.x += (targetX - p.x) * EASE;
        p.y += (targetY - p.y) * EASE;
        el.style.transform = `translate(-50%, -50%) translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px)`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      tracker.removeEventListener("pointermove", onMove);
      tracker.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-[25]">
      {BUBBLES.map((b, i) => (
        <div
          key={b.label}
          ref={(el) => {
            bubbleRefs.current[i] = el;
          }}
          className="orbit-bubble absolute left-0 top-0"
          style={{ width: b.size, height: b.size }}
        >
          <span className="orbit-bubble-mark flex h-full w-full flex-col items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.logo} alt="" className="orbit-bubble-glyph" />
            <span className="orbit-bubble-name">{b.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
