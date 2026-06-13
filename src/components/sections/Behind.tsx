import Image from "next/image";
import { Section, Heading } from "@/components/ui/primitives";
import { FOUNDERS } from "@/lib/content";
import { FLAGS } from "@/lib/flags";

/**
 * "Behind JoNeX" (DESIGN_CONTRACT IA — Behind/Team) — founder cards in the
 * rapidmed.app style: avatar + name + role + a personal quote.
 *
 * Flag-driven (FLAGS.founders): "draft" renders an initials-avatar placeholder
 * and draft quotes (James has no headshot yet; photo→name mapping unconfirmed).
 * "real" swaps in each founder's confirmed `photo` + approved words — in place,
 * no structural change. Names + roles are verified; quotes/photos are clearly
 * placeholder until James confirms. Faces are never guessed onto names.
 */
export function Behind() {
  const isDraft = FLAGS.founders === "draft";

  return (
    <Section id="behind" className="border-y border-border bg-bg-raised/40">
      <Heading
        eyebrow="Behind JoNeX"
        title="The people who build and stand behind your systems"
        intro="No faceless agency. You work directly with the founders who design, build, and support what you run on."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {FOUNDERS.map((f) => (
          <figure
            key={f.name}
            className="flex flex-col gap-5 rounded-[10px] border border-border bg-surface p-6 sm:flex-row sm:items-start"
          >
            <div className="shrink-0">
              {f.photo ? (
                <Image
                  src={f.photo}
                  alt={`${f.name} — ${f.role}`}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <span
                  className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-bg-raised font-display text-2xl font-bold text-fg-muted"
                  aria-label={`${f.name} — photo coming soon`}
                >
                  {f.initials}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <figcaption>
                <span className="font-display text-lg font-semibold text-fg">
                  {f.name}
                </span>
                <span className="mt-0.5 block text-sm font-medium text-accent">
                  {f.role}
                </span>
              </figcaption>

              <blockquote className="mt-3 border-l-2 border-border pl-4 text-sm italic leading-6 text-fg-muted">
                “{f.quoteDraft}”
              </blockquote>

              {f.socials.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {f.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="text-xs font-semibold text-fg-muted transition-colors hover:text-accent"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </figure>
        ))}
      </div>

      {isDraft && (
        <p className="mt-4 text-center text-xs text-fg-muted/70">
          Founder photos and personal notes are placeholders — replaced with the
          team’s real headshots and words once confirmed.
        </p>
      )}
    </Section>
  );
}
