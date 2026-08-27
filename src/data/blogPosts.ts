/**
 * =====================================================================
 * Klavetek Blog — Featured Articles & Insights.
 * =====================================================================
 *
 * Each entry maps to a REAL local image under `/images/blog/` that is
 * already present in `public/images/blog`:
 *
 *   - `blog-hero.webp`  → the single FEATURED article (spotlight)
 *   - `klavetek_1.webp` … `klavetek_5.webp` → the individual blog cards
 *
 * Titles and excerpts reflect factual Klavetek / AAC-block subject
 * matter (products the company actually makes and publishes about).
 *
 * There is intentionally NO database / CMS here. `featuredPost` and
 * `blogPosts` are a plain data file consumed by `BlogHighlights` — this
 * keeps content changes to a simple edit of this array, matching the
 * existing `facebookPosts.ts` convention.
 *
 * NOTE: There is no per-article detail route on this site, so each
 * "Read More" links to Klavetek's verified public page to keep things
 * truthful and simple (the same pattern as the existing blog cards).
 * =====================================================================
 */

export const blogPageUrl = "https://www.facebook.com/klavetekaacblocks/";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
};

/** The single featured post — uses `/images/blog/blog-hero.webp`. */
export const featuredPost: BlogPost = {
  id: "featured-aac-advantage",
  title: "AAC Blocks: The Smart Choice for Modern, Sustainable Construction",
  excerpt:
    "Autoclaved aerated concrete (AAC) is transforming how buildings go up — lighter, more precise, better insulated and far gentler on the environment. Discover how Klavetek's autoclaved AAC blocks combine engineered precision with genuine sustainability, from the fly-ash based manufacturing process to faster, more economical walls on site.",
  category: "Featured",
  image: "/images/blog/blog-hero.webp",
};

/**
 * The five individual blog cards — one per local image
 * (`klavetek_1.webp` … `klavetek_5.webp`).
 */
export const blogPosts: BlogPost[] = [
  {
    id: "manufacturing-excellence",
    title: "Inside Klavetek — Engineering Excellence at Every Stage",
    excerpt:
      "Step inside our Old Malda facility to see how fly ash, cement, lime and gypsum are precisely batched, moulded and autoclaved into strong, lightweight, dimensionally exact AAC blocks.",
    category: "Products",
    image: "/images/blog/klavetek_1.webp",
  },
  {
    id: "science-of-aac",
    title: "The Science Behind Autoclaved Aerated Concrete",
    excerpt:
      "Learn how air pockets formed during autoclaving give AAC its signature light weight and thermal performance — without sacrificing the compressive strength your walls need.",
    category: "AAC Blocks",
    image: "/images/blog/klavetek_2.webp",
  },
  {
    id: "building-green",
    title: "Building Green — Less Energy, Less Waste with AAC",
    excerpt:
      "AAC production safely recycles industrial fly ash and needs far less raw material on site, helping construction teams cut waste and build in a more sustainable way.",
    category: "Sustainability",
    image: "/images/blog/klavetek_3.webp",
  },
  {
    id: "faster-construction",
    title: "Why AAC Blocks Speed Up Every Construction Project",
    excerpt:
      "Large-format, lightweight AAC blocks are easy to handle and lay quickly with thin mortar beds — shortening project timelines and reducing labour demand site.",
    category: "Construction",
    image: "/images/blog/klavetek_4.webp",
  },
  {
    id: "thermal-efficiency",
    title: "Thermal Insulation & Energy Efficiency Floor to Ceiling",
    excerpt:
      "The porous structure of AAC provides natural thermal insulation, keeping interiors cooler in summer and cutting long-term air-conditioning energy costs.",
    category: "Insulation",
    image: "/images/blog/klavetek_5.webp",
  },
];