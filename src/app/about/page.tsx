import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import WhyKlavetek from "@/components/about/WhyKlavetek";
import Philosophy from "@/components/about/Philosophy";
import ManagingDirectorSection from "@/components/about/ManagingDirectorSection";
import TeamSection from "@/components/about/TeamSection";
import AwardsCertifications from "@/components/about/AwardsCertifications";
import ImpactStats from "@/components/about/ImpactStats";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
 title: "About Us | Klavetek Green Blocks & Tiles",
 description: "Discover Klavetek's journey since 2010 — a leading AAC block manufacturer in Eastern India with ISI certification and sustainable manufacturing.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <JourneyTimeline />
      <WhyKlavetek />
      <Philosophy />
      <ManagingDirectorSection />
      <TeamSection />
      <AwardsCertifications />
      <ImpactStats />
      <AboutCTA />
    </>
  );
}
