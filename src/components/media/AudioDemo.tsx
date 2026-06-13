"use client";

import { Clock, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

type AudioDemoProps = {
  src: string;
  title: string;
  description: string;
  badge: string;
  duration: string;
};

function waveformBarHeight(index: number) {
  const middleBias = 1 - Math.abs(index - 13.5) / 13.5;
  const voiceVariation = Math.abs(Math.sin(index * 1.35) * 0.48) + 0.34;
  return `${8 + Math.round(middleBias * voiceVariation * 22)}px`;
}

function waveformBarOpacity(index: number) {
  return 0.22 + ((index % 5) * 0.035);
}

export function AudioDemo({
  src,
  title,
  description,
  badge,
  duration,
}: AudioDemoProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;

    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }

    el.play();
    setPlaying(true);
  };

  return (
    <article className="lift group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-accent/20 bg-surface/80 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_50px_-20px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} the ${title} demo`}
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-[0_0_24px_-4px_color-mix(in_srgb,var(--accent)_60%,transparent)] transition-transform hover:scale-105"
        >
          {playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 translate-x-0.5" />
          )}
        </button>

        <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
          {badge}
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold text-fg">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
        {description}
      </p>

      <div className="mt-auto pt-5">
        <div className="flex h-8 w-full items-end gap-[3px]">
          {Array.from({ length: 28 }).map((_, index) => (
            <span
              key={index}
              className={`w-[3px] rounded-full bg-accent transition-opacity ${
                playing ? "opacity-90" : ""
              }`}
              style={{
                height: waveformBarHeight(index),
                opacity: playing ? undefined : waveformBarOpacity(index),
              }}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-fg-muted">
          <Clock className="h-3.5 w-3.5" />
          <span>{duration}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onEnded={() => setPlaying(false)}
        className="hidden"
      />
    </article>
  );
}
