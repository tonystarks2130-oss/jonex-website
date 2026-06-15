import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";
import {
  LinkedInIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/ui/BrandIcons";
import { FOUNDERS, type Founder } from "@/lib/content";
import { FLAGS } from "@/lib/flags";

/**
 * "Behind JoNeX" (DESIGN_CONTRACT IA — Behind/Team) — founder cards in the
 * rapidmed.app style: portrait + name + role + a personal quote + a row of
 * social/contact buttons.
 *
 * Hierarchy (James, 2026-06-14): Jeremy (Founder & CEO) + Jimmy (CTO) sit on the
 * top row at equal weight; James (Founding Engineer) sits one tier lower, centered.
 *
 * Flag-driven (FLAGS.founders): "draft" renders an initials-avatar placeholder,
 * draft quotes, and PLACEHOLDER (disabled) social/contact buttons — James has no
 * headshot yet and the founders' real links aren't supplied. "real" swaps in each
 * person's confirmed photo, approved words, and live links — in place, no
 * structural change. Names + roles are verified; faces/words/links are never guessed.
 */

// Placeholder social set shown until each founder supplies real links. Icons use
// the site's brand glyphs; buttons are disabled (no fabricated URLs).
const SOCIAL_PLACEHOLDERS = [
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Email", Icon: Mail },
] as const;

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <figure className="lift flex h-full flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
      <div className="shrink-0">
        {founder.photo ? (
          <Image
            src={founder.photo}
            alt={`${founder.name} — ${founder.role}`}
            width={208}
            height={208}
            className="h-40 w-40 rounded-2xl object-cover sm:h-48 sm:w-48"
          />
        ) : (
          <span
            className="flex h-40 w-40 items-center justify-center rounded-2xl border border-border bg-bg-raised font-display text-4xl font-bold text-fg-muted sm:h-48 sm:w-48"
            aria-label={`${founder.name} — photo coming soon`}
          >
            {founder.initials}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <figcaption>
          <span className="font-display text-2xl font-bold tracking-tight text-fg">
            {founder.name}
          </span>
          <span className="mt-1 block text-sm font-semibold text-accent">
            {founder.role}
          </span>
          {founder.subRole && (
            <span className="mt-0.5 block text-xs font-medium text-fg-muted">
              {founder.subRole}
            </span>
          )}
        </figcaption>

        <blockquote className="mt-4 border-l-2 border-accent/60 pl-4 text-sm italic leading-7 text-fg-muted">
          “{founder.quoteDraft}”
        </blockquote>

        {/* Placeholder buttons — real links wired in once James supplies them. */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {SOCIAL_PLACEHOLDERS.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              disabled
              title={`${label} — link coming soon`}
              aria-label={`${founder.name} on ${label} — coming soon`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted/70 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:border-border disabled:hover:text-fg-muted/70"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}

          <button
            type="button"
            disabled
            title="Contact — coming soon"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-accent/10"
          >
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </figure>
  );
}

export function Behind() {
  const isDraft = FLAGS.founders === "draft";

  // Top tier = everyone except the Founding Engineer (Jeremy, Jimmy); James drops
  // one tier lower, centered. Order preserved from the verified FOUNDERS roster.
  const leads = FOUNDERS.filter((f) => f.role !== "Founding Engineer");
  const engineer = FOUNDERS.find((f) => f.role === "Founding Engineer");

  return (
    <Section id="behind" className="border-y border-border bg-bg-raised/40">
      <Heading
        eyebrow="Behind JoNeX"
        title="The people who build and stand behind your systems"
        intro="No faceless agency. You work directly with the founders who design, build, and support what you run on."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2">
        {leads.map((f) => (
          <FounderCard key={f.name} founder={f} />
        ))}
      </div>

      {engineer && (
        <div className="mx-auto mt-6 max-w-3xl">
          <FounderCard founder={engineer} />
        </div>
      )}

      {isDraft && (
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-fg-muted/70">
          One headshot is on the way, these founder notes are first drafts, and the
          contact buttons are placeholders — all swap in place once finalized.
        </p>
      )}
    </Section>
  );
}
