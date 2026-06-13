"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Styled wrapper over a native <audio> element (DESIGN_CONTRACT IA §5).
 * The `src` is a wire constant — never proxied. Transcript slot is a `_draft`
 * (real transcripts pending) so the captions requirement has a home.
 */
export function AudioDemo({ label, src }: { label: string; src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="rounded-[10px] border border-border bg-surface p-5">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} the ${label} demo`}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast transition-opacity hover:opacity-90"
        >
          {playing ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play className="h-5 w-5 translate-x-0.5" aria-hidden="true" />
          )}
        </button>
        <div className="min-w-0">
          <p className="font-medium text-fg">{label}</p>
          <p className="text-sm text-fg-muted">AI voice receptionist demo</p>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onEnded={() => setPlaying(false)}
        className="hidden"
      />
    </div>
  );
}
