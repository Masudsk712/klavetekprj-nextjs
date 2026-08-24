import Script from "next/script";
import { company } from "@/constants/company";

/**
 * Home-page-only structured data: Product + FAQPage schemas.
 * Rendered exclusively on the homepage where the product and FAQ sections
 * live, so these schemas are not duplicated across unrelated routes.
 */
export default function HomeStructuredData() {
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