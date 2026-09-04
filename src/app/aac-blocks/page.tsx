import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import InternalHero from "@/components/shared/InternalHero";
import SeoSection from "@/components/seo/SeoSection";
import SeoFaq from "@/components/seo/SeoFaq";
import SeoRelatedLinks from "@/components/seo/SeoRelatedLinks";
import SeoBreadcrumbSchema from "@/components/seo/SeoBreadcrumbSchema";
import { company } from "@/constants/company";
import { productsPage } from "@/data/products";
import { advantages } from "@/data/advantages";

export const metadata: Metadata = {
  title: "AAC Blocks | KLAVETEK — AAC Block Manufacturer in Malda, West Bengal",
  description:
    "Learn about AAC blocks — what autoclaved aerated concrete is, its advantages for modern construction, available sizes (100mm–250mm), specifications, applications, manufacturing and quality testing. Manufactured by KLAVETEK in Malda, West Bengal.",
  keywords: [
    "AAC blocks",
    "what are AAC blocks",
    "AAC block advantages",
    "AAC block sizes and specifications",
    "AAC blocks in Malda",
    "AAC block manufacturer in Malda",
    "lightweight construction blocks",
  ],
  alternates: { canonical: "/aac-blocks" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in/aac-blocks",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "AAC Blocks | KLAVETEK — AAC Block Manufacturer in Malda, West Bengal",
    description:
      "A complete guide to AAC blocks: advantages, sizes, specifications, applications and quality standards. Manufactured in Malda, West Bengal by KLAVETEK.",
    images: [{ url: "/images/products/products-hero.webp", width: 1200, height: 630, alt: "Klavetek AAC blocks manufactured in Malda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AAC Blocks | KLAVETEK",
    description: "A complete guide to AAC blocks from KLAVETEK, Malda, West Bengal.",
    images:["/images/products/products-hero.webp"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Klavetek AAC Blocks",
  description:
    "Autoclaved aerated concrete (AAC) blocks manufactured by KLAVETEK in Malda, West Bengal, available in 100mm, 125mm, 150mm, 200mm and 250mm thicknesses.",
  brand: { "@type": "Brand", name: "KLAVETEK" },
  manufacturer: { "@type": "Organization", name: company.name },
  category: "Building Materials",
  image: [
    "https://kgbt.in/images/products/product-100.webp",
    "https://kgbt.in/images/products/product-150.webp",
    "https://kgbt.in/images/products/product-250.webp",
  ],
};

export default function AacBlocksPage() {
  return (
    <>
      <SeoBreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "AAC Blocks" },
        ]}
      />
      <Script
        id="aac-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <InternalHero
        title="AAC Blocks"
        subtitle="Autoclaved aerated concrete blocks for modern, sustainable construction — manufactured in Malda, West Bengalby KLAVETEK."
        backgroundImage="/images/products/products-hero.webp"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "AAC Blocks" }]}
      />
      <SeoSection
        eyebrow="What Are AAC Blocks?"
        title="Autoclaved Aerated Concrete, Explained"
        subtitle="AAC is a lightweight, precast building material that combines structural strength with thermal insulation — and that is precisely why it has become the wall material of choice for modern construction."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
            <p>
              AAC blocks are made from a precise mix of fly ash, cement, lime, gypsum and a tiny quantity of aluminium powder. When the mix reacts, the aluminium powder releases hydrogen gas, creating millions of microscopic air pockets that make the material light and thermally efficient.
            </p>
            <p>
              The mixture is poured into large moulds, allowed to rise, cut into precise block sizes with wire, and then cured theat high pressure in an autoclave. The result is a strong, dimensionally accurate, fire-resistant block that weighs a fraction of a traditional clay brick wall.
            </p>
            <p>
              At KLAVETEK, our facility in Malda, West Bengal produces AAC blocks in five thicknesses — 100mm, 125mm, 150mm, 200mm and, 250mm —— engineered for internal partitions through to industrial external walls.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-[var(--border)] shadow-lg">
            <Image
              src="/images/products/product-150.webp"
              alt="Klavetek 150mm AAC block — lightweight autoclaved aerated concrete block"
              width={1200}
              height={900}
              className="object-cover w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="Why AAC Blocks?"
        title="Key Advantages of AAC Blocks"
        subtitle="The same properties that make AAC blocks efficient to manufacture also make them efficient to build with — on every project type."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((advantage) => (
            <div
              key={advantage.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6 transition-colors duration-300 hover:border-primary/50"
            >
              <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-2">
                {advantage.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">
                {advantage.shortSummary}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          Each thickness is engineered for a different role — compare the full range on the{" "}
          <Link href="/products" className="text-primary font-semibold hover:underline">
            products page
          </Link>
          .
        </p>
      </SeoSection>
      <SeoSection
        eyebrow="Sizes & Specifications"
        title="AAC Block Sizes and Specifications"
        subtitle="KLAVETEK manufactures five thicknesses, each 600mm long and 200mm high, with a density of 550–650 kg/m³."
      >
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-primary/10 text-[var(--heading)] dark:text-white">
              <tr>
                <th className="p-4 font-semibold">Thickness</th>
                <th className="p-4 font-semibold">Length × Height</th>
                <th className="p-4 font-semibold">Approx. Weight</th>
                <th className="p-4 font-semibold">Blocks per m²</th>
                <th className="p-4 font-semibold">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--body-text)] dark:text-[var(--muted-text)]">
              {productsPage.products.map((product) => (
                <tr key={product.id} className="bg-[var(--surface)] dark:bg-[var(--surface)]/40">
                  <td className="p-4 font-semibold text-[var(--heading)] dark:text-white">
                    <Link href={`/products/${product.id}`} className="hover:text-primary">
                      {product.size}
                    </Link>
                  </td>
                  <td className="p-4">{product.specs[0]?.value} × {product.specs[1]?.value}</td>
                  <td className="p-4">{product.specs[3]?.value}</td>
                  <td className="p-4">{product.specs[4]?.value}</td>
                  <td className="p-4">{product.tagline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          Full technical data — density, compressive strength, thermal conductivity, fire resistance and more — is listed on the{" "}
          <Link href="/products" className="text-primary font-semibold hover:underline">products page</Link>, and per-size detail pages cover applications for each thickness.
        </p>
      </SeoSection>

      <SeoSection
        eyebrow="Where AAC Is Used"
        title="Common AAC Block Applications"
        subtitle="From low-rise homes to multi-storey hospitals, AAC blocks perform across every major building type."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          {[
            { label: "Residential Homes & Villas", href: "/projects/residential-buildings" },
            { label: "Apartments & Housing Complexes", href: "/projects/residential-buildings" },
            { label: "Offices & Commercial Complexes", href: "/projects/commercial-buildings" },
            { label: "Hospitals & Nursing Homes", href: "/projects/hospitals" },
            { label: "Schools & Educational Institutions", href: "/projects/educational-institutions" },
            { label: "Industrial Buildings & Warehouses", href: "/projects/industrial-projects" },
          ].map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="flex items-start gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-5 hover:border-primary/50 hover:text-primary transition-colors duration-300">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </SeoSection>
      <SeoSection
        eyebrow="How AAC Blocks Are Made"
        title="From Raw Material to Finished AAC Block"
        subtitle="Every KLAVETEK block passes through a controlled, eight-stage manufacturing process in our Malda facility."
      >
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            "Raw Material — premium cement, lime, gypsum and fly ash are selected and lab-tested.",
            "Mixing — computer-controlled batching creates an uniform slurry.",
            "Casting — aluminium powder reaction forms the lightweight cellular structure.",
            "Precision Cutting — multi-wire cutting holds dimensions to within ±1.5mm.",
            "Autoclaving — high-pressure steam curing delivers strength and durability.",
            "Quality Check — strength, density and dimensional accuracy are tested.",
            "Curing — controlled final curing ensures dimensional stability.",
            "Delivery — blocks are packed and dispatched across India.",
          ].map((step, index) => (
            <li key={step} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-5">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          See the process in action on the{" "}
          <Link href="/gallery?category=factory" className="text-primary font-semibold hover:underline">factory gallery</Link>, or read about{" "}
          <Link href="/aac-block-manufacturer-malda" className="text-primary font-semibold hover:underline">manufacturing quality control</Link>.
        </p>
      </SeoSection>

      <SeoSection
        eyebrow="Quality"
        title="Quality Testing & Standards"
        subtitle="Consistent quality is what makes an AAC wall predictable to build with."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <div className="space-y-4 max-w-3xl text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
          <p>
            KLAVETEK's manufacturing conforms to IS 2185 (Part 3) standards for AAC blocks, with every batch checked for density, compressive strength, water absorption, drying shrinkage and dimensional tolerance before dispatch.
          </p>
          <p>
            Tight cutting tolerances (±1.5mm) mean thinner, more even mortar beds, cleaner walls and substantial savings on plaster and finishing. Quality control is carried out at every stage — from incoming raw materials to the finished block — so the blocks you receive are consistent, block after block.
          </p>
          <p>
            Read more about our quality approach on the{" "}
            <Link href="/aac-block-manufacturer-malda/#quality" className="text-primary font-semibold hover:underline">manufacturer page</Link>.
          </p>
        </div>
      </SeoSection>
      <SeoFaq
        title="AAC Blocks — FAQs"
        subtitle="Straight answers about AAC blocks and buying them in Malda."
        items={[
          {
            question: "What are AAC blocks?",
            answer:
              "AAC (Autoclaved Aerated Concrete) blocks are lightweight, precast building materials made from fly ash, cement, lime, gypsum and a small amount of aluminium powder. The aluminium powder creates millions of tiny air pockets, and high-pressure steam curing (autoclaving) gives the blocks their strength, light weight and dimensional accuracy.",
          },
          {
            question: "How are AAC blocks different from clay bricks?",
            answer:
              "AAC blocks are much larger and lighter than clay bricks, require far less mortar and plaster,and provide better thermal insulation, sound insulation and fire resistance. Their precision-moulded dimensions reduce finishing work and speed up construction.",
          },
          {
            question: "What sizes of AAC blocks does KLAVETEK manufacture?",
            answer:
              "KLAVETEK manufactures AAC blocks in five thicknesses: 100mm, 125mm, 150mm, 200mm,and, 250mm, each with a standard length of 600mm and height of 200mm.",
          },
          {
            question: "Are KLAVETEK AAC blocks compliant with Indian standards?",
            answer:
              "Our manufacturing conforms to IS 2185 (Part 3) standards for AAC blocks,with quality control covering density, compressive strength, dimensional tolerance, water absorption and drying shrinkage at every stage of production.",
          },
          {
            question: "Which types of construction can use AAC blocks?",
            answer:
              "AAC blocks are versatile and suitable for residential homes, villas and apartments, commercial offices and retail spaces, hospitals, educational institutions, industrial buildings and warehouses. KLAVETEK has supplied blocks for projects across these categories in and around Malda.",
          },
          {
            question: "Where can I buy AAC blocks in Malda?",
            answer:
              "KLAVETEK manufactures AAC blocks at our facility in Malda, West Bengal. Contact us at " + company.phone + " or via the contact page for availability, prices and delivery to your site.",
          },
        ]}
      />

      <SeoRelatedLinks
        title="Explore More AAC Block Guides"
        links={[
          { label: "AAC Blocks in Malda", href: "/aac-blocks-in-malda", description: "Locally manufactured AAC blocks supplied across Malda district and North Bengal." },
          { label: "AAC Block Manufacturer in Malda", href: "/aac-block-manufacturer-malda", description: "Inside KLAVETEK's manufacturing facility, process and quality control." },
          { label: "Lightweight Blocks", href: "/lightweight-blocks", description: "Why lightweight AAC blocks make construction faster, safer and cheaper." },
          { label: "AAC Block Price in Malda", href: "/aac-blocks-price-malda", description: "What affects AAC block pricing and how to get a tailored quote." },
          { label: "Browse Our Products", href: "/products", description: "Full specifications for every thickness, from 100mm to 250mm." },
          { label: "See Our Projects", href: "/projects", description: "Hospitals, schools, malls and housing built with KLAVETEK AAC blocks." },
        ]}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-hover px-8 py-12 md:px-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Need AAC Blocks for Your Project?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
              Get current availability,pricing and delivery options for your Malda or North Bengal construction site.
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
