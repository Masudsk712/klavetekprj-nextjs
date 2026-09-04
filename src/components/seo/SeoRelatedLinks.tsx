import Link from "next/link";

export interface RelatedLink {
  label: string;
  href: string;
  description?: string;
}

interface SeoRelatedLinksProps {
  title: string;
  links: RelatedLink[];
}

/**
 * Small internal-linking hub rendered at the bottom of SEO pages. Helps
 * users (and crawlers) discover related content without keyword stuffing.
 */
export default function SeoRelatedLinks({ title, links }: SeoRelatedLinksProps) {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[var(--heading)] dark:text-white tracking-tight mb-10 md:mb-14">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-green"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-[var(--heading)] dark:text-white group-hover:text-primary transition-colors duration-300">
                  {link.label}
                </h3>
                <svg
                  className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              {link.description && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">
                  {link.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
