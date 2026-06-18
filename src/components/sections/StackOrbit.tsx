import type { CSSProperties } from "react";

import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiClaude,
  SiTwilio,
  SiElevenlabs,
  SiReact,
  SiOpenai,
  SiPostgresql,
  SiGithub,
  SiNextdotjs,
  SiN8N,
  SiPython,
  SiMongodb,
} from "react-icons/si";

import { Section, Heading } from "@/components/ui/primitives";
import { STACK_ORBIT_COPY } from "@/lib/content";

type TechTile = {
  label: string;
  mark?: string;
  Icon?: IconType;
  orbit: number;
  delay: string;
  hideOnMobile?: boolean;
};

type BrandBadge = {
  x: number;
  y: number;
  size: number;
  rotate: number;
  delay: string;
  hideOnMobile?: boolean;
};

const TECH_TILES: TechTile[] = [
  { label: "Claude", Icon: SiClaude, orbit: 0, delay: "-1s" },
  { label: "Twilio", Icon: SiTwilio, orbit: 0, delay: "-15s" },
  { label: "ElevenLabs", Icon: SiElevenlabs, orbit: 0, delay: "-29s" },
  { label: "React", Icon: SiReact, orbit: 1, delay: "-5s" },
  { label: "Azure OpenAI", Icon: SiOpenai, orbit: 1, delay: "-23s", hideOnMobile: true },
  { label: "PostgreSQL", Icon: SiPostgresql, orbit: 1, delay: "-40s", hideOnMobile: true },
  { label: "GitHub", Icon: SiGithub, orbit: 2, delay: "-8s", hideOnMobile: true },
  { label: "AWS", mark: "AWS", orbit: 0, delay: "-24s", hideOnMobile: true },
  { label: "Next.js", Icon: SiNextdotjs, orbit: 1, delay: "-42s", hideOnMobile: true },
  { label: "n8n", Icon: SiN8N, orbit: 2, delay: "-4s", hideOnMobile: true },
  { label: "Python", Icon: SiPython, orbit: 2, delay: "-21s", hideOnMobile: true },
  { label: "MongoDB", Icon: SiMongodb, orbit: 2, delay: "-36s", hideOnMobile: true },
];

type OrbitPath = {
  d: string;
  duration: number;
  width: number;
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

const ATOM_ORBITS: OrbitPath[] = [
  { d: atomEllipsePath(450, 370, 430, 126, -12), duration: 48, width: 5 },
  { d: atomEllipsePath(450, 370, 424, 158, 24), duration: 58, width: 4 },
  { d: atomEllipsePath(450, 370, 408, 136, -38), duration: 54, width: 2.5 },
];

const BRAND_BADGES: BrandBadge[] = [
  { x: 12, y: 38, size: 74, rotate: -24, delay: "-1s" },
  { x: 55, y: 9, size: 72, rotate: 8, delay: "-3s", hideOnMobile: true },
  { x: 88, y: 48, size: 78, rotate: -14, delay: "-2s" },
  { x: 9, y: 88, size: 68, rotate: 18, delay: "-4s", hideOnMobile: true },
];

function FloatingBrandBadge({ badge }: { badge: BrandBadge }) {
  const style = {
    left: `${badge.x}%`,
    top: `${badge.y}%`,
    width: badge.size,
    height: badge.size,
    transform: `translate(-50%, -50%) rotate(${badge.rotate}deg)`,
    "--badge-delay": badge.delay,
  } as CSSProperties;

  return (
    <div
      className={`meme-brand-badge absolute z-20 grid place-items-center ${
        badge.hideOnMobile ? "hidden sm:grid" : ""
      }`}
      style={style}
      aria-hidden="true"
    >
      <div className="meme-brand-badge-core grid h-[58%] w-[58%] place-items-center rounded-full border-2 border-white bg-[#252a58] shadow-inner">
        <Image
          src="/brand/jonex-icon.png"
          alt=""
          width={34}
          height={34}
          className="h-7 w-7 rounded-full object-cover"
        />
      </div>
    </div>
  );
}

function OrbitSketch({ layer = "back" }: { layer?: "back" | "front" }) {
  const isFront = layer === "front";
  const foregroundClipId = "atomForegroundWindow";
  const techTiles = TECH_TILES.map((tile) => {
    const orbit = ATOM_ORBITS[tile.orbit];
    const { Icon } = tile;
    return (
      <g
        key={tile.label}
        className={`meme-svg-tile ${tile.hideOnMobile ? "hidden sm:block" : ""}`}
        aria-label={tile.label}
      >
        <animateMotion
          dur={`${orbit.duration}s`}
          begin={tile.delay}
          repeatCount="indefinite"
          path={orbit.d}
        />
        <rect className="meme-tile-bg" x="-26" y="-26" width="52" height="52" rx="13" />
        <rect
          className="meme-tile-edge"
          x="-26"
          y="-26"
          width="52"
          height="52"
          rx="13"
          fill="none"
          strokeWidth="1.5"
        />
        {Icon ? (
          <Icon className="meme-tile-glyph" x={-15} y={-15} width={30} height={30} />
        ) : (
          <text
            x="0"
            y="1"
            textAnchor="middle"
            dominantBaseline="middle"
            className="meme-svg-tile-text"
          >
            {tile.mark}
          </text>
        )}
      </g>
    );
  });

  return (
    <svg
      className={`meme-atom-stage pointer-events-none absolute left-1/2 top-1/2 h-[124%] w-[124%] -translate-x-1/2 -translate-y-1/2 ${
        isFront ? "z-30" : "z-10"
      }`}
      viewBox="0 0 900 700"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="atomLineShadow" x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
        </filter>
        {isFront ? (
          <clipPath id={foregroundClipId}>
            <rect x="0" y="388" width="900" height="250" />
            <rect x="0" y="276" width="282" height="178" />
            <rect x="614" y="276" width="286" height="192" />
            <rect x="316" y="306" width="284" height="92" />
          </clipPath>
        ) : null}
      </defs>

      <g clipPath={isFront ? `url(#${foregroundClipId})` : undefined}>
        {ATOM_ORBITS.map((orbit, i) => (
          <g key={`orbit-line-${i}`}>
            <path className="meme-atom-path-shadow" d={orbit.d} strokeWidth={orbit.width + 3} />
            <path className="meme-atom-path" d={orbit.d} strokeWidth={orbit.width} />
            <path className="meme-atom-path-highlight" d={orbit.d} strokeWidth={Math.max(1, orbit.width * 0.36)} />
          </g>
        ))}
      </g>

      {isFront ? <g clipPath={`url(#${foregroundClipId})`}>{techTiles}</g> : techTiles}
    </svg>
  );
}

export function StackOrbit() {
  const { eyebrow, title, intro } = STACK_ORBIT_COPY;

  return (
    <Section
      id="stack-orbit"
      className="overflow-hidden border-y border-border bg-bg text-fg"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Left — copy (shared site header style, consistent with every section) */}
        <Heading eyebrow={eyebrow} title={title} intro={intro} />

        {/* Right — orbit */}
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <OrbitSketch layer="back" />

          {BRAND_BADGES.map((badge) => (
            <FloatingBrandBadge
              key={`${badge.x}-${badge.y}-${badge.rotate}`}
              badge={badge}
            />
          ))}

          <div className="absolute left-1/2 top-1/2 z-20 w-[64%] -translate-x-1/2 -translate-y-[44%]">
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

          <OrbitSketch layer="front" />
        </div>
      </div>
    </Section>
  );
}
