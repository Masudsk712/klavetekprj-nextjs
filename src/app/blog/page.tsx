import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import BlogContent from "@/components/blog/BlogContent";

export const metadata: Metadata = {
 title: "Blog & Insights | Klavetek Green Blocks & Tiles",
 description: "Expert insights on AAC blocks, sustainable construction, cost analysis, and building material technology from Klavetek's engineering team.",
 alternates: { canonical: "/blog" },
 openGraph: {
  type: "website",
  locale: "en_IN",
  url: "https://kgbt.in/blog",
  siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
  title: "Blog & Insights | Klavetek Green Blocks & Tiles",
  description: "Expert insights on AAC blocks and sustainable construction from Klavetek.",
  images: [{ url: "/images/blog/blog-hero.webp", width: 1200, height: 630, alt: "Klavetek Blog" }],
 },
 twitter: {
  card: "summary_large_image",
  title: "Blog & Insights | Klavetek Green Blocks & Tiles",
  description: "Expert insights on AAC blocks and sustainable construction from Klavetek.",
  images: ["/images/blog/blog-hero.webp"],
 },
};

export default function BlogPage() {
  return (
    <>
  <InternalHero
    title="Blog & Insights"
    subtitle="Expert insights on AAC blocks, sustainable construction, cost analysis, and building material technology from Klavetek's engineering team."
    backgroundImage="/images/blog/blog-hero.webp"
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Blog" }
    ]}
  />
  <BlogContent />
 </>
 );
}
