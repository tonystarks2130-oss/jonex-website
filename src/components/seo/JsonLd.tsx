import {
  BRAND,
  CAPABILITIES,
  CONSULTING_SERVICES,
  INDUSTRIES,
  FAQS,
} from "@/lib/content";
import { LOGO_SRC } from "@/lib/integrations";

/**
 * Structured data (DESIGN_CONTRACT §AEO / "Sardaukar test"). The machine-readable
 * identity answer engines (ChatGPT / Perplexity / Google) lift verbatim. Every
 * field is factual and traces to content.ts — no invented socials, no empty
 * superlatives. Rendered server-side into <head> via a JSON-LD script tag.
 */
const SITE = "https://jonex.site";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: BRAND.full,
      alternateName: "JoNeX",
      url: SITE,
      logo: LOGO_SRC,
      description: BRAND.positioning,
      slogan: BRAND.tagline,
      knowsAbout: [
        ...CAPABILITIES,
        ...INDUSTRIES.map((i) => i.name),
        "Revenue Cycle Automation",
        "AI Voice Receptionists",
        "Healthcare Operations Automation",
      ],
      areaServed: { "@type": "Place", name: "Worldwide" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: BRAND.full,
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: BRAND.full,
      url: SITE,
      description:
        "Engineered AI systems and technology consulting: AI voice receptionists, agentic AI, intelligent automation, and custom software built and owned by the client — with healthcare-grade, compliance-conscious depth.",
      provider: { "@id": `${SITE}/#organization` },
      areaServed: { "@type": "Place", name: "Worldwide" },
      serviceType: [...CAPABILITIES, ...CONSULTING_SERVICES],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Industries served",
        itemListElement: INDUSTRIES.map((i) => ({
          "@type": "OfferCatalog",
          name: i.name,
          itemListElement: i.solutions.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s },
          })),
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export function JsonLd() {
  // Data is 100% static + typed (content.ts / integrations.ts) — no user input.
  // The only JSON-LD injection vector is a literal "<" closing the <script>;
  // escape it so a future copy edit can never break out of the tag.
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
