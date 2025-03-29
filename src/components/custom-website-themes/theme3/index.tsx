import { useEffect } from "react";
import { CoupleProfiles } from "./components/CoupleProfiles";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LoveStory } from "./components/LoveStory";
import { NewsSection } from "./components/NewsSection";
import { RsvpForm } from "./components/RsvpForm";
import { Timeline } from "./components/Timeline";
import { WeddingParty } from "./components/WeddingParty";
import { injectFontStyles } from "../theme1/styles/fonts";

export default function Page() {
  useEffect(() => {
    injectFontStyles();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 max-w-6xl space-y-24">
        <HeroSection />
        <CoupleProfiles />
        <LoveStory />
        <Gallery />
        <WeddingParty />
        <RsvpForm />
        <Timeline />
        <NewsSection />
      </div>
      <Footer />
    </main>
  );
}
