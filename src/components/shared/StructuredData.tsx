import Script from "next/script";
import { company } from "@/constants/company";

/**
 * Global Organization structured data, injected once in the root layout so it
 * applies to the entire site. Product and FAQ schemas are intentionally scoped
 * to the pages they belong on (Home / Products) to avoid duplicate or
 * conflicting structured data across unrelated routes.
 */
export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: "https://kgbt.in",
    logo: "https://kgbt.in/logos/logo.png",
    description:
      "Premium AAC block manufacturer in Eastern India. ISI-certified, sustainable building materials since 2020.",
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressRegion: "West Bengal",
      addressCountry: "IN",
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}