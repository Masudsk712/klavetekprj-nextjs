import Link from "next/link";

const guideCards = [
  {
    badge: "AAC Blocks",
    title: "AAC Blocks — Complete Guide",
    text: "What autoclaved aerated concrete is, its advantages, sizes, specifications and applications.",
    href: "/aac-blocks",
    image: "/images/products/products-hero.webp",
  },
  {
    badge: "Local Supply",
    title: "AAC Blocks in Malda",
    text: "Buy blocks directly from our Malda factory with delivery across the district and North Bengal.",
    href: "/aac-blocks-in-malda",
    image: "/images/features/Lightweight.webp",
  },
  {
    badge: "Manufacturer",
    title: "AAC Block Manufacturer in Malda",
    text: "Inside KLAVETEK's Malda facility — manufacturing process, quality control and supply capabilities.",
    href: "/aac-block-manufacturer-malda",
    image: "/images/process/Autoclaving.webp",
  },
  {
    badge: "Lightweight",
    title: "Lightweight Blocks",
    text: "Why lighter walls mean faster construction, lower structural load and better insulation.",
    href: "/lightweight-blocks",
    image: "/images/features/Lightweight.webp",
  },
  {
    badge: "Pricing",
    title: "AAC Block Price in Malda",
    text: "What drives AAC block pricing and how to get an accurate quote for your project.",
    href: "/aac-blocks-price-malda",
    image: "/images/features/Cost&Time-Saving.webp",
  },
];

/**
 * Homepage internal-linking strip that surfaces the main AAC content hub.
 * Rendered server-side; cards carry no motion so they stay fast and crawlable.
 */
export default function AacGuideLinks() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="mb-3 inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-primary text-xs font-semibold uppercase tracking-wider">
            AAC Block Guides
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] dark:text-white tracking-tight">
            Learn About AAC Blocks
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--body-text)] max-w-2xl mx-auto leading-relaxed dark:text-[var(--muted-text)]">
            Practical guides to choosing, buying and building with AAC blocks from a Malda-based manufacturer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 hover:border-primary/50 hover:shadow-green transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <span className="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold text-white">
                  {card.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[var(--heading)] dark:text-white group-hover:text-primary transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">
                  {card.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read Guide
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
