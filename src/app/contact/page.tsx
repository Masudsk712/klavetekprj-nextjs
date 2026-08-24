import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Klavetek Green Blocks & Tiles",
  description:
    "Get in touch with Klavetek for AAC block inquiries, price quotes, and technical support. Located in Malda, West Bengal.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in/contact",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "Contact Us | Klavetek Green Blocks & Tiles",
    description: "Get in touch with Klavetek for AAC block inquiries, price quotes, and technical support.",
    images: [{ url: "/images/contact/contact-hero.webp", width: 1200, height: 630, alt: "Contact Klavetek" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Klavetek Green Blocks & Tiles",
    description: "Get in touch with Klavetek for AAC block inquiries, price quotes, and technical support.",
    images: ["/images/contact/contact-hero.webp"],
  },
};

interface ContactPageProps {
  searchParams: Promise<{ product?: string | string[] }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.product) ? params.product[0] : params.product;
  const preselectedProduct = typeof raw === "string" ? raw.slice(0, 200) : "";

  return (
    <>
      <InternalHero
        title="Contact Us"
        subtitle="Get in touch with Klavetek for AAC block inquiries, price quotes, and technical support. Located in Malda, West Bengal."
        backgroundImage="/images/contact/contact-hero.webp"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <ContactContent preselectedProduct={preselectedProduct} />
    </>
  );
}