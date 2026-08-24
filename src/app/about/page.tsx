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
 alternates: { canonical: "/about" },
 openGraph: {
  type: "website",
  locale: "en_IN",
  url: "https://kgbt.in/about",
  siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
  title: "About Us | Klavetek Green Blocks & Tiles",
  description: "Discover Klavetek's journey since 2010 — a leading AAC block manufacturer in Eastern India.",
  images: [{ url: "/images/about/about-hero.webp", width: 1200, height: 630, alt: "About Klavetek" }],
 },
 twitter: {
  card: "summary_large_image",
  title: "About Us | Klavetek Green Blocks & Tiles",
  description: "Discover Klavetek's journey since 2010 — a leading AAC block manufacturer in Eastern India.",
  images: ["/images/about/about-hero.webp"],
 },
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
