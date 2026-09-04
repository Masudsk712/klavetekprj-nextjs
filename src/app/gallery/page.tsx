import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Klavetek Green Blocks & Tiles",
  description:
    "Explore the Klavetek gallery — our AAC block manufacturing facility, machinery, production process, in-house quality lab, finished blocks and delivery fleet in Malda, West Bengal.",
  keywords: [
    "AAC blocks gallery",
    "AAC block manufacturing photos",
    "AAC block factory in Malda",
    "AAC block manufacturing process",
    "AAC block plant machinery",
    "AAC block quality testing lab",
    "Klavetek gallery",
    "AAC blocks in West Bengal",
  ],
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in/gallery",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "Gallery | Klavetek Green Blocks & Tiles",
    description:
      "Explore Klavetek's AAC block factory, machinery, production process, quality lab, finished blocks and delivery fleet.",
    images: [
      {
        url: "/images/gallery/gallery-hero.webp",
        width: 1200,
        height: 630,
        alt: "Klavetek AAC block manufacturing facility gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Klavetek Green Blocks & Tiles",
    description:
      "Explore Klavetek's AAC block factory, machinery, production process, quality lab, finished blocks and delivery fleet.",
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
        subtitle="Explore our factory, machinery, production process, quality lab, finished blocks and delivery fleet through our visual journey."
        backgroundImage="/images/gallery/gallery-hero.webp"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />
      <GalleryGrid key={initialCategory} initialCategory={initialCategory} />
    </>
  );
}