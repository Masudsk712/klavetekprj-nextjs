import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
 title: "Gallery | Klavetek Green Blocks & Tiles",
    description: "Explore our manufacturing facility, machinery, production process, projects, and construction sites through our visual gallery.",
    alternates: { canonical: "/gallery" },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "https://kgbt.in/gallery",
      siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
      title: "Gallery | Klavetek Green Blocks & Tiles",
      description: "Explore Klavetek's manufacturing facility, projects and construction sites.",
      images: [{ url: "/images/gallery/gallery-hero.webp", width: 1200, height: 630, alt: "Klavetek Gallery" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gallery | Klavetek Green Blocks & Tiles",
      description: "Explore Klavetek's manufacturing facility, projects and construction sites.",
      images: ["/images/gallery/gallery-hero.webp"],
    },
  };

interface GalleryPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.category) ? params.category[0] : params.category;
  const initialCategory = typeof raw === "string" ? raw : "";

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
  <GalleryGrid key={initialCategory} initialCategory={initialCategory} />
 </>
 );
}