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

export const metadata: Metadata = {
  title: "Lightweight Blocks | KLAVETEK — Lightweight AAC Blocks in Malda, West Bengal",
  description:
    "Lightweight AAC blocks from KLAVETEK, Malda — about one-third of the weight of clay bricks with a density of 550–650 kg/m³. Learn how lightweight blocks cut structural load, speed up construction and improve insulation.",
  keywords: [
    "lightweight blocks in Malda",
    "lightweight concrete blocks in Malda",
    "lightweight AAC blocks",
    "lightweight construction blocks",
    "AAC blocks weight",
    "lightweight blocks manufacturer",
  ],
  alternates: { canonical: "/lightweight-blocks" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in/lightweight-blocks",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "Lightweight Blocks | KLAVETEK",
    description:
      "Lightweight AAC blocks manufactured in Malda, West Bengal — lighter walls, faster construction, better insulation.",
    images: [{ url: "/images/features/Lightweight.webp", width: 1200, height: 630, alt: "Lightweight AAC blocks from KLAVETEK, Malda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lightweight Blocks | KLAVETEK",
    description: "Lightweight AAC blocks from KLAVETEK, Malda, West Bengal.",
    images:["/images/features/Lightweight.webp"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Klavetek Lightweight AAC Blocks",
  description:
    "Lightweight autoclaved aerated concrete blocks with a density of 550–650 kg/m³, manufactured by KLAVETEK in Malda, West Bengal.",
  brand: { "@type": "Brand", name: "KLAVETEK" },
  manufacturer: { "@type": "Organization", name: company.name },
  category: "Building Materials",
  image: "https://kgbt.in/images/features/Lightweight.webp",
};

export default function LightweightBlocksPage() {
  return (
    <>
      <SeoBreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Lightweight Blocks" },
        ]}
      />
      <Script
        id="lightweight-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <InternalHero
        title="Lightweight Blocks"
        subtitle="Lightweight AAC blocks that cut structural load, speed up construction and keep buildings comfortable — manufactured by KLAVETEK in Malda, West Bengal."
        backgroundImage="/images/features/Lightweight.webp"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Lightweight Blocks" }]}
      />
      <SeoSection
        eyebrow="What Are Lightweight Blocks?"
        title="Lightweight Blocks, Explained"
        subtitle="Lightweight blocks are precast wall units with a much lower density than traditional clay bricks — and AAC is the most widely used example."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
            <p>
              AAC blocks get their light weight from millions of microscopic air pockets created during manufacturing. With a density of roughly 550–650 kg/m³, they weigh about one-third of a typical clay brick wall — yet they still deliver the compressive strength needed for modern wall construction.
            </p>
            <p>
              That combination — light enough to handle easily, strong enough to build with — is exactly why builders use lightweight blocks for everything from apartment partitions to industrial external walls.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-[var(--border)] shadow-lg">
            <Image
              src="/images/products/product-200.webp"
              alt="Klavetek lightweight 200mm AAC block"
              width={1200}
              height={900}
              className="object-cover w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="Structural Benefits"
        title="How Lightweight Blocks Help the Structure"
        subtitle="A lighter wall does real work for the building — here is where it matters most."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Reduced Dead Load", text: "Lighter walls lower the load on beams, columns and foundations, which can reduce steel and concrete requirements." },
            { title: "Easier Handling", text: "One block is far lighter than the equivalent wall area of bricks, so crews lift and place it with less effort." },
            { title: "Faster Construction", text: "Large-format blocks cover more wall area per unit and lay quickly with thin mortar beds." },
            { title: "Less Site Equipment", text: "Lightweight material means less reliance on heavy lifting equipment for block placement." },
          ].map((item) => (
            <li key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
              <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">{item.text}</p>
            </li>
          ))}
        </ul>
      </SeoSection>

      <SeoSection
        eyebrow="Performance"
        title="Performance Benefits of Lightweight AAC Blocks"
        subtitle="The same air-pocket structure that makes AAC light also makes it comfortable to live and work in."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: "Thermal Insulation", text: "Aerated structure delivers strong thermal insulation (low thermal conductivity), keeping interiors cooler and lowering air-conditioning loads." },
            { title: "Fire Resistance", text: "AAC is made from incombustible mineral materials, giving walls multi-hour fire resistance." },
            { title: "Sound Insulation", text: "The dense, airy matrix absorbs and blocks sound, making lightweight AAC walls effective noise barriers." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
              <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          Full measured values — thermal conductivity, fire rating, sound reduction and more — are listed in the{" "}
          <Link href="/products" className="text-primary font-semibold hover:underline">technical specifications</Link>.
        </p>
      </SeoSection>
      <SeoSection
        eyebrow="Lightweight vs. Clay Bricks"
        title="Lightweight Blocks vs Traditional Clay Bricks"
        subtitle="A quick, honest look at where lightweight AAC blocks win — and where bricks still have their place."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-primary/10 text-[var(--heading)] dark:text-white">
              <tr>
                <th className="p-4 font-semibold">Factor</th>
                <th className="p-4 font-semibold">Lightweight AAC Blocks</th>
                <th className="p-4 font-semibold">Traditional Clay Bricks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--body-text)] dark:text-[var(--muted-text)]">
              {[
                { factor: "Weight", aac: "A single block weighs roughly 8.5–20.5 kg depending on thickness (about one-third of the weight of an equivalent brick wall).", brick: "Bricks are nearly twice the weight of AAC per wall area, making them heavier to transport and handle." },
                { factor: "Wall Coverage", aac: "Large-format blocks (600 × 200mm) cover more area per unit with fewer joints.", brick: "Many small units are needed per square metre, with more mortar joints." },
                { factor: "Insulation", aac: "Built-in thermal and acoustic insulation from the aerated structure.", brick: "Insulation depends on wall thickness and added treatments." },
                { factor: "Finish", aac: "Precision dimensions mean thinner plaster and less finishing work.", brick: "More mortar and plaster are typically needed for a smooth finish." },
                { factor: "Sustainability", aac: "Uses fly ash (a power-plant by-product), saving top soil and reducing waste.", brick: "Clay brick production consumes top soil and significant fuel." },
              ].map((row) => (
                <tr key={row.factor} className="bg-[var(--surface)] dark:bg-[var(--surface)]/40">
                  <td className="p-4 font-semibold text-[var(--heading)] dark:text-white">{row.factor}</td>
                  <td className="p-4">{row.aac}</td>
                  <td className="p-4">{row.brick}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          Clay bricks can still suit certain small-scale or traditional construction styles — the right choice depends on your project. For most residential and commercial work, lightweight AAC blocks deliver better overall wall economics.
        </p>
      </SeoSection>

      <SeoSection
        eyebrow="Sizes"
        title="Lightweight Block Sizes Available"
        subtitle="KLAVETEK manufactures lightweight AAC blocks in five thicknesses — choose the right one for your wall."
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
        title="Lightweight Blocks — FAQs"
        subtitle="Common questions about building with lightweight AAC blocks."
        items={[
          {
            question: "Are lightweight AAC blocks strong enough for construction?",
            answer:
              "Yes, for the wall applications they are designed for. KLAVETEK AAC blocks deliver compressive strength in the range of about 4–5 N/mm², suited to load-bearing and non-load-bearing walls across residential, commercial and institutional buildings. Always confirm structural design with a qualified engineer.",
          },
          {
            question: "How much lighter is an AAC block than a clay brick?",
            answer:
              "AAC blocks weigh roughly one-third of an equivalent clay brick wall, with a density of about 550–650 kg/m³ compared to traditional brickswhich are significantly denser.",
          },
          {
            question: "Can lightweight blocks be used for external walls?",
            answer:
              "Yes. Thicker AAC blocks (such as 150mm, 200mm and 250mm) are commonly used for external walls, with the thickness choice based on structural, insulation and fire-resistance requirements.",
          },
          {
            question: "Do lightweight AAC blocks reduce cooling costs?",
            answer:
              "The aerated structure gives AAC excellent thermal insulation, helping interiors stay cooler and reducing the load on air-conditioning in warm climates like Malda.",
          },
          {
            question: "Are lightweight blocks easier to cut on site?",
            answer:
              "Yes. AAC blocks can be accurately cut, chased and shaped with ordinary hand tools, which simplifies plumbing and electrical chases during construction.",
          },
          {
            question: "Where can I buy lightweight blocks in Malda?",
            answer:
              "KLAVETEK manufactures lightweight AAC blocks in Malda, West Bengal. Contact our team at " + company.phone + " or via the contact page for availability, pricing and delivery.",
          },
        ]}
      />

      <SeoRelatedLinks
        title="Explore More AAC Block Guides"
        links={[
          { label: "AAC Blocks", href: "/aac-blocks", description: "What AAC blocks are, their advantages, sizes and specifications." },
          { label: "AAC Blocks in Malda", href: "/aac-blocks-in-malda", description: "Buy locally manufactured AAC blocks delivered across Malda district." },
          { label: "AAC Block Manufacturer in Malda", href: "/aac-block-manufacturer-malda", description: "Inside KLAVETEK's Malda factory and quality process." },
          { label: "AAC Block Price in Malda", href: "/aac-blocks-price-malda", description: "What affects AAC block pricing and how to get a tailored quote." },
          { label: "Products & Specifications", href: "/products", description: "Detailed specifications for every lightweight block thickness." },
          { label: "Contact KLAVETEK", href: "/contact", description: "Get availability, pricing and delivery details for your site." },
        ]}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-hover px-8 py-12 md:px-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Build Lighter with KLAVETEK
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
              Get lightweight AAC block pricing and availability for your project.
            </p>
            <Link
              href="/contact?product=Lightweight%20AAC%20Blocks"
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
