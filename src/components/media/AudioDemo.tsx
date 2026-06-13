"use client";

import { Clock, Pause, Play } from "lucide-react";
import type * as React from "react";
import { useEffect, useRef } from "react";

type AudioDemoProps = {
  src: string;
  title: string;
  description: string;
  badge: string;
  duration: string;
  isPlaying: boolean;
  onToggle: () => void;
};

function barHeight(index: number) {
  const middleBias = 1 - Math.abs(index - 14.5) / 14.5;
  const voiceVariation = 0.55 + Math.abs(Math.sin(index * 1.18)) * 0.45;
  return 8 + Math.round(middleBias * voiceVariation * 26);
}

export function AudioDemo({
  src,
  title,
  description,
  badge,
  duration,
  isPlaying,
  onToggle,
}: AudioDemoProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isPlaying]);

  return (
    <article
      className={`glass-card group wave flex min-h-[210px] flex-col p-7 cursor-default ${
        isPlaying ? "is-playing" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${isPlaying ? "Pause" : "Play"} the ${title} demo`}
          className="relative inline-flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full text-accent-contrast shadow-[0_0_24px_-4px_color-mix(in_srgb,var(--accent)_60%,transparent)] transition-transform hover:scale-105"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--accent) 55%, #fff), var(--accent))",
          }}
        >
          {isPlaying ? (
            <>
              <span
                aria-hidden
                className="play-ring pointer-events-none absolute inset-0 rounded-full bg-accent"
              />
              <Pause className="relative z-10 h-5 w-5" />
            </>
          ) : (
            <Play className="relative z-10 h-5 w-5 translate-x-0.5" />
          )}
        </button>

        <span className="pill">{badge}</span>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold text-fg">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
        {description}
      </p>

      <div className="mt-auto pt-5">
        <div className="flex h-9 w-full items-end gap-[3px]">
          {Array.from({ length: 30 }).map((_, index) => (
            <span
              key={index}
              className="wave-bar w-[3px] rounded-full bg-accent"
              style={{
                height: `${barHeight(index)}px`,
                "--d": `${index * 45}ms`,
                opacity: isPlaying ? 0.9 : 0.4,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-fg-muted">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
          <span className="text-xs font-semibold text-accent">
            Listen to scenario →
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onEnded={() => {
          if (isPlaying) onToggle();
        }}
        className="hidden"
      />
    </article>
  );
}
