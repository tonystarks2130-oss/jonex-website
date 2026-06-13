import { Section, Heading } from "@/components/ui/primitives";
import { AudioDemo } from "@/components/media/AudioDemo";
import { VOICE_DEMOS } from "@/lib/integrations";

/**
 * Hear the AI (DESIGN_CONTRACT IA §5) — the differentiator neither reference
 * has. Embeds the 3 Cloudinary voice demos [KEEP assets].
 */
export function HearTheAI() {
  return (
    <Section id="hear-the-ai" className="border-y border-border bg-bg-raised/40">
      <Heading
        eyebrow="Hear It Yourself"
        title="Listen to the AI handle a real call"
        intro="Three live receptionist demos — different industries, same human-grade conversation."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {VOICE_DEMOS.map((d) => (
          <AudioDemo key={d.id} label={d.label} src={d.src} />
        ))}
      </div>
    </Section>
  );
}
