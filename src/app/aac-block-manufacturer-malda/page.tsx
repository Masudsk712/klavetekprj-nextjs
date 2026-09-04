import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import InternalHero from "@/components/shared/InternalHero";
import SeoSection from "@/components/seo/SeoSection";
import SeoFaq from "@/components/seo/SeoFaq";
import SeoRelatedLinks from "@/components/seo/SeoRelatedLinks";
import SeoBreadcrumbSchema from "@/components/seo/SeoBreadcrumbSchema";
import { company } from "@/constants/company";
import { productsPage } from "@/data/products";

export const metadata: Metadata = {
  title: "AAC Block Manufacturer in Malda | KLAVETEK — AAC Block Factory in Malda, West Bengal",
  description:
    "KLAVETEK is an AAC block manufacturer in Malda, West Bengal, with a dedicated factory producing autoclaved aerated concrete blocks since 2020. Learn about our manufacturing process, quality control and supply capabilities.",
  keywords: [
    "AAC block manufacturer in Malda",
    "AAC block factory in Malda",
    "top blocks factory in Malda",
    "building blocks manufacturer in Malda",
    "AAC block manufacturer in West Bengal",
    "AAC block manufacturer in North Bengal",
  ],
  alternates: { canonical: "/aac-block-manufacturer-malda" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in/aac-block-manufacturer-malda",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "AAC Block Manufacturer in Malda | KLAVETEK",
    description:
      "KLAVETEK runs an AAC block manufacturing facility in Malda, West Bengal — precision-made autoclaved aerated concrete blocks since 2020.",
    images: [{ url: "/images/process/Autoclaving.webp", width: 1200, height: 630, alt: "AAC block manufacturing autoclave at KLAVETEK, Malda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AAC Block Manufacturer in Malda | KLAVETEK",
    description: "AAC block factory in Malda, West Bengal by KLAVETEK.",
    images:["/images/process/Autoclaving.webp"],
  },
};

export default function AacBlockManufacturerMaldaPage() {
  return (
    <>
      <SeoBreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "AAC Block Manufacturer in Malda" },
        ]}
      />
      <InternalHero
        title="AAC Block Manufacturer in Malda"
        subtitle="KLAVETEK Green Blocks & Tiles Pvt. Ltd. operates an AAC block manufacturing facility in Malda, West Bengal — making precision AAC blocks since 2020."
        backgroundImage="/images/process/Autoclaving.webp"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "AAC Block Manufacturer" }]}
      />
      <SeoSection
        eyebrow="About the Company"
        title="KLAVETEK — A Malda-Based AAC Block Manufacturer"
        subtitle="KLAVETEK Green Blocks & Tiles Pvt. Ltd. was founded in 2020 with one focus: manufacturing high-quality AAC blocks closer to the construction industry of Eastern India."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4 text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
            <p>
              Our manufacturing unit is located at {company.address}, placing production close to the builders, developers and contractors we serve across West Bengal and North Bengal.
            </p>
            <p>
              From a skilled team of more than 50 professionals, our facility produces AAC blocks in five thicknesses — 100mm, 125mm, 150mm, 200mm and 250mm — for residential, hospital, commercial, educational and industrial projects. Today KLAVETEK blocks are used in projects across more than four states in Eastern India.
            </p>
            <p>
              Read the full story on the{" "}
              <Link href="/about" className="text-primary font-semibold hover:underline">About KLAVETEK page</Link>.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6 space-y-3 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Founded</p>
              <p className="font-bold text-[var(--heading)] dark:text-white">2020</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Facility</p>
              <p className="font-bold text-[var(--heading)] dark:text-white">{company.address}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Product Range</p>
              <p className="font-bold text-[var(--heading)] dark:text-white">100mm – 250mm AAC blocks</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Contact</p>
              <p className="font-bold text-[var(--heading)] dark:text-white">{company.phone}</p>
            </div>
          </div>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="Manufacturing Process"
        title="Our AAC Block Manufacturing Capabilities"
        subtitle="Every stage of production is controlled and monitored, from raw material selection through to autoclaving and final quality checks."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { step: "Raw Material Selection", text: "Cement, lime, gypsum and fly ash are sourced and tested to maintain a consistent, quality-controlled mix." },
            { step: "Precision Batching & Mixing", text: "A computer-controlled mixing plant blends the ingredients into a uniform slurry, batch after batch." },
            { step: "Casting & Expansion", text: "The slurry fills moulds where the aluminium reaction creates the aerated structure that gives AAC its light weight." },
            { step: "Wire Cutting", text: "The hardened cake is cut with multi-wire technology to precise dimensions within a tight tolerance." },
            { step: "Autoclaving", text: "High-pressure steam curing develops the strength and durability that define autoclaved aerated concrete." },
            { step: "Quality Testing & Dispatch", text: "Strength, density and dimensions are verified before blocks are packed and dispatched." },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
              <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-2">{item.step}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          Walk through the plant in our{" "}
          <Link href="/gallery?category=machinery" className="text-primary font-semibold hover:underline">machinery gallery</Link>.
        </p>
      </SeoSection>
      <SeoSection
        id="quality"
        eyebrow="Quality Control"
        title="Quality Control & Standards at Our Malda Factory"
        subtitle="Consistent, documented quality is the backbone of every KLAVETEK block."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
            <p>
              Our manufacturing conforms to IS 2185 (Part 3) standards for AAC blocks. Quality checks run throughout production — from testing incoming raw materials to verifying the physical properties of finished blocks before dispatch.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {["Density", "Compressive strength", "Dimensional tolerance", "Water absorption", "Drying shrinkage", "Surface & edge finish"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[var(--body-text)] dark:text-[var(--muted-text)]">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
            <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-3">Standards & Certifications</h3>
            <ul className="space-y-3 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Manufacturing conforms to IS 2185 (Part 3) for AAC blocks
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Member of the Indian Green Building Council (IGBC)
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                BIS-compliant density, strength and dimensional tolerances
              </li>
            </ul>
          </div>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="Why KLAVETEK"
        title="Why Choose KLAVETEK as Your AAC Block Manufacturer"
        subtitle="Manufacturers are judged on consistency, delivery and support — here is what working with a Malda-based factory means."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Local Manufacturing in Malda", text: "Blocks are made in Malda, which means shorter freight, easier coordination and direct access to the factory team." },
            { title: "Five Block Thicknesses", text: "A complete range from 100mm to 250mm so you can match wall design to structural and insulation needs." },
            { title: "Quality-First Process", text: "IS 2185 (Part 3)-aligned production with checks at every stage, from raw material to dispatch." },
            { title: "Project Experience", text: "Blocks supplied for hospitals, commercial complexes, schools and industrial projects across Eastern India." },
            { title: "Technical Support", text: "Guidance on block selection, laying and finishing from the team behind the product." },
            { title: "Reliable Supply", text: "Factory-direct supply with planned dispatch and delivery coordination for construction schedules." },
          ].map((item) => (
            <li key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
              <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">{item.text}</p>
            </li>
          ))}
        </ul>
      </SeoSection>
      <SeoSection
        eyebrow="Product Range"
        title="AAC Block Sizes We Manufacture"
        subtitle="Each thickness is engineered for a different wall application — explore the dedicated product pages for full details."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {productsPage.products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6 text-center hover:border-primary/50 transition-colors duration-300"
            >
              <p className="text-2xl font-bold text-[var(--heading)] dark:text-white">{product.size}</p>
              <p className="mt-1 text-xs text-[var(--muted-text)] dark:text-[var(--muted-text)]">{product.tagline}</p>
            </Link>
          ))}
        </div>
      </SeoSection>

      <SeoFaq
        title="AAC Block Manufacturer in Malda — FAQs"
        subtitle="Answers for builders and contractors sourcing blocks from a manufacturer."
        items={[
          {
            question: "Where is your AAC block manufacturing facility?",
            answer:
              "Our factory is in Malda, West Bengal, at " + company.address + ". Blocks are manufactured, quality-checked and dispatched from this facility.",
          },
          {
            question: "Do you supply bulk orders for large construction projects?",
            answer:
              "Yes. We reg ly supply truckload quantities to builders and contractors. Share your project size and block requirements to plan supply and dispatch.",
          },
          {
            question: "Do you provide technical support during construction?",
            answer:
              "Our team helps with block selection, laying techniques and finishing guidance so your site team gets the best results from AAC blocks.",
          },
          {
            question: "Can I book a factory visit before placing an order?",
            answer:
              "Yes — factory visits can be arranged. It is a good way to see the manufacturing and quality process before committing to supply.",
          },
          {
            question: "Which areas do you supply to?",
            answer:
              "We supply across Malda district, parts of West Bengal and North Bengal, and have delivered blocks to projects across more than four states in Eastern India.",
          },
          {
            question: "Do you also supply tiles or other products?",
            answer:
              "KLAVETEK's name includes our tile range — contact the team to ask about current product availability alongside AAC blocks.",
          },
        ]}
      />

      <SeoRelatedLinks
        title="Explore More AAC Block Guides"
        links={[
          { label: "AAC Blocks", href: "/aac-blocks", description: "What AAC blocks are, their advantages, sizes and specifications." },
          { label: "AAC Blocks in Malda", href: "/aac-blocks-in-malda", description: "Buy locally manufactured AAC blocks delivered across Malda district." },
          { label: "Lightweight Blocks", href: "/lightweight-blocks", description: "How lightweight AAC blocks change the economics of a wall." },
          { label: "AAC Block Price in Malda", href: "/aac-blocks-price-malda", description: "What affects AAC block pricing and how to get a tailored quote." },
          { label: "About KLAVETEK", href: "/about", description: "Our story, team, certifications and manufacturing philosophy." },
          { label: "Contact the Factory", href: "/contact", description: "Request pricing, samples and factory visits." },
        ]}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-hover px-8 py-12 md:px-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Supply Your Project from the Malda Factory
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
              Talk to the KLAVETEK team about block supply for your construction project.
            </p>
            <Link
              href="/contact?product=AAC%20Blocks"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-primary shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
