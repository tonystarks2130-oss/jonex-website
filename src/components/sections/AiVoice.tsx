"use client";

import { PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Heading, Section } from "@/components/ui/primitives";
import { AI_VOICE_HIGHLIGHT } from "@/lib/content";

/** Which "Behind the call" step each transcript turn is working. */
const TURN_STEP = [0, 1, 1, 1, 2, 2, 3];

export function AiVoice() {
  const {
    eyebrow,
    title,
    intro,
    sampleClinic,
    sampleLabel,
    transcript,
    steps,
    capabilities,
  } = AI_VOICE_HIGHLIGHT;

  const rootRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Keep the latest message in view inside the fixed-height call box.
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [count, isTyping]);

  // Track whether the demo is on screen (reduced-motion → just show the
  // finished transcript, no animation).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCount(transcript.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [transcript.length]);

  // Plays the call turn by turn (AI "types" before speaking), holds the ended
  // call briefly, then loops — and resets whenever it leaves the screen.
  useEffect(() => {
    if (!inView) {
      setCount(0);
      setIsTyping(false);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const play = () => {
      if (i >= transcript.length) {
        timers.push(
          setTimeout(() => {
            i = 0;
            setCount(0);
            setIsTyping(false);
            timers.push(setTimeout(play, 650));
          }, 3200),
        );
        return;
      }
      const isAi = transcript[i].speaker === "AI";
      if (isAi) {
        setIsTyping(true);
        timers.push(
          setTimeout(() => {
            setIsTyping(false);
            i += 1;
            setCount(i);
            timers.push(setTimeout(play, 800));
          }, 1200),
        );
      } else {
        timers.push(
          setTimeout(() => {
            i += 1;
            setCount(i);
            timers.push(setTimeout(play, 650));
          }, 800),
        );
      }
    };
    setCount(0);
    setIsTyping(false);
    timers.push(setTimeout(play, 500));
    return () => timers.forEach(clearTimeout);
  }, [inView, transcript]);

  const finished = count >= transcript.length && !isTyping;
  const revealedStep = finished
    ? steps.length - 1
    : count > 0
      ? TURN_STEP[count - 1]
      : -1;
  const thinkingStep =
    isTyping && count < TURN_STEP.length ? TURN_STEP[count] : null;
  const shown = transcript.slice(0, count);

  return (
    <Section id="ai-voice">
      <Heading eyebrow={eyebrow} title={title} intro={intro} />

      <div
        ref={rootRef}
        className="mt-12 grid gap-4 lg:grid-cols-[3fr_2fr] lg:gap-6"
      >
        {/* Left — the live call */}
        <article className="glass-card lift flex flex-col rounded-[10px] p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <PhoneCall className="h-5 w-5 text-accent" aria-hidden="true" />
            <h3 className="font-display text-sm font-semibold">{sampleClinic}</h3>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
              {sampleLabel}
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              <span className="ai-voice-live h-2 w-2 rounded-full bg-accent" />
              {finished ? "Call ended" : "On call"}
            </span>
          </div>

          <div
            ref={messagesRef}
            className="ai-voice-scroll mt-4 h-[24rem] space-y-2.5 overflow-hidden pr-1"
          >
            {shown.map((turn, index) => {
              const isAi = turn.speaker === "AI";
              return (
                <div
                  key={index}
                  className={`ai-voice-msg flex ${isAi ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[10px] px-4 py-3 text-sm leading-6 ${
                      isAi
                        ? "bg-accent/10 text-fg"
                        : "border border-border bg-fg/[0.05] text-fg-muted"
                    }`}
                  >
                    <span
                      className={`mb-1 block text-[10px] font-semibold uppercase tracking-wider ${
                        isAi ? "text-accent" : "text-fg-muted"
                      }`}
                    >
                      {isAi ? "Dex" : turn.speaker}
                    </span>
                    {turn.line}
                  </div>
                </div>
              );
            })}

            {isTyping ? (
              <div className="ai-voice-msg flex justify-start">
                <div className="rounded-[10px] bg-accent/10 px-4 py-3">
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Dex
                  </span>
                  <span className="ai-voice-typing" aria-label="typing">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </article>

        {/* Right — behind the call, firing in sync */}
        <article className="glass-card lift flex flex-col rounded-[10px] p-4 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Behind the call
          </p>

          <ol className="mt-5 flex flex-1 flex-col justify-between">
            {steps.map((step, index) => {
              const done = index <= revealedStep;
              const active = index === thinkingStep;
              return (
                <li
                  key={step}
                  className="relative flex items-center gap-4 before:absolute before:left-[18px] before:top-[calc(50%+18px)] before:h-[calc(100%-18px)] before:w-px before:bg-border last:before:hidden"
                >
                  <span
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                      done
                        ? "bg-accent text-bg"
                        : active
                          ? "ai-step-active bg-accent text-bg"
                          : "border border-border bg-bg text-fg-muted"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <p
                    className={`text-[15px] font-medium leading-6 transition-colors duration-300 ${
                      done || active ? "text-fg" : "text-fg-muted/55"
                    }`}
                  >
                    {step}
                  </p>
                </li>
              );
            })}
          </ol>

          <ul className="mt-6 flex flex-wrap gap-2">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted"
              >
                {capability}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
