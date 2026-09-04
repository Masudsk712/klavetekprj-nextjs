import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import InternalHero from "@/components/shared/InternalHero";
import Container from "@/components/shared/Container";
import SeoFaq from "@/components/seo/SeoFaq";
import SeoRelatedLinks from "@/components/seo/SeoRelatedLinks";
import SeoBreadcrumbSchema from "@/components/seo/SeoBreadcrumbSchema";
import { blogArticles } from "@/data/blogArticles";
import { siteUrl, companyName, brandName } from "@/constants/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | KLAVETEK",
      robots: { index: false },
    };
  }

  return {
    title: `${article.title} | ${brandName}`,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: `${siteUrl}/blog/${article.slug}`,
      siteName: companyName,
      title: article.title,
      description: article.metaDescription,
      publishedTime: article.publishDate,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [article.image],
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const published = new Date(article.publishDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* BlogPosting structured data — mirrors the visible article content. */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image: `${siteUrl}${article.image}`,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: companyName, url: siteUrl },
    publisher: { "@type": "Organization", name: companyName, url: siteUrl },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${article.slug}`,
    },
  };

  /* Internal linking: product guides + the other articles on this blog. */
  const otherArticles = blogArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map((a) => ({
      label: a.title,
      href: `/blog/${a.slug}`,
      description:
        a.metaDescription.length > 120
          ? `${a.metaDescription.slice(0, 117)}…`
          : a.metaDescription,
    }));

  const relatedLinks = [
    {
      label: "AAC Blocks — Product Guide",
      href: "/aac-blocks",
      description: "What AAC blocks are, their advantages, sizes, specifications and applications.",
    },
    {
      label: "AAC Block Manufacturer in Malda",
      href: "/aac-block-manufacturer-malda",
      description: "Inside KLAVETEK's Malda facility — manufacturing process and quality control.",
    },
    {
      label: "Contact KLAVETEK",
      href: "/contact",
      description: "Request a quote, check delivery to your site, or visit the Malda factory.",
    },
    ...otherArticles,
  ];

  return (
    <>
      <SeoBreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: article.title },
        ]}
      />
      <Script
        id={`article-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <InternalHero
        title={article.title}
        subtitle={`${article.category} · Published ${published} · ${article.readTime}`}
        backgroundImage={article.image}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.title },
        ]}
      />

      <article className="relative py-14 md:py-20 bg-[var(--secondary-bg)] dark:bg-[var(--background)]">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Lead paragraph */}
            <p className="text-lg md:text-xl leading-relaxed font-medium text-[var(--heading)] dark:text-white border-l-4 border-primary/60 pl-5 mb-10">
              {article.intro}
            </p>

            {/* Article image — real local asset with descriptive alt text */}
            <figure className="mb-12">
              <Image
                src={article.image}
                alt={article.imageAlt}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, 768px"
                className="w-full h-auto rounded-2xl"
              />
              <figcaption className="mt-3 text-sm text-[var(--muted-text)]">
                {article.imageAlt}
              </figcaption>
            </figure>

            {/* Body sections */}
            {article.sections.map((section) => (
              <section key={section.heading} className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--heading)] dark:text-white mb-4">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mb-4 text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </article>

      {/* Visible FAQ + matching FAQPage schema (generated from the same data) */}
      <SeoFaq title={`${article.title} — FAQs`} items={article.faq} />

      {/* Internal links to product pages, contact and related articles */}
      <SeoRelatedLinks title="Related Guides & Pages" links={relatedLinks} />
    </>
  );
}