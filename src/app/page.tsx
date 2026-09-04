import { Metadata } from "next";
import { homeTitle } from "@/constants/seo";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import AboutPreview from "@/components/home/AboutPreview";
import WhyKlavetekStandsOut from "@/components/home/WhyKlavetekStandsOut";
import ManufacturingProcess from "@/components/home/ManufacturingProcess";
import ProductCardGrid from "@/components/products/ProductCardGrid";
import ComparisonTable from "@/components/home/ComparisonTable";
import TechnicalSpecs from "@/components/home/TechnicalSpecs";
import Applications from "@/components/home/Applications";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CinematicCTA from "@/components/home/CinematicCTA";
import HomeStructuredData from "@/components/shared/HomeStructuredData";
import AacGuideLinks from "@/components/home/AacGuideLinks";

export const metadata: Metadata = {
  title: homeTitle,
  description:
    "KLAVETEK manufactures premium AAC blocks in Malda, West Bengal — lightweight, autoclaved aerated concrete blocks for homes, hospitals, commercial buildings and industrial projects. Supplied across West Bengal and North Bengal.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "KLAVETEK | AAC Block Manufacturer in Malda, West Bengal",
    description:
      "Premium AAC block manufacturer in Malda, West Bengal. Lightweight, fire-resistant, IS 2185-compliant blocks for modern construction across West Bengal and North Bengal.",
    images: [{ url: "/images/about/about-hero.webp", width: 1200, height: 630, alt: "Klavetek AAC blocks manufacturedin Malda, West Bengal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KLAVETEK | AAC Block Manufacturer in Malda, West Bengal",
    description: "Premium AAC block manufacturer in Malda, West Bengal. Supplying lightweight AAC blocks across West Bengal and North Bengal.",
    images: ["/images/about/about-hero.webp"],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <HeroSection />
      <TrustBar />
      <AboutPreview />
      <WhyKlavetekStandsOut />
      <ManufacturingProcess />
      <ProductCardGrid />
      <ComparisonTable />
      <TechnicalSpecs />
      <Applications />
      <AacGuideLinks />
      <GalleryPreview />
      <Testimonials />
      <FAQ />
      <CinematicCTA />
    </>
  );
}
