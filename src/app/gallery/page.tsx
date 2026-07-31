import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
 title: "Gallery | Klavetek Green Blocks & Tiles",
 description: "Explore our manufacturing facility, machinery, production process, projects, and construction sites through our visual gallery.",
};

export default function GalleryPage() {
  return (
    <>
  <InternalHero
    title="Gallery"
    subtitle="Explore our manufacturing facility, machinery, production processes, and construction projects through our visual journey."
    backgroundImage="/images/gallery/gallery-hero.webp"
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Gallery" }
    ]}
  />
  <GalleryGrid />
 </>
 );
}