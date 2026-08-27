import { Metadata } from "next";
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

export const metadata: Metadata = {
 title: "Klavetek Green Blocks & Tiles | Premium AAC Block Manufacturer",
 description:
 "Leading manufacturer of ISI-certified AAC blocks in Eastern India. Sustainable, lightweight, fire-resistant building materials. Sizes: 100mm, 125mm, 150mm, 200mm, 250mm.",
 alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "Klavetek Green Blocks & Tiles | Premium AAC Block Manufacturer",
    description:
      "Leading manufacturer of ISI-certified AAC blocks in Eastern India. Sustainable, lightweight, fire-resistant building materials.",
    images: [{ url: "/images/about/about-hero.webp", width: 1200, height: 630, alt: "Klavetek Green Blocks & Tiles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klavetek Green Blocks & Tiles | Premium AAC Block Manufacturer",
    description: "ISI-certified AAC blocks manufactured in Eastern India since 2020.",
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
 <GalleryPreview />
 <Testimonials />
 <FAQ />
  <CinematicCTA />
 </>
 );
}