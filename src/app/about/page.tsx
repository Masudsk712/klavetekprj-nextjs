import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import FivePillars from "@/components/about/FivePillars";
import ManufacturingProcessAbout from "@/components/about/ManufacturingProcessAbout";
import Composition from "@/components/about/Composition";
import WhyAacBlocks from "@/components/about/WhyAacBlocks";
import Certifications from "@/components/about/Certifications";

export const metadata: Metadata = {
 title: "About Us | Klavetek Green Blocks & Tiles",
 description: "Discover Klavetek's journey since 2010 — a leading AAC block manufacturer in Eastern India with ISI certification and sustainable manufacturing.",
};

export default function AboutPage() {
  return (
    <>
  <InternalHero
    title="About Klavetek"
    subtitle="Leading the AAC block revolution in Eastern India with sustainable innovation, engineering excellence, and uncompromising quality since 2010."
    backgroundImage="/images/about/about-hero.webp"
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "About Us" }
    ]}
  />
  <CompanyStory />
 <MissionVision />
 <CoreValues />
 <FivePillars />
 <ManufacturingProcessAbout />
 <Composition />
 <WhyAacBlocks />
 <Certifications />
 </>
 );
}