/**
 * Wire contract: DO NOT EDIT THE VALUES.
 *
 * Every constant here was extracted verbatim from the prior live site
 * (index.html) and byte-verified against source. These integrations are
 * already wired to live infrastructure (n8n, cal.com, Cloudinary); changing
 * a value silently breaks a production integration. UI around them may be
 * rebuilt freely, the values may not change.
 */

/** n8n chat webhook. POST JSON { message, history: history.slice(-10) }. */
export const CHAT_ENDPOINT = "https://api.jonex.site/webhook/jonex-chat";

/** Fallback contact when the chat webhook is unreachable. */
export const CHAT_FALLBACK_EMAIL = "jnex2130@gmail.com";

/** cal.com booking. embed.js scans for [data-cal-link] and opens the popup. */
export const CAL = {
  link: "tony-starks-dzd0mf/jonex-discovery",
  config: { layout: "month_view" as const },
  embedScript: "https://app.cal.com/embed/embed.js",
  brandColor: "#00d4ff",
  /** Direct URL target for the /book redirect (see next.config.ts). */
  bookingUrl: "https://cal.com/tony-starks-dzd0mf/jonex-discovery",
} as const;

/** Cloudinary voice demos (exact URLs, note the audio cloud is `dgeotp5k4`). */
export const VOICE_DEMOS = [
  {
    id: "dental",
    label: "Dental Clinic Receptionist",
    src: "https://res.cloudinary.com/dgeotp5k4/video/upload/v1773665188/Dental_Clinic_Receptionist_Demo_addfwp.wav",
  },
  {
    id: "barbershop",
    label: "Barbershop",
    src: "https://res.cloudinary.com/dgeotp5k4/video/upload/v1773668648/Demo_AI_Voice_-_Barbershop_brg1yx.wav",
  },
  {
    id: "real-estate",
    label: "Real Estate Agent",
    src: "https://res.cloudinary.com/dgeotp5k4/video/upload/v1773668688/Demo_AI_Voice_-_AI_Real_Estate_Agent_rurvfd.wav",
  },
] as const;

/** Promo/hero video, DIFFERENT Cloudinary cloud (`dg7xejohx`). */
export const PROMO_VIDEO =
  "https://res.cloudinary.com/dg7xejohx/video/upload/v1773947679/Untitled_design_klpcku.mp4";

/** Brand mark / favicon source (cloud `dgeotp5k4`). */
export const LOGO_SRC =
  "https://res.cloudinary.com/dgeotp5k4/image/upload/v1773666004/WhatsApp_Image_2026-03-16_at_20.56.36_encqv1.jpg";

/** Footer message buttons (James, 2026-06-11). */
export const CONTACT = {
  whatsapp: { number: "639569871934", url: "https://wa.me/639569871934" },
  // Contact email used across the site + Meta ads / data-deletion compliance.
  email: { address: "jeremy@jonex.site", url: "mailto:jeremy@jonex.site" },
  // Telegram @jereai (JoNex_AI account, supplied 2026-06-11), clean username link.
  telegram: { handle: "@jereai", url: "https://t.me/jereai" },
} as const;
