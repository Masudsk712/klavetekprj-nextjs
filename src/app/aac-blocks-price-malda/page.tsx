import type { Metadata } from "next";
import Link from "next/link";
import InternalHero from "@/components/shared/InternalHero";
import SeoSection from "@/components/seo/SeoSection";
import SeoFaq from "@/components/seo/SeoFaq";
import SeoRelatedLinks from "@/components/seo/SeoRelatedLinks";
import SeoBreadcrumbSchema from "@/components/seo/SeoBreadcrumbSchema";
import { company } from "@/constants/company";

export const metadata: Metadata = {
  title: "AAC Block Price in Malda | KLAVETEK — AAC Block Cost Guide",
  description:
    "Understand what drives AAC block prices in Malda, West Bengal — thickness, quantity, delivery, taxes and current material rates. Get an accurate, tailored quote for your project from KLAVETEK.",
  keywords: [
    "AAC block price in Malda",
    "AAC block price",
    "AAC block cost Malda",
    "cheapest AAC blocks in Malda",
    "AAC blocks rate in Malda",
    "AAC block price West Bengal",
  ],
  alternates: { canonical: "/aac-blocks-price-malda" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in/aac-blocks-price-malda",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "AAC Block Price in Malda | KLAVETEK",
    description:
      "A practical guide to AAC block pricing in Malda, West Bengal, and what goes into an accurate quote from KLAVETEK.",
    images: [{ url: "/images/products/products-hero.webp", width: 1200, height: 630, alt: "AAC block price guide — KLAVETEK, Malda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AAC Block Price in Malda | KLAVETEK",
    description: "What affects AAC block pricing in Malda and how to get an accurate quote.",
    images:["/images/products/products-hero.webp"],
  },
};

export default function AacBlocksPriceMaldaPage() {
  return (
    <>
      <SeoBreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "AAC Block Price in Malda" },
        ]}
      />
      <InternalHero
        title="AAC Block Price in Malda"
        subtitle="A practical, honest guide to what affects AAC block prices in Malda, West Bengal — and how to get an accurate quote for your project."
        backgroundImage="/images/products/products-hero.webp"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "AAC Block Price in Malda" }]}
      />
      <SeoSection
        eyebrow="AAC Price Basics"
        title="AAC Block Prices Vary — Here Is Why"
        subtitle="AAC blocks are competitively priced, but there is no single fixed rate — the right question is not just “what is the price” but “what is the price for MY project”."
      >
        <div className="space-y-4 max-w-3xl text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
          <p>
            Being a factory-based manufacturer in Malda, West Bengal, KLAVETEK can offer direct, transparent pricing with no intermediaries. The final price for your supply depends on your block sizes, quantity, delivery location and prevailing material rates at the time of ordering.
          </p>
          <p>
            This page explains the main price drivers, so you can plan your budget and request a quote that gives you an accurate, workable figure for your site.
          </p>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="What Drives the Price"
        title="Factors That Affect AAC Block Price in Malda"
        subtitle="Five things shape almost every AAC block quote we prepare."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            { title: "Block Thickness", text: "100mm blocks cost less per unit than 250mm blocks — thicker blocks use more material and deliver greater strength and insulation." },
            { title: "Quantity", text: "Larger volumes typically qualify for better per-block rates and more efficient transport planning." },
            { title: "Delivery Distance", text: "Freight depends on how far the blocks travel from our Malda factory to your site." },
            { title: "Taxes & Material Rates", text: "Current input costs and applicable taxes (such as GST) affect the final invoiced price." },
            { title: "Packing & Handling", text: "Careful packing keeps precision edges clean during transit and is part of the delivery plan." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
              <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">{item.text}</p>
            </div>
          ))}
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="Total Wall Cost"
        title="AAC Blocks vs Clay Bricks: Think Total Wall Cost, Not Just Block Price"
        subtitle="AAC blocks can carry a different per-unit price to bricks, but the wall you get is what matters to your budget."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
            <p>
              Because AAC blocks are larger and more precise than clay bricks, a laid AAC wall typically uses less mortar and less plaster, fewer labour hours and can go up faster. These site savings mean the total installed wall cost differs from a simple per-block comparison.
            </p>
            <p>
              Depending on project specifics, builders often find the overall construction cost with AAC blocks is lower once mortar, plaster, labour and time savings are added up — which is why AAC walls have become the default choice for modern residential and commercial projects.
            </p>
            <p>
              For a like-for-like estimate on your project, share your wall areas and thickness preferences — our team will quote you on a total-supply basis.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
            <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-3">Typical AAC Savings Applied to a Wall</h3>
            <ul className="space-y-3 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
              {["Less mortar than brick walls due to larger blocks and thinner beds", "Reduced plaster requirements thanks to precise, smooth block faces", "Lower labour hours per square metre of wall", "Faster construction reduces site overheads and financing costs", "Better insulation cuts long-term energy costs of the building"].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="Requesting a Quote"
        title="How to Get an Accurate AAC Block Price for Malda"
        subtitle="With a few details, our team can give you a real, usable quotation for your site."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            "List the block thicknesses you need (100mm to 250mm).",
            "Estimate your total block quantity or wall areas.",
            "Share your delivery address in or around Malda.",
            "Ask for a total-supply quote including transport.",
          ].map((step, index) => (
            <li key={step} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
              <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">{index + 1}</span>
              <p className="text-sm leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          Call us at{" "}
          <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="text-primary font-semibold hover:underline">{company.phone}</a>{" "}
          for current rates, or submit a request through the{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">contact page</Link>.
        </p>
      </SeoSection>

      <SeoFaq
        title="AAC Block Price in Malda — FAQs"
        subtitle="Honest answers about AAC block pricing and quoting."
        items={[
          {
            question: "What is the price of an AAC block in Malda?",
            answer:
              "AAC block prices depend on thickness, quantity, delivery distance, and prevailing material and tax rates at the time of ordering. Contact KLAVETEK at " + company.phone + " for a current, tailored quote for your project.",
          },
          {
            question: "Are AAC blocks cheaper than clay bricks?",
            answer:
              "The per-block price of AAC can differ from a clay brick, but AAC blocks are much larger, so fewer are needed per square metre. Accounting for reduced mortar, plaster, labour and time, the total installed wall cost is often lower with AAC.",
          },
          {
            question: "Do you offer wholesale or bulk pricing?",
            answer:
              "Yes. Larger orders typically qualify for better per-block rates and more efficient delivery planning. Share your quantity for a bulk quotation.",
          },
          {
            question: "Does the quoted price include delivery?",
            answer:
              "Quotes can be prepared on a supply-only or total-supply basis including transport. Tell us your delivery location in or around Malda and we will include freight in the quotation.",
          },
          {
            question: "Why do AAC block prices change over time?",
            answer:
              "AAC prices move with input material costs, energy and statutory taxes. That is why a live quote from the factory reflects current rates better than any published static price.",
          },
          {
            question: "Can I get a written price list?",
            answer:
              "We prepare itemised quotations for your specific requirement. Request a quote and our team will share a detailed, written price schedule for your block sizes and delivery terms.",
          },
        ]}
      />

      <SeoRelatedLinks
        title="Explore More AAC Block Guides"
        links={[
          { label: "AAC Blocks", href: "/aac-blocks", description: "What AAC blocks are, their advantages, sizes and specifications." },
          { label: "AAC Blocks in Malda", href: "/aac-blocks-in-malda", description: "Buy locally manufactured AAC blocks delivered across Malda district." },
          { label: "AAC Block Manufacturer in Malda", href: "/aac-block-manufacturer-malda", description: "Inside KLAVETEK's Malda factory and quality process." },
          { label: "Lightweight Blocks", href: "/lightweight-blocks", description: "How lightweight AAC blocks change the economics of a wall." },
          { label: "Products & Specifications", href: "/products", description: "Detailed specifications and dimensions for every block thickness." },
          { label: "Contact KLAVETEK", href: "/contact", description: "Request an accurate AAC block price for your project." },
        ]}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-hover px-8 py-12 md:px-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Get a Current AAC Block Price for Malda
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
              Request an accurate, tailored quote from the KLAVETEK factory today.
            </p>
            <Link
              href="/contact?product=AAC%20Block%20Price%20Enquiry"
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
