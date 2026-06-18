"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Section, Heading } from "@/components/ui/primitives";
import {
  ORBIT_INTEGRATIONS,
  STACK_ORBIT_COPY,
  type OrbitIntegration,
} from "@/lib/content";

import { OrbitBubbles } from "./OrbitBubbles";

type OrbitIntegrationTile = OrbitIntegration & {
  orbit: number;
  delay: string;
  angle: number;
};

const ORBIT_TILE_BOX = {
  width: 58,
  height: 58,
} as const;


const ORBIT_TILE_PLACEMENT = [
  { orbit: 0, delay: "-1s", angle: 8 },
  { orbit: 1, delay: "-8s", angle: 52 },
  { orbit: 2, delay: "-15s", angle: 96 },
  { orbit: 0, delay: "-22s", angle: 140 },
  { orbit: 1, delay: "-29s", angle: 188 },
  { orbit: 2, delay: "-36s", angle: 232 },
  { orbit: 0, delay: "-43s", angle: 278 },
  { orbit: 1, delay: "-50s", angle: 324 },
] as const;

const ORBIT_TILES: OrbitIntegrationTile[] = ORBIT_INTEGRATIONS.map(
  (integration, index) => ({
    ...integration,
    ...ORBIT_TILE_PLACEMENT[index % ORBIT_TILE_PLACEMENT.length],
  }),
);

type OrbitPath = {
  d: string;
  duration: number;
  width: number;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotationDeg: number;
};

function rotatedPoint(
  cx: number,
  cy: number,
  x: number,
  y: number,
  rotationDeg: number,
) {
  const rotation = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const dx = x - cx;
  const dy = y - cy;
  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos,
  };
}

function atomEllipsePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotationDeg: number,
) {
  const k = 0.5522847498;
  const segments = [
    {
      p0: [cx + rx, cy],
      c1: [cx + rx, cy + ry * k],
      c2: [cx + rx * k, cy + ry],
      p1: [cx, cy + ry],
    },
    {
      p0: [cx, cy + ry],
      c1: [cx - rx * k, cy + ry],
      c2: [cx - rx, cy + ry * k],
      p1: [cx - rx, cy],
    },
    {
      p0: [cx - rx, cy],
      c1: [cx - rx, cy - ry * k],
      c2: [cx - rx * k, cy - ry],
      p1: [cx, cy - ry],
    },
    {
      p0: [cx, cy - ry],
      c1: [cx + rx * k, cy - ry],
      c2: [cx + rx, cy - ry * k],
      p1: [cx + rx, cy],
    },
  ].map((segment) => ({
    start: rotatedPoint(cx, cy, segment.p0[0], segment.p0[1], rotationDeg),
    c1: rotatedPoint(cx, cy, segment.c1[0], segment.c1[1], rotationDeg),
    c2: rotatedPoint(cx, cy, segment.c2[0], segment.c2[1], rotationDeg),
    end: rotatedPoint(cx, cy, segment.p1[0], segment.p1[1], rotationDeg),
  }));

  const start = segments[0].start;
  return [
    `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`,
    ...segments.map(
      (segment) =>
        `C ${segment.c1.x.toFixed(1)} ${segment.c1.y.toFixed(1)} ${segment.c2.x.toFixed(1)} ${segment.c2.y.toFixed(1)} ${segment.end.x.toFixed(1)} ${segment.end.y.toFixed(1)}`,
    ),
    "Z",
  ].join(" ");
}

function buildAtomOrbit(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotationDeg: number,
  duration: number,
  width: number,
): OrbitPath {
  return {
    d: atomEllipsePath(cx, cy, rx, ry, rotationDeg),
    duration,
    width,
    cx,
    cy,
    rx,
    ry,
    rotationDeg,
  };
}

function pointOnAtomEllipse(orbit: OrbitPath, angleDeg: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return rotatedPoint(
    orbit.cx,
    orbit.cy,
    orbit.cx + orbit.rx * Math.cos(angle),
    orbit.cy + orbit.ry * Math.sin(angle),
    orbit.rotationDeg,
  );
}

const ATOM_ORBITS: OrbitPath[] = [
  buildAtomOrbit(450, 370, 430, 126, -12, 48, 5),
  buildAtomOrbit(450, 370, 424, 158, 24, 58, 4),
  buildAtomOrbit(450, 370, 408, 136, -38, 54, 2.5),
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

type OrbitSketchProps = {
  layer: "lines" | "tiles";
  onHover: (integration: OrbitIntegration, el: HTMLElement) => void;
  onHoverEnd: () => void;
  hoveredName?: string;
  paused: boolean;
  reducedMotion: boolean;
};

function OrbitSketch({
  layer,
  onHover,
  onHoverEnd,
  hoveredName,
  paused,
  reducedMotion,
}: OrbitSketchProps) {
  const isTiles = layer === "tiles";
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;

    if (!svg) {
      return;
    }

    if (paused || reducedMotion) {
      svg.pauseAnimations();
      return;
    }

    svg.unpauseAnimations();
  }, [paused, reducedMotion]);

  const integrationTiles = ORBIT_TILES.map((tile) => {
    const orbit = ATOM_ORBITS[tile.orbit];
    const staticPoint = pointOnAtomEllipse(orbit, tile.angle);

    return (
      <g
        key={tile.name}
        className="meme-svg-tile orbit-integration-tile-motion"
        aria-label={tile.name}
        transform={
          reducedMotion
            ? `translate(${staticPoint.x.toFixed(1)} ${staticPoint.y.toFixed(1)})`
            : undefined
        }
      >
        {reducedMotion ? null : (
          <animateMotion
            dur={`${orbit.duration}s`}
            begin={tile.delay}
            repeatCount="indefinite"
            path={orbit.d}
          />
        )}
        <foreignObject
          className="orbit-integration-foreign"
          x={ORBIT_TILE_BOX.width / -2}
          y={ORBIT_TILE_BOX.height / -2}
          width={ORBIT_TILE_BOX.width}
          height={ORBIT_TILE_BOX.height}
        >
          <button
            type="button"
            className="orbit-integration-tile"
            aria-label={`${tile.name} integration`}
            data-active={hoveredName === tile.name ? "true" : undefined}
            onMouseEnter={(event) => onHover(tile, event.currentTarget)}
            onMouseLeave={onHoverEnd}
            onFocus={(event) => onHover(tile, event.currentTarget)}
            onBlur={onHoverEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tile.logo} alt="" className="orbit-integration-logo" />
          </button>
        </foreignObject>
      </g>
    );
  });

  return (
    <svg
      ref={svgRef}
      className={`meme-atom-stage pointer-events-none absolute left-1/2 top-1/2 h-[124%] w-[124%] -translate-x-1/2 -translate-y-1/2 ${
        isTiles ? "z-30" : "z-10"
      }`}
      viewBox="0 0 900 700"
      preserveAspectRatio="xMidYMid meet"
      role={isTiles ? "group" : undefined}
      aria-label={isTiles ? "Clinical system integrations" : undefined}
      aria-hidden={isTiles ? undefined : true}
    >
      {isTiles ? (
        integrationTiles
      ) : (
        <>
          <defs>
            <filter id="atomLineShadow" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
            </filter>
          </defs>
          {ATOM_ORBITS.map((orbit, i) => (
            <g key={`orbit-line-${i}`}>
              <path className="meme-atom-path-shadow" d={orbit.d} strokeWidth={orbit.width + 3} />
              <path className="meme-atom-path" d={orbit.d} strokeWidth={orbit.width} />
              <path className="meme-atom-path-highlight" d={orbit.d} strokeWidth={Math.max(1, orbit.width * 0.36)} />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

export function StackOrbit() {
  const { eyebrow, title, intro } = STACK_ORBIT_COPY;
  const [hovered, setHovered] = useState<OrbitIntegration | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  // Orbit never stops for interaction — hovering a tile just pops a tooltip.
  const orbitPaused = prefersReducedMotion;

  const stageRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLElement>(null);
  const hoveredElRef = useRef<HTMLElement | null>(null);

  const handleHover = (integration: OrbitIntegration, el: HTMLElement) => {
    hoveredElRef.current = el;
    setHovered(integration);
  };
  const handleHoverEnd = () => {
    hoveredElRef.current = null;
    setHovered(null);
  };

  // The tooltip rides the (moving) hovered tile every frame so it stays
  // attached as the tile orbits.
  useEffect(() => {
    if (!hovered) return;
    let raf = 0;
    const follow = () => {
      const el = hoveredElRef.current;
      const stage = stageRef.current;
      const tip = tooltipRef.current;
      if (el && stage && tip) {
        const s = stage.getBoundingClientRect();
        const b = el.getBoundingClientRect();
        const cx = b.left + b.width / 2 - s.left;
        const cy = b.top + b.height / 2 - s.top;
        const above = cy > s.height * 0.5;
        const w = tip.offsetWidth;
        const half = w / 2 + 8;
        const gap = b.height / 2 + 14;
        const x = Math.min(Math.max(cx, half), s.width - half);
        tip.style.left = `${x}px`;
        tip.style.top = `${above ? cy - gap : cy + gap}px`;
        tip.dataset.placement = above ? "above" : "below";
        // Move the tail so it always points at the tile, even when the bubble
        // is clamped to stay on-screen.
        const tailX = Math.min(Math.max(cx - (x - w / 2), 16), w - 16);
        tip.style.setProperty("--tail-x", `${tailX}px`);
      }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <Section
      id="stack-orbit"
      className="overflow-hidden border-y border-border bg-bg text-fg"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Left — copy (shared site header style, consistent with every section) */}
        <Heading eyebrow={eyebrow} title={title} intro={intro} />

        {/* Right — orbit */}
        <div
          ref={stageRef}
          className="stack-orbit-stage relative mx-auto aspect-square w-full max-w-[560px]"
          data-orbit-paused={orbitPaused ? "true" : "false"}
        >
          <OrbitSketch
            layer="lines"
            onHover={handleHover}
            onHoverEnd={handleHoverEnd}
            hoveredName={hovered?.name}
            paused={orbitPaused}
            reducedMotion={prefersReducedMotion}
          />

          <OrbitBubbles />

          <OrbitSketch
            layer="tiles"
            onHover={handleHover}
            onHoverEnd={handleHoverEnd}
            hoveredName={hovered?.name}
            paused={orbitPaused}
            reducedMotion={prefersReducedMotion}
          />

          {/* Robot body (z-20) sits BEHIND the orbiting stack, so tiles pass in
              front of her desk + body. */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[64%] -translate-x-1/2 -translate-y-[44%]">
            <div className="relative">
              <Image
                src="/orbit/robot-nurse-desk.png"
                alt="AI nurse receptionist at the center of the JoNeX stack"
                width={779}
                height={590}
                className="meme-nurse-image h-auto w-full object-contain"
                sizes="(max-width: 1024px) 64vw, 360px"
              />
              <span aria-hidden className="meme-nurse-grade" />
            </div>
          </div>

          {/* Head re-drawn ABOVE the stack (z-40), clipped to just her head, so
              the tiles pass BEHIND her face but in front of her body. */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-40 w-[64%] -translate-x-1/2 -translate-y-[44%]"
            style={{ clipPath: "inset(0 0 60% 0)" }}
            aria-hidden
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/orbit/robot-nurse-desk.png"
                alt=""
                className="meme-nurse-image h-auto w-full object-contain"
              />
              <span aria-hidden className="meme-nurse-grade" />
            </div>
          </div>

          {hovered ? (
            <aside
              ref={tooltipRef}
              className="orbit-tooltip absolute z-50 w-[min(17rem,80%)] p-3.5 text-left"
              data-placement="above"
              role="tooltip"
            >
              <h3 className="font-display text-sm font-bold leading-tight text-fg">
                {hovered.name}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-fg-muted">
                {hovered.blurb}
              </p>
            </aside>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
