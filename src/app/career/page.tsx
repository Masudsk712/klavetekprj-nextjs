import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import CareerContent from "@/components/career/CareerContent";

export const metadata: Metadata = {
 title: "Careers | Klavetek Green Blocks & Tiles",
 description: "Join Klavetek — a leading AAC block manufacturer. Explore open positions, employee benefits, and submit your resume for future opportunities.",
 alternates: { canonical: "/career" },
 openGraph: {
  type: "website",
  locale: "en_IN",
  url: "https://kgbt.in/career",
  siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
  title: "Careers | Klavetek Green Blocks & Tiles",
  description: "Join Klavetek — a leading AAC block manufacturer. Explore open positions and submit your resume.",
  images: [{ url: "/images/career/career-hero.webp", width: 1200, height: 630, alt: "Klavetek Careers" }],
 },
 twitter: {
  card: "summary_large_image",
  title: "Careers | Klavetek Green Blocks & Tiles",
  description: "Join Klavetek — a leading AAC block manufacturer. Explore open positions and submit your resume.",
  images: ["/images/career/career-hero.webp"],
 },
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