import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Spearhead } from "@/components/sections/Spearhead";
import { HearTheAI } from "@/components/sections/HearTheAI";
import { ProblemOutcome } from "@/components/sections/ProblemOutcome";
import { Industries } from "@/components/sections/Industries";
import { Capabilities } from "@/components/sections/Capabilities";
import { EngineeredStack } from "@/components/sections/EngineeredStack";
import { HealthcareSpecialty } from "@/components/sections/HealthcareSpecialty";
import { AiVoice } from "@/components/sections/AiVoice";
import { Process } from "@/components/sections/Process";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Behind } from "@/components/sections/Behind";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Spearhead />
        <HearTheAI />
        <ProblemOutcome />
        <Industries />
        <Capabilities />
        <EngineeredStack />
        <HealthcareSpecialty />
        <AiVoice />
        <Process />
        <Proof />
        <Services />
        <About />
        <Behind />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
