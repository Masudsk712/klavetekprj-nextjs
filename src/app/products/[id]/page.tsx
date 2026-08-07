import { Metadata } from "next";
import { notFound } from "next/navigation";
import InternalHero from "@/components/shared/InternalHero";
import ProductDetail from "@/components/products/ProductDetail";
import { productsPage } from "@/data/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return productsPage.products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = productsPage.products.find((p) => p.id === id);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | Klavetek Green Blocks & Tiles`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = productsPage.products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <InternalHero
        title={product.title}
        subtitle={product.tagline}
        backgroundImage="/images/products/products-hero.webp"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.title }
        ]}
      />
      <ProductDetail product={product} />
    </>
  );
}