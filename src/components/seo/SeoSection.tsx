import type { ReactNode } from "react";

interface SeoSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Simple server-side section wrapper with a semantic h2 heading, used across
 * the SEO landing pages so every page keeps a consistent heading hierarchy
 * (one H1 in the hero, H2 per section, H3 for sub-blocks).
 */
export default function SeoSection({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: SeoSectionProps) {
  return (
    <section id={id} className={`relative py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 md:mb-12 max-w-3xl">
          {eyebrow && (
            <span className="mb-3 inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-primary text-xs font-semibold uppercase tracking-wider">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--heading)] dark:text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-[var(--body-text)] dark:text-[var(--muted-text)] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
