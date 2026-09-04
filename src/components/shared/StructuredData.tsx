import Script from "next/script";
import { company } from "@/constants/company";
import { addressLocality, addressRegion, addressCountry, areaServed, openingHours, siteUrl } from "@/constants/seo";

/**
 * Global Organization / LocalBusiness structured data, injected once in the root
 * layout so it applies to the entire site. Product and FAQ schemas are intentionally
 * scoped to the pages they belong on (Home / Products / SEO landing pages) to
 * avoid duplicate or conflicting structured data across unrelated routes.
 */
export default function StructuredData() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: company.name,
    url: siteUrl,
    logo: `${siteUrl}/logos/logo.png`,
    description:
      "Premium AAC (autoclaved aerated concrete) block manufacturer in Malda, West Bengal. Lightweight, fire-resistant building materials since 2020.",
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality,
      addressRegion,
      addressCountry,
    },
    areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: openingHours.weekday.split(","),
      opens: openingHours.opens,
      closes: openingHours.closes,
    },
    foundingDate: "2020",
    sameAs: [
      "https://www.facebook.com/share/1HL2eZV5kX/",
      "https://www.instagram.com/klavetekaacblocks?igsh=MTg3dHpybXk0MGRzZw==",
      "https://www.youtube.com/klavetek",
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
    />
  );
}
