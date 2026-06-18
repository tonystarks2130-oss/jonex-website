import Script from "next/script";
import { CAL } from "@/lib/integrations";

/**
 * Loads cal.com embed.js once and initializes it (verbatim wire port of the
 * prior site's inline loader, index.html lines 631-639). After init, embed.js
 * delegates clicks on every [data-cal-link] element (see CalButton) to open the
 * booking popup, so booking CTAs work no matter when they hydrate.
 *
 * The inline script is our own static loader (not user content); next/script
 * afterInteractive is the idiomatic way to run it. Values come from the CAL
 * wire contract, do not hardcode divergent ones here.
 */
export function CalProvider() {
  return (
    <Script id="cal-embed" strategy="afterInteractive">
      {`(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
      else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "${CAL.embedScript}", "init");
Cal("init", { origin: "https://cal.com" });
Cal("ui", { hideEventTypeDetails: false, layout: "${CAL.config.layout}", styles: { branding: { brandColor: "${CAL.brandColor}" } } });`}
    </Script>
  );
}
