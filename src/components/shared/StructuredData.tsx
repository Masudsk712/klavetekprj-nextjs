import Script from "next/script";
import { company } from "@/constants/company";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: "https://kgbt.in",
    logo: "https://kgbt.in/logos/logo.png",
    description:
      "Premium AAC block manufacturer in Eastern India. ISI-certified, sustainable building materials since 2010.",
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    foundingDate: "2010",
    sameAs: [
      "https://www.facebook.com/share/1HL2eZV5kX/",
      "https://www.instagram.com/klavetekaacblocks?igsh=MTg3dHpybXk0MGRzZw==",
      "https://www.youtube.com/klavetek",
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Klavetek AAC Blocks",
    description:
      "ISI-certified Autoclaved Aerated Concrete blocks available in 100mm, 125mm, 150mm, 200mm, and 250mm sizes.",
    brand: {
      "@type": "Brand",
      name: "Klavetek",
    },
    manufacturer: {
      "@type": "Organization",
      name: company.name,
    },
    category: "Building Materials",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are AAC blocks and how are they different from clay bricks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AAC (Autoclaved Aerated Concrete) blocks are lightweight, precast building materials made from fly ash, cement, lime, and aluminum powder. They are 8x larger, 40% lighter, and provide superior thermal and sound insulation compared to clay bricks.",
        },
      },
      {
        "@type": "Question",
        name: "Are Klavetek AAC blocks ISI certified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our AAC blocks are manufactured in compliance with IS 2185 (Part 3) standards with rigorous quality control at every stage of production.",
        },
      },
      {
        "@type": "Question",
        name: "What sizes of AAC blocks do you offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We manufacture AAC blocks in 100mm, 125mm, 150mm, 200mm, and 250mm thicknesses, all with a standard length of 600mm and height of 200mm.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
