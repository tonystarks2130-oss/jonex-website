/**
 * Content / proof asset flags (DESIGN_CONTRACT §"Content / proof asset status").
 *
 * Build the slots now; ship interim owned assets; swap to real in place when
 * they land. Never fabricate proof as a real named client. `_mock` = clearly
 * placeholder-swappable; `_draft` = pending real copy/asset.
 */

export const FLAGS = {
  /** "integration" = show stack logos (n8n/cal.com/...); "client" = real client logos. */
  trustBarMode: "integration" as "integration" | "client",
  /** Text-only mock testimonials, no faces/video, Jeremy swaps later. */
  testimonials: "mock" as "mock" | "real",
  /** James's screen-recording proof — optional, off until provided. */
  screenRecording: "off" as "off" | "on",
  /** Case-study stat numbers — draft until backed by real data. */
  stats: "draft" as "draft" | "real",
} as const;
