"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Phone, PhoneOff, UserPlus, BellRing } from "lucide-react";
import { VOICE_DEMOS } from "@/lib/integrations";
import { HERO } from "@/lib/content";

// Two supporting outcome chips in the hero (3rd, "Follow-up ready", dropped to
// reduce hero clutter — still present in HERO.outcomes for use elsewhere).
const OUTCOME_ICONS = [UserPlus, BellRing] as const;

/**
 * Hero artifact (DESIGN_CONTRACT Decision 4) — the signature interactive element.
 *
 * "Live Call Visualizer": a stylised incoming-call panel that, on Answer, plays
 * a REAL Cloudinary voice demo and animates a cyan waveform while it speaks.
 * Ties the hero to the actual differentiator (the 3 voice demos neither
 * reference site has). Cyan-restrained (bars + status only), token-driven so it
 * themes, and reduced-motion safe (static waveform, audio still plays).
 *
 * The waveform is a decorative visualisation driven by rAF — the audio playing
 * underneath is the real demo. No Web Audio / CORS dependency, so it never
 * silently flat-lines on a tainted cross-origin stream.
 */

const BAR_COUNT = 36;

type Status = "idle" | "live";

export function HeroArtifact() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const levelsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0.12));
  const targetsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0.12));

  const [status, setStatus] = useState<Status>("idle");
  const [active, setActive] = useState(0);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#00d4ff";

    const gap = cssW / BAR_COUNT;
    const barW = Math.max(2, gap * 0.42);
    const mid = cssH / 2;
    const levels = levelsRef.current;

    for (let i = 0; i < BAR_COUNT; i++) {
      const h = Math.max(2, levels[i] * cssH * 0.92);
      const x = i * gap + (gap - barW) / 2;
      // Fade bars toward the edges so the waveform reads as a centred voiceprint.
      const edge = 1 - Math.abs(i / (BAR_COUNT - 1) - 0.5) * 1.1;
      ctx.globalAlpha = 0.25 + Math.max(0, edge) * 0.75;
      ctx.fillStyle = accent;
      const r = barW / 2;
      const y = mid - h / 2;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, h, r);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  // Animation loop: ease levels toward targets; refresh targets while live.
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame++;
      const levels = levelsRef.current;
      const targets = targetsRef.current;
      if (status === "live" && frame % 4 === 0) {
        for (let i = 0; i < BAR_COUNT; i++) {
          const center = 1 - Math.abs(i / (BAR_COUNT - 1) - 0.5) * 1.4;
          targets[i] = 0.1 + Math.random() * Math.max(0.15, center) * 0.95;
        }
      } else if (status === "idle") {
        // Calm resting wave — a slow traveling sine so the artifact breathes
        // before it's tapped (not a dead flat row).
        const t = frame / 30;
        for (let i = 0; i < BAR_COUNT; i++) {
          const center = 1 - Math.abs(i / (BAR_COUNT - 1) - 0.5) * 1.2;
          const wave = 0.5 + 0.5 * Math.sin(i * 0.5 - t);
          targets[i] = 0.07 + wave * Math.max(0.05, center) * 0.18;
        }
      }
      for (let i = 0; i < BAR_COUNT; i++) {
        levels[i] += (targets[i] - levels[i]) * 0.22;
      }
      draw();
      rafRef.current = requestAnimationFrame(tick);
    };

    if (reducedMotion) {
      // Static symmetric voiceprint, no animation.
      const levels = levelsRef.current;
      for (let i = 0; i < BAR_COUNT; i++) {
        const center = 1 - Math.abs(i / (BAR_COUNT - 1) - 0.5) * 1.4;
        levels[i] = status === "live" ? 0.25 + Math.max(0, center) * 0.55 : 0.12;
      }
      draw();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status, draw, reducedMotion]);

  // Redraw on resize so the canvas stays crisp.
  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setStatus("idle");
  }, []);

  const answer = useCallback(
    (index: number) => {
      const el = audioRef.current;
      if (!el) return;
      setActive(index);
      el.src = VOICE_DEMOS[index].src;
      el.currentTime = 0;
      el.play().catch(() => {
        /* autoplay/network guard — UI still shows live state */
      });
      setStatus("live");
    },
    [],
  );

  const demo = VOICE_DEMOS[active];

  return (
    <div className="relative mx-auto w-full max-w-md md:mx-0 md:ml-auto md:max-w-[430px]">
      {/* ambient cyan glow — single, soft, behind the panel (not a pulse) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(58% 58% at 65% 32%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />

      {/* Two supporting outcome chips — desktop only (md+), seated in the left
          gutter so they flank the card without covering its content. Mobile:
          hidden (no absolute overlap). */}
      <div
        className="floater glass absolute top-8 -left-40 z-20 hidden w-36 rounded-2xl p-2.5 xl:block"
        aria-hidden="true"
      >
        <OutcomeCard index={0} />
      </div>
      <div
        className="floater floater-2 glass absolute bottom-9 -left-40 z-20 hidden w-36 rounded-2xl p-2.5 xl:block"
        aria-hidden="true"
      >
        <OutcomeCard index={1} />
      </div>

      <div className="glass relative rounded-[20px] p-6">
        {/* status header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              {status === "live" && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              )}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  status === "live" ? "bg-accent" : "bg-fg-muted"
                }`}
              />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-fg-muted">
              {status === "live" ? "On a live call" : "Incoming call"}
            </span>
          </div>
          <span className="font-display text-sm font-semibold text-fg">JoNeX AI</span>
        </div>

        {/* caller line */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/12 text-accent ring-1 ring-accent/25">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-fg">{demo.label}</p>
            <p className="truncate text-sm text-fg-muted">
              {status === "live"
                ? "Answering — no hold, no missed lead"
                : "Tap a line to hear the AI pick up"}
            </p>
          </div>
        </div>

        {/* waveform */}
        <div className="mt-5 h-24 rounded-xl border border-border/70 bg-bg/40 px-3 py-2">
          <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
        </div>

        {/* line selector */}
        <div className="mt-4 flex flex-wrap gap-2">
          {VOICE_DEMOS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => answer(i)}
              aria-pressed={status === "live" && active === i}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                status === "live" && active === i
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-fg-muted hover:border-accent hover:text-accent"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* primary action */}
        <button
          type="button"
          onClick={() => (status === "live" ? stop() : answer(active))}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
        >
          {status === "live" ? (
            <>
              <PhoneOff className="h-4 w-4" aria-hidden="true" /> End call
            </>
          ) : (
            <>
              <Phone className="h-4 w-4" aria-hidden="true" /> Answer with JoNeX AI
            </>
          )}
        </button>
      </div>

      <audio
        ref={audioRef}
        preload="none"
        onEnded={stop}
        className="hidden"
      />
    </div>
  );
}

/** Small decorative outcome chip floated around the call card (desktop only). */
function OutcomeCard({ index }: { index: number }) {
  const o = HERO.outcomes[index];
  const Icon = OUTCOME_ICONS[index];
  return (
    <div className="flex items-start gap-2">
      <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/12 text-accent ring-1 ring-accent/25">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold leading-tight text-fg">{o.title}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-fg-muted">{o.detail}</p>
      </div>
    </div>
  );
}
