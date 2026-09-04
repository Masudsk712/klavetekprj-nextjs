import Script from "next/script";
import { siteUrl } from "@/constants/seo";

interface SeoBreadcrumbSchemaProps {
  items: { name: string; href?: string }[];
}

/**
 * Injects a BreadcrumbList JSON-LD block. The visible breadcrumb trail is
 * already rendered by the InternalHero component; this schema mirrors it.
 */
export default function SeoBreadcrumbSchema({ items }: SeoBreadcrumbSchemaProps) {
  const itemListElement = items.map((item, index) => {
    const entry: Record<string, string> = {
      "@type": "ListItem",
      position: String(index + 1),
      name: item.name,
    };
    if (item.href) {
      entry.item = item.href.startsWith("http") ? item.href : `${siteUrl}${item.href}`;
    }
    return entry;
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
