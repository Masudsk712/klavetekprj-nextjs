import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import ProductCatalogue from "@/components/products/ProductCatalogue";

export const metadata: Metadata = {
  title: "Products | Klavetek Green Blocks & Tiles",
  description:
    "Explore our range of premium AAC blocks — 100mm, 125mm, 150mm, 200mm, and 250mm — precision-engineered for modern construction.",
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in/products",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "Products | Klavetek Green Blocks & Tiles",
    description: "Explore our range of premium AAC blocks — 100mm, 125mm, 150mm, 200mm, and 250mm.",
    images: [{ url: "/images/products/products-hero.webp", width: 1200, height: 630, alt: "Klavetek Products" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Klavetek Green Blocks & Tiles",
    description: "Explore our range of premium AAC blocks — 100mm, 125mm, 150mm, 200mm, and 250mm.",
    images: ["/images/products/products-hero.webp"],
  },
};

export default function ProductsPage() {
  return (
    <>
      <InternalHero
        title="Our Products"
        subtitle="Premium AAC blocks engineered for modern construction."
        backgroundImage="/images/products/products-hero.webp"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <ProductCatalogue />
    </>
  );
}
