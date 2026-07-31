import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import ProductCard from "@/components/products/ProductCard";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
 title: "Products | Klavetek Green Blocks & Tiles",
 description: "Explore our range of premium AAC blocks — 100mm, 125mm, 150mm, 200mm, and 250mm. ISI certified, precision-engineered for every construction need.",
};

export default function ProductsPage() {
  return (
    <>
  <InternalHero
    title="Our Products"
    subtitle="Premium ISI-certified AAC blocks engineered for strength, durability, and sustainable construction across India."
    backgroundImage="/images/products/products-hero.webp"
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Products" }
    ]}
  />
  <ProductCard />
 <CTA />
 </>
 );
}