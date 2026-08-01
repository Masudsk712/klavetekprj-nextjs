import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import AboutPreview from "@/components/home/AboutPreview";
import WhyKlavetekStandsOut from "@/components/home/WhyKlavetekStandsOut";
import ManufacturingProcess from "@/components/home/ManufacturingProcess";
import ProductShowcase from "@/components/home/ProductShowcase";
import ComparisonTable from "@/components/home/ComparisonTable";
import TechnicalSpecs from "@/components/home/TechnicalSpecs";
import Applications from "@/components/home/Applications";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
 title: "Klavetek Green Blocks & Tiles | Premium AAC Block Manufacturer",
 description:
 "Leading manufacturer of ISI-certified AAC blocks in Eastern India. Sustainable, lightweight, fire-resistant building materials. Sizes: 100mm, 125mm, 150mm, 200mm, 250mm.",
 alternates: { canonical: "/" },
};

export default function HomePage() {
 return (
 <>
 <HeroSection />
 <TrustBar />
 <AboutPreview />
<WhyKlavetekStandsOut />
<ManufacturingProcess />
 <ProductShowcase />
 <ComparisonTable />
 <TechnicalSpecs />
 <Applications />
 <GalleryPreview />
 <Testimonials />
 <FAQ />
 <CTA />
 </>
 );
}