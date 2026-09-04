import Script from "next/script";

export interface FaqItem {
  question: string;
  answer: string;
}

interface SeoFaqProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
}

/**
 * Visible FAQ section + FAQPage JSON-LD generated from the SAME data, so the
 * structured data always mirrors what a visitor can actually see (no fake Q&As).
 */
export default function SeoFaq({ title = "Frequently Asked Questions", subtitle, items }: SeoFaqProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="seo-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="relative py-20 md:py-28 bg-[var(--secondary-bg)] dark:bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] dark:text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-[var(--body-text)] dark:text-[var(--muted-text)] max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <div className="space-y-4">
            {items.map((item, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 dark:bg-[var(--surface)]/40 px-6 py-5 open:border-primary/40 transition-colors duration-300"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm md:text-base font-semibold text-[var(--heading)] dark:text-white">
                  {item.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-45">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
