import type { Metadata } from "next";
import Link from "next/link";
import InternalHero from "@/components/shared/InternalHero";
import SeoSection from "@/components/seo/SeoSection";
import SeoFaq from "@/components/seo/SeoFaq";
import SeoRelatedLinks from "@/components/seo/SeoRelatedLinks";
import SeoBreadcrumbSchema from "@/components/seo/SeoBreadcrumbSchema";
import { company } from "@/constants/company";
import { directionsUrl } from "@/constants/seo";

export const metadata: Metadata = {
  title: "AAC Blocks in Malda | KLAVETEK — AAC Block Manufacturer in Malda, West Bengal",
  description:
    "Buy AAC blocks in Malda, West Bengal, directly from the KLAVETEK factory. Locally manufactured autoclaved aerated concrete blocks with factory pickup, delivery across Malda district, and supply to surrounding areas of West Bengal and North Bengal.",
  keywords: [
    "AAC blocks in Malda",
    "AAC block supplier in Malda",
    "AAC block factory in Malda",
    "buy AAC blocks Malda",
    "lightweight blocks in Malda",
    "construction blocks in Malda",
    "AAC blocks near Malda",
  ],
  alternates: { canonical: "/aac-blocks-in-malda" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kgbt.in/aac-blocks-in-malda",
    siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
    title: "AAC Blocks in Malda | KLAVETEK",
    description:
      "KLAVETEK manufactures AAC blocks in Malda, West Bengal. Locally supplied blocks for construction sites across Malda district and nearby areas.",
    images: [{ url: "/images/products/products-hero.webp", width: 1200, height: 630, alt: "AAC blocks manufactured in Malda, West Bengal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AAC Blocks in Malda | KLAVETEK",
    description: "Locally manufactured AAC blocks from the KLAVETEK factory in Malda, West Bengal.",
    images:["/images/products/products-hero.webp"],
  },
};

export default function AacBlocksInMaldaPage() {
  return (
    <>
      <SeoBreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "AAC Blocks in Malda" },
        ]}
      />
      <InternalHero
        title="AAC Blocks in Malda"
        subtitle="Locally manufactured AAC blocks from KLAVETEK's factory in Malda, West Bengal — available for pickup and delivery across Malda district and nearby regions."
        backgroundImage="/images/products/products-hero.webp"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "AAC Blocks in Malda" }]}
      />
      <SeoSection
        eyebrow="Local Supply"
        title="AAC Blocks Available in Malda — Direct from the Factory"
        subtitle="KLAVETEK manufactures autoclaved aerated concrete blocks at our facility in Malda, West Bengal — so buyers get fresh stock with no middlemen and shorter freight distances."
      >
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
              <p>
                Our manufacturing facility is located at <strong className="text-[var(--heading)] dark:text-white">{company.address}</strong>. Because the blocks are produced locally, buyers in Malda districtcan arrange direct factory pickup or scheduled delivery to their site.
              </p>
              <p>
                Local production also means faster replenishment for ongoing projects, easier coordination for samples and site visits, and direct access to the technical team behind the product.
              </p>
              <p>
                Get current availabilitypricing and delivery terms — call us at{" "}
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="text-primary font-semibold hover:underline">{company.phone}</a>{" "}
                or request a quote through the{" "}
                <Link href="/contact" className="text-primary font-semibold hover:underline">contact page</Link>.
              </p>
            </div>
            <div className="space-y-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90240.68654007485!2d88.1876632!3d25.011885599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb03b7832414cf%3A0x48557a1c564874fd!2sKLAVETEK%20GREEN%20BLOCKS%20%26%20TILES%20PVT.%20LTD!5e1!3m2!1sen!2sin!4v1786015735258!5m2!1sen!2sin"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                title="KLAVETEK AAC block factory location in Malda, West Bengal"
              />
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors duration-300"
              >
                Get Directions to the Factory
              </a>
            </div>
          </div>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="Why Buy Local?"
        title="Why Choose Locally Manufactured AAC Blocks"
        subtitle="The factory is in your district — that changes what buying blocks feels like."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Lower Transport Cost", text: "Shorter freight distances mean less delivery cost on every truckload compared to blocks hauled from faraway plants." },
            { title: "Faster Delivery", text: "Fresh production plus nearby logistics means blocks reach your site faster, keeping your schedule on track." },
            { title: "Easier Coordination", text: "A local team makes it simple to arrange samples, discuss specifications and schedule site visits." },
            { title: "Consistent Fresh Stock", text: "Producing locally lets us replenish stock quickly for projects that need blocks in volume." },
            { title: "On-the-Ground Support", text: "Technical guidance from the team behind manufacturing, available for your site team." },
            { title: "Direct Pricing", text: "Buying from the factory removes intermediaries, giving you a clearer view of the cost of your blocks." },
          ].map((item) => (
            <li key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
              <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">{item.text}</p>
            </li>
          ))}
        </ul>
      </SeoSection>
      <SeoSection
        eyebrow="Areas We Serve"
        title="AAC Block Supply Across Malda & Nearby Regions"
        subtitle="As a manufacturing unit based in Malda, KLAVETEK regularly supplies blocks to construction sites across the district and into neighbouring areas of West Bengal and North Bengal."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
            <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-3">Across Malda District</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[var(--muted-text)] dark:text-[var(--muted-text)]">
              {["Malda (English Bazar)", "Old Malda", "Chanchal", "Ratua", "Manikchak", "Harishchandrapur", "Kaliachak", "Gazole"].map((place) => (
                <li key={place} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {place}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-6">
            <h3 className="text-base font-bold text-[var(--heading)] dark:text-white mb-3">Neighbouring Areas</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[var(--muted-text)] dark:text-[var(--muted-text)]">
              {["Uttar Dinajpur", "Dakshin Dinajpur", "Murshidabad", "Raiganj", "Balurghat", "Kishanganj", "Jangipur", "Parts of North Bengal"].map((place) => (
                <li key={place} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {place}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          Availability and freight terms depend on your location and order size — contact the team to confirm delivery to your site.
        </p>
      </SeoSection>

      <SeoSection
        eyebrow="Local Projects"
        title="KLAVETEK AAC Blocks at Work in Malda"
        subtitle="Several healthcare and commercial projects in and around Malda have been built with KLAVETEK AAC blocks."
        className="bg-[var(--secondary-bg)] dark:bg-[var(--background)]"
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { label: "DRL Multispeciality Hospital", href: "/projects/hospitals/drl-hospital" },
            { label: "Eden Nursing Home", href: "/projects/hospitals/eden-nursing-home" },
            { label: "Square Nursing Home", href: "/projects/hospitals/square-nursing-home-malda" },
            { label: "PRM Centrepoint Malda", href: "/projects/commercial-buildings/prm-centrepoint-malda" },
            { label: "PRM Prestige Malda", href: "/projects/commercial-buildings/prm-prestige-malda" },
          ].map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--surface)]/40 p-5 text-sm font-semibold text-[var(--heading)] dark:text-white hover:border-primary/50 hover:text-primary transition-colors duration-300">
                {p.label}
                <svg className="h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
          Browse the full{" "}
          <Link href="/projects" className="text-primary font-semibold hover:underline">project portfolio</Link> to see more structures built with KLAVETEK blocks.
        </p>
      </SeoSection>
      <SeoSection
        eyebrow="Delivery"
        title="Delivery & Logistics from the Malda Factory"
        subtitle="Blocks leave our factory packed and ready for construction sites across West Bengal, North Bengal and beyond."
      >
        <div className="space-y-4 max-w-3xl text-base leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]">
          <p>
            We arrange transport for both truckload and partial-truckload orders, with packing designed to keep the precision-cut edges of the blocks clean during transit. Delivery planning starts with your site location, block sizes and required quantity — the sales team will confirm the schedule and freight terms when you request a quote.
          </p>
          <p>
            For buyers picking up directly from the factory, our team helps with loading coordination at our Malda facility.
          </p>
        </div>
      </SeoSection>

      <SeoFaq
        title="AAC Blocks in Malda — FAQs"
        subtitle="Practical answers for buyers in and around Malda."
        items={[
          {
            question: "Where is the KLAVETEK AAC block factory located?",
            answer:
              "Our factory is in Malda, West Bengal, at " + company.address + ". You can use the Get Directions link on this page to find us.",
          },
          {
            question: "Can I buy AAC blocks directly from the Malda factory?",
            answer:
              "Yes. We supply directly to builders, contractors and individual buyers. Call " + company.phone + " or use the contact page to check current availability and arrange pickup or delivery.",
          },
          {
            question: "Do you deliver AAC blocks to sites outside Malda district?",
            answer:
              "We regularly deliver to nearby areas of West Bengal and North Bengal, including Dinajpur, Murshidabad and surrounding regions. Confirm logistics for your location when you request a quote.",
          },
          {
            question: "How soon can AAC blocks be delivered to a site in Malda?",
            answer:
              "Delivery time depends on your block sizes, quantity and site location. Because we manufacture locally, Malda-area deliveries are typically quick to arrange — speak to the team for a schedule tailored to your project.",
          },
          {
            question: "What AAC block sizes are available from the Malda factory?",
            answer:
              "We manufacture AAC blocks in five thicknesses: 100mm, 125mm, 150mm, 200mm and 250mm, each 600mm long and 200mm high. See the products page for full specifications.",
          },
          {
            question: "Can I visit the factory before ordering?",
            answer:
              "Site visits can be arranged — contact the team to schedule a factory visit and see the manufacturing and quality processes firsthand.",
          },
        ]}
      />

      <SeoRelatedLinks
        title="Explore More AAC Block Guides"
        links={[
          { label: "AAC Blocks", href: "/aac-blocks", description: "What AAC blocks are, their advantages, sizes and specifications." },
          { label: "AAC Block Manufacturer in Malda", href: "/aac-block-manufacturer-malda", description: "Inside KLAVETEK's Malda manufacturing facility and quality process." },
          { label: "Lightweight Blocks", href: "/lightweight-blocks", description: "How lightweight AAC blocks change the economics of a wall." },
          { label: "AAC Block Price in Malda", href: "/aac-blocks-price-malda", description: "What affects AAC block pricing and how to get a tailored quote." },
          { label: "Products & Specifications", href: "/products", description: "Detailed specifications for every AAC block thickness." },
          { label: "Contact KLAVETEK", href: "/contact", description: "Get availability, pricing and delivery details for your site." },
        ]}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-hover px-8 py-12 md:px-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Need AAC Blocks Delivered in Malda?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
              Check availability and get a delivery quote for your Malda or North Bengal site.
            </p>
            <Link
              href="/contact?product=AAC%20Blocks%20in%20Malda"
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
