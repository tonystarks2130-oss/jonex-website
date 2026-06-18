import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { Section, Heading } from "@/components/ui/primitives";
import {
  LinkedInIcon,
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/ui/BrandIcons";
import { FOUNDERS, type Founder } from "@/lib/content";

/**
 * "Behind JoNeX" (DESIGN_CONTRACT IA — Behind/Team) — founder cards in the
 * rapidmed.app style: portrait + name + role + a personal quote + a row of
 * social/contact buttons.
 *
 * Hierarchy (James, 2026-06-14): Jeremy (Founder & CEO) + Jimmy (CTO) sit on the
 * top row at equal weight; James (Founding Engineer) sits one tier lower, centered.
 *
 * Each founder shows their confirmed photo, approved words, and live links. A
 * founder with no supplied links simply omits the link row (shown once they send
 * them) — names/roles are verified, faces/words/links are never guessed.
 */

const SOCIAL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  LinkedIn: LinkedInIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  TikTok: TikTokIcon,
  WhatsApp: WhatsAppIcon,
};

function FounderCard({ founder }: { founder: Founder }) {
  const hasLinks = founder.socials.length > 0 || Boolean(founder.email);
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
          “{founder.quote}”
        </blockquote>

        {hasLinks && (
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {founder.socials.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label] ?? Mail;
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${founder.name} on ${label}`}
                  aria-label={`${founder.name} on ${label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}

            {founder.email && (
              <a
                href={`mailto:${founder.email}`}
                title={`Email ${founder.name}`}
                aria-label={`Email ${founder.name}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
              >
                <Mail className="h-3.5 w-3.5" />
                Get in touch
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </figure>
  );
}

export function Behind() {
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
    </Section>
  );
}
