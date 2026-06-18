"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  BarChart3,
  BellRing,
  Bot,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Database,
  MessageSquareText,
  PhoneIncoming,
  Sparkles,
  Star,
  UserPlus,
  Workflow,
} from "lucide-react";

const WAVEFORM = [
  22, 34, 48, 64, 42, 76, 54, 88, 62, 46, 72, 92, 58, 78, 44, 60, 36, 24,
];

const DECK_TRANSITION =
  "transform 560ms cubic-bezier(0.22, 1, 0.36, 1), opacity 360ms ease, filter 360ms ease, box-shadow 360ms ease";
const SHUFFLE_INTERVAL_MS = 4200;

type DeckItem = {
  id: "signal" | "operator" | "booking" | "records" | "automation" | "reviews" | "dashboard";
  title: string;
  subtitle: string;
  status: string;
  icon: typeof Bot;
};

const DECK: DeckItem[] = [
  {
    id: "signal",
    title: "Incoming Lead",
    subtitle: "Customer intent captured",
    status: "New",
    icon: PhoneIncoming,
  },
  {
    id: "operator",
    title: "JoNex AI Operator",
    subtitle: "Conversation handled live",
    status: "Live",
    icon: Bot,
  },
  {
    id: "booking",
    title: "Appointment Booked",
    subtitle: "Slot confirmed on the calendar",
    status: "Booked",
    icon: CalendarCheck,
  },
  {
    id: "records",
    title: "CRM Updated",
    subtitle: "Contact and deal logged",
    status: "Synced",
    icon: Database,
  },
  {
    id: "automation",
    title: "Automated Follow-up",
    subtitle: "Confirmations and reminders sent",
    status: "Running",
    icon: Workflow,
  },
  {
    id: "reviews",
    title: "Review Requested",
    subtitle: "Happy customer, review invited",
    status: "Sent",
    icon: Star,
  },
  {
    id: "dashboard",
    title: "Insights Dashboard",
    subtitle: "Your business at a glance",
    status: "Live",
    icon: BarChart3,
  },
];

type Slot = "front" | "left" | "right" | "hidden";

function slotFor(index: number, active: number): Slot {
  const offset = (index - active + DECK.length) % DECK.length;
  if (offset === 0) return "front";
  if (offset === 1) return "right";
  if (offset === DECK.length - 1) return "left";
  return "hidden";
}

function initialTransform(slot: Slot) {
  if (slot === "front") return "translate3d(-50%, 0, 70px) scale(1)";
  if (slot === "left") {
    return "translate3d(calc(-50% - 120px), 68px, -55px) rotateY(-10deg) scale(0.86)";
  }
  if (slot === "hidden") return "translate3d(-50%, 84px, -90px) scale(0.8)";
  return "translate3d(calc(-50% + 120px), 72px, -35px) rotateY(10deg) scale(0.88)";
}

/**
 * Auto-shuffling workflow catalog with manual controls and cursor depth.
 * The active card rotates through signal, AI handling, and business actions.
 */
export function HeroArtifact() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const activeRef = useRef(1);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [active, setActive] = useState(1);

  const applyDeck = useCallback((x: number, y: number) => {
    const stage = stageRef.current;
    if (!stage) return;

    const width = stage.clientWidth || 520;
    const compact = width < 480;
    const spread = compact ? Math.min(72, width * 0.19) : Math.min(132, width * 0.25);
    const rearY = compact ? 70 : 68;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const slot = slotFor(index, activeRef.current);

      if (slot === "hidden") {
        card.style.transform = "translate3d(-50%, 84px, -90px) scale(0.8)";
        card.style.opacity = "0";
        card.style.filter = "saturate(0.6) brightness(0.7)";
        card.style.zIndex = "0";
        card.style.pointerEvents = "none";
        card.style.boxShadow = "none";
        return;
      }

      if (slot === "front") {
        card.style.transform = `translate3d(calc(-50% + ${x * 9}px), ${
          y * 7
        }px, 70px) rotateX(${-y * 2.7}deg) rotateY(${x * 3.6}deg) scale(1)`;
        card.style.opacity = "1";
        card.style.filter = "none";
        card.style.zIndex = "30";
        card.style.pointerEvents = "auto";
        card.style.boxShadow =
          "0 42px 100px -34px color-mix(in srgb, var(--accent) 52%, #000), 0 22px 54px -34px #000, inset 0 1px 0 color-mix(in srgb, #fff 14%, transparent)";
        return;
      }

      const direction = slot === "left" ? -1 : 1;
      const pointerX = direction * x * -7;
      const pointerY = direction * y * 4;
      const depth = slot === "left" ? -55 : -35;
      const scale = slot === "left" ? 0.86 : 0.88;
      const rotation = direction * 10 + x * direction * 1.6;

      card.style.transform = `translate3d(calc(-50% + ${
        direction * spread + pointerX
      }px), ${rearY + (slot === "right" ? 4 : 0) + pointerY}px, ${
        depth
      }px) rotateX(${-y * 1.1}deg) rotateY(${rotation}deg) scale(${scale})`;
      card.style.opacity = compact ? "0.42" : "0.5";
      card.style.filter = "saturate(0.72) brightness(0.78)";
      card.style.zIndex = slot === "left" ? "10" : "20";
      card.style.pointerEvents = "auto";
      card.style.boxShadow =
        "0 28px 70px -42px color-mix(in srgb, var(--accent) 28%, #000), inset 0 1px 0 color-mix(in srgb, #fff 8%, transparent)";
    });

    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${x * 20}px, ${y * 14}px, 0)`;
    }
  }, []);

  const resetDeck = useCallback(() => applyDeck(0, 0), [applyDeck]);

  const selectCard = useCallback((index: number) => {
    const next = (index + DECK.length) % DECK.length;
    activeRef.current = next;
    setActive(next);
  }, []);

  const stepDeck = useCallback(
    (direction: number) => selectCard(activeRef.current + direction),
    [selectCard],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = query.matches;
    const onChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      resetDeck();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [resetDeck]);

  useEffect(() => {
    const frame = requestAnimationFrame(resetDeck);
    return () => cancelAnimationFrame(frame);
  }, [active, resetDeck]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const stage = stageRef.current;
      const isInteracting =
        pausedRef.current ||
        stage?.matches(":hover") ||
        (stage ? stage.contains(document.activeElement) : false);
      if (isInteracting || reducedMotionRef.current || document.hidden) return;
      selectCard(activeRef.current + 1);
    }, SHUFFLE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [selectCard]);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (reducedMotionRef.current || event.pointerType === "touch") return;
      const stage = stageRef.current;
      if (!stage) return;
      const bounds = stage.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => applyDeck(x, y));
    },
    [applyDeck],
  );

  const onPointerEnter = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const onPointerLeave = useCallback(() => {
    pausedRef.current = false;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    resetDeck();
  }, [resetDeck]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onFocusIn = () => {
      pausedRef.current = true;
    };
    const onFocusOut = () => {
      requestAnimationFrame(() => {
        pausedRef.current = stage.contains(document.activeElement);
      });
    };
    const onResize = () => resetDeck();

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerenter", onPointerEnter);
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("focusin", onFocusIn);
    stage.addEventListener("focusout", onFocusOut);
    window.addEventListener("resize", onResize);

    return () => {
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerenter", onPointerEnter);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("focusin", onFocusIn);
      stage.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("resize", onResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [onPointerEnter, onPointerLeave, onPointerMove, resetDeck]);

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="JoNex AI workflow catalog"
      className="relative mx-auto h-[500px] w-full max-w-[620px] select-none md:mt-1 md:h-[530px] [perspective:1200px]"
    >
      <p className="sr-only" aria-live="polite">
        Showing {DECK[active].title}: {DECK[active].subtitle}
      </p>

      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-[18%] left-[20%] h-[56%] w-[62%] rounded-full opacity-60 blur-3xl motion-reduce:transition-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 68%)",
          transition: DECK_TRANSITION,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[9%] top-[8%] h-[78%] rounded-[32px] border border-border/45 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[3%] top-[14%] h-[66%] rounded-[32px] border border-border/30 opacity-45"
      />

      {DECK.map((item, index) => {
        const slot = slotFor(index, active);
        return (
          <DeckCard
            key={item.id}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            item={item}
            slot={slot}
            active={index === active}
            onSelect={() => selectCard(index)}
          />
        );
      })}

      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => stepDeck(-1)}
          aria-label="Show previous workflow card"
          className="glass flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="glass flex items-center gap-2 rounded-full px-3 py-2" aria-label="Choose workflow card">
          {DECK.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectCard(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === active ? "true" : undefined}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                index === active ? "w-6 bg-accent" : "w-2 bg-fg-muted/45 hover:bg-fg-muted"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => stepDeck(1)}
          aria-label="Show next workflow card"
          className="glass flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

type DeckCardProps = {
  item: DeckItem;
  slot: Slot;
  active: boolean;
  onSelect: () => void;
};

const DeckCard = function DeckCard({
  ref,
  item,
  slot,
  active,
  onSelect,
}: DeckCardProps & { ref: (node: HTMLButtonElement | null) => void }) {
  const Icon = item.icon;

  return (
    <button
      ref={ref}
      type="button"
      tabIndex={slot === "hidden" ? -1 : 0}
      onClick={onSelect}
      aria-label={`${active ? "Current" : "Show"} ${item.title} workflow card`}
      aria-pressed={active}
      className="glass absolute top-[6%] left-1/2 h-[415px] w-[88%] max-w-[390px] overflow-hidden rounded-[28px] border-accent/20 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none md:p-6 lg:w-[72%]"
      style={{
        transform: initialTransform(slot),
        transformStyle: "preserve-3d",
        transition: DECK_TRANSITION,
        opacity: slot === "hidden" ? 0 : slot === "front" ? 1 : 0.5,
        filter: slot === "front" ? "none" : "saturate(0.72) brightness(0.78)",
        pointerEvents: slot === "hidden" ? "none" : "auto",
        zIndex: slot === "hidden" ? 0 : slot === "front" ? 30 : slot === "right" ? 20 : 10,
        background:
          "linear-gradient(145deg, color-mix(in srgb, #fff 8%, transparent), transparent 36%), color-mix(in srgb, var(--surface) 96%, var(--bg))",
        backdropFilter: "blur(26px) saturate(1.2)",
      }}
    >
      <div aria-hidden="true" className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/30">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[13px] font-semibold leading-tight text-fg md:text-sm">
                {item.title}
              </p>
              <p className="truncate text-[11px] text-fg-muted">{item.subtitle}</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent md:px-2.5 md:tracking-[0.14em]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {item.status}
          </span>
        </div>

        <div className="mt-5 flex-1">{renderCardBody(item.id)}</div>

        <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3 md:mt-4 md:pt-4">
          <div className="flex items-center gap-2 text-xs text-fg-muted">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/12 text-accent">
              <Check className="h-3.5 w-3.5" />
            </span>
            {item.id === "signal" && "Lead understood instantly"}
            {item.id === "operator" && "No hold. No missed lead."}
            {item.id === "booking" && "Slot confirmed instantly"}
            {item.id === "records" && "Every detail captured"}
            {item.id === "automation" && "Customer kept in the loop"}
            {item.id === "reviews" && "Reputation grows on autopilot"}
            {item.id === "dashboard" && "You stay in control"}
          </div>
          <span className="font-display text-xs font-semibold text-fg">JoNex</span>
        </div>
      </div>
    </button>
  );
};

function renderCardBody(id: DeckItem["id"]) {
  if (id === "signal") return <SignalBody />;
  if (id === "operator") return <OperatorBody />;
  if (id === "booking") return <BookingBody />;
  if (id === "records") return <RecordsBody />;
  if (id === "automation") return <AutomationBody />;
  if (id === "reviews") return <ReviewsBody />;
  return <DashboardBody />;
}

function SignalBody() {
  return (
    <>
      <div className="rounded-2xl border border-border/70 bg-bg/50 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
          After-hours call
        </p>
        <p className="mt-2 font-display text-lg font-semibold text-fg">Dental appointment</p>
        <p className="mt-1 text-xs leading-5 text-fg-muted">
          New patient looking for the earliest available visit this week.
        </p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Source" value="Phone" />
        <Metric label="Intent" value="Booking" />
        <Metric label="Urgency" value="This week" accent />
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border/60 bg-bg/35 px-3 py-2.5 text-xs text-fg-muted">
        <PhoneIncoming className="h-4 w-4 shrink-0 text-accent" />
        Routed to the right AI workflow
      </div>
    </>
  );
}

function OperatorBody() {
  return (
    <>
      <div className="rounded-2xl border border-border/70 bg-bg/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
              AI is speaking
            </p>
            <p className="mt-1 text-sm font-medium text-fg">
              &quot;I can help you book that.&quot;
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div className="mt-4 flex h-12 items-center justify-center gap-1">
          {WAVEFORM.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="w-1 rounded-full bg-accent/80 motion-safe:animate-pulse"
              style={{
                height: `${height}%`,
                animationDelay: `${index * -70}ms`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Intent" value="Booking" />
        <Metric label="Sentiment" value="Positive" />
        <Metric label="Action" value="Schedule" accent />
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border/60 bg-bg/35 px-3 py-2.5 text-xs text-fg-muted">
        <Bot className="h-4 w-4 shrink-0 text-accent" />
        Natural conversation, business rules applied
      </div>
    </>
  );
}

function BookingBody() {
  return (
    <>
      <div className="rounded-2xl border border-border/70 bg-bg/50 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
          After-hours booking
        </p>
        <p className="mt-2 font-display text-lg font-semibold text-fg">Tue &middot; 10:30 AM</p>
        <p className="mt-1 text-xs leading-5 text-fg-muted">
          Dental cleaning &middot; new patient
        </p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Date" value="Tue" />
        <Metric label="Time" value="10:30 AM" />
        <Metric label="Status" value="Confirmed" accent />
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border/60 bg-bg/35 px-3 py-2.5 text-xs text-fg-muted">
        <CalendarCheck className="h-4 w-4 shrink-0 text-accent" />
        Added to your calendar
      </div>
    </>
  );
}

function RecordsBody() {
  return (
    <>
      <div className="space-y-2">
        <ActionRow icon={Database} label="Contact created" />
        <ActionRow icon={UserPlus} label="Deal added &middot; New lead" />
        <ActionRow icon={MessageSquareText} label="Call notes attached" />
      </div>
      <div className="mt-3 rounded-2xl border border-border/70 bg-bg/45 p-3 md:mt-4 md:p-4">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
          <span>Record completeness</span>
          <span className="text-accent">100%</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border/60">
          <div className="h-full w-full rounded-full bg-accent" />
        </div>
      </div>
    </>
  );
}

function AutomationBody() {
  return (
    <>
      <div className="space-y-2">
        <ActionRow icon={MessageSquareText} label="Confirmation sent to customer" />
        <ActionRow icon={BellRing} label="Reminder scheduled" />
        <ActionRow icon={MessageSquareText} label="Owner notified" />
      </div>
      <div className="mt-3 rounded-2xl border border-border/70 bg-bg/45 p-3 md:mt-4 md:p-4">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
          <span>Workflow complete</span>
          <span className="text-accent">7 of 7</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border/60">
          <div className="h-full w-full rounded-full bg-accent" />
        </div>
      </div>
    </>
  );
}

function ReviewsBody() {
  return (
    <>
      <div className="rounded-2xl border border-border/70 bg-bg/50 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
          Post-visit
        </p>
        <div className="mt-2 flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((star) => (
            <Star key={star} className="h-3.5 w-3.5 fill-current text-accent" />
          ))}
        </div>
        <p className="mt-2 font-display text-lg font-semibold text-fg">Review invite sent</p>
        <p className="mt-1 text-xs leading-5 text-fg-muted">
          Right after a great experience
        </p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Trigger" value="Visit done" />
        <Metric label="Channel" value="SMS" />
        <Metric label="Status" value="Sent" accent />
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border/60 bg-bg/35 px-3 py-2.5 text-xs text-fg-muted">
        <Star className="h-4 w-4 shrink-0 fill-current text-accent" />
        More 5-star reviews, automatically
      </div>
    </>
  );
}

function DashboardBody() {
  const bars = [38, 64, 48, 78, 58, 86, 72, 96];

  return (
    <>
      <div className="rounded-2xl border border-border/70 bg-bg/50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
            This week
          </p>
          <BarChart3 className="h-5 w-5 text-accent" />
        </div>
        <div className="mt-4 flex h-16 items-end gap-1.5 rounded-xl border border-border/50 bg-bg/35 px-3 py-2.5">
          {bars.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="flex-1 rounded-full bg-accent/80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Calls" value="100%" />
        <Metric label="Leads" value="24" />
        <Metric label="Booked" value="18" accent />
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border/60 bg-bg/35 px-3 py-2.5 text-xs text-fg-muted">
        <BarChart3 className="h-4 w-4 shrink-0 text-accent" />
        Your whole operation at a glance
      </div>
    </>
  );
}

type IconComponent = typeof Database;

function ActionRow({ icon: Icon, label }: { icon: IconComponent; label: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-bg/40 px-3 py-2 md:py-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="text-xs font-medium text-fg">{label}</span>
      <Check className="ml-auto h-3.5 w-3.5 text-accent" />
    </div>
  );
}

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-bg/35 px-2 py-2.5 text-center">
      <p className="text-[9px] uppercase tracking-[0.12em] text-fg-muted">{label}</p>
      <p className={`mt-1 text-[11px] font-semibold ${accent ? "text-accent" : "text-fg"}`}>
        {value}
      </p>
    </div>
  );
}
