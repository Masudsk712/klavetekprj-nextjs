import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import CareerContent from "@/components/career/CareerContent";

export const metadata: Metadata = {
 title: "Careers | Klavetek Green Blocks & Tiles",
 description: "Join Klavetek — a leading AAC block manufacturer. Explore open positions, employee benefits, and submit your resume for future opportunities.",
};

export default function CareerPage() {
  return (
    <>
  <InternalHero
    title="Careers"
    subtitle="Join Klavetek's team of innovators and builders. Explore opportunities to grow with India's leading AAC block manufacturer."
    backgroundImage="/images/career/career-hero.webp"
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Careers" }
    ]}
  />
  <CareerContent />
 </>
 );
}