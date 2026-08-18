import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import BlogContent from "@/components/blog/BlogContent";

export const metadata: Metadata = {
 title: "Blog & Insights | Klavetek Green Blocks & Tiles",
 description: "Expert insights on AAC blocks, sustainable construction, cost analysis, and building material technology from Klavetek's engineering team.",
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
