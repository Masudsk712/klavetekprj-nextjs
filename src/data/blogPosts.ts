/**
 * =====================================================================
 * Klavetek Blog — Single source of truth (Featured + Insights).
 * =====================================================================
 *
 * This is the ONE authoritative data file for the blog. It contains both
 * the single FEATURED article and every grid card. It merges the former
 * facebook-driven content with the editorial blog articles into a single
 * list so there is no duplicated / conflicting data anywhere else.
 *
 * Images: each post references a REAL local image that already exists under
 * `public/images/blog`:
 *
 *   - `blog-hero.webp`  → the single FEATURED article (spotlight)
 *   - `klavetek_1.webp` … `klavetek_5.webp` → the individual blog cards
 *
 * Titles and excerpts reflect factual Klavetek / AAC-block subject matter
 * (drawn verbatim from the existing content — nothing invented).
 *
 * Posts whose `articleUrl` starts with "/" link to INTERNAL article pages at
 * /blog/[slug] — full article bodies live in src/data/blogArticles.ts and are
 * rendered by src/app/blog/[slug]/page.tsx. Posts without an internal article
 * keep pointing to Klavetek's verified public Facebook page.
 * =====================================================================
 */

export const blogPageUrl = "https://www.facebook.com/klavetekaacblocks/";

/** Tasteful local fallback used only if a post is ever missing an image. */
export const FALLBACK_IMAGE = "/images/blog/blog-hero.webp";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  /** Article link. Defaults to `blogPageUrl` when omitted. */
  articleUrl?: string;
};

/** The single featured post — uses `/images/blog/blog-hero.webp`. */
export const featuredPost: BlogPost = {
  id: "featured-aac-advantage",
  title: "AAC Blocks: The Smart Choice for Modern, Sustainable Construction",
  excerpt:
    "Autoclaved aerated concrete (AAC) is transforming how buildings go up — lighter, more precise, better insulated and far gentler on the environment. Discover how Klavetek's autoclaved AAC blocks combine engineered precision with genuine sustainability, from the fly-ash based manufacturing process to faster, more economical walls on site.",
  category: "AAC Blocks",
  image: "/images/blog/blog-hero.webp",
};

/**
 * The blog card grid — one post per source category so the category filter
 * (All | Company Updates | Products | Sustainability | Construction |
 * AAC Blocks | Projects) always has content. Every card maps to a REAL local
 * image (some images are reused across thematically aligned posts rather than
 * ever showing a blank placeholder).
 */
export const blogPosts: BlogPost[] = [
  {
    id: "welcome-to-klavetek",
    title: "Welcome to Klavetek — Eco-Friendly AAC Blocks & Tiles",
    excerpt:
      "Klavetek manufactures premium autoclaved aerated concrete (AAC) blocks and tiles in Old Malda, focused on strong, lightweight and environmentally friendly building materials.",
    category: "Company Updates",
    image: "/images/blog/klavetek_1.webp",
  },
  {
    id: "engineering-excellence",
    title: "Inside Klavetek — Engineering Excellence at Every Stage",
    excerpt:
      "Step inside our Old Malda facility to see how fly ash, cement, lime and gypsum are precisely batched, moulded and autoclaved into strong, lightweight, dimensionally exact AAC blocks.",
    category: "Products",
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
      "Large-format, lightweight AAC blocks are easy to handle and lay quickly with thin mortar beds — shortening project timelines and reducing labour demand on site.",
    category: "Construction",
    image: "/images/blog/klavetek_4.webp",
  },
  {
    id: "science-of-aac",
    title: "The Science Behind Autoclaved Aerated Concrete",
    excerpt:
      "Learn how air pockets formed during autoclaving give AAC its signature light weight and thermal performance — without sacrificing the compressive strength your walls need.",
    category: "AAC Blocks",
    image: "/images/blog/klavetek_5.webp",
  },
  {
    id: "economic-walls",
    title: "Klavetek AAC Blocks — Cost-Effective, Precision-Made Walls",
    excerpt:
      "Engineered to precise dimensions, Klavetek AAC blocks reduce mortar usage and finishing work, delivering clean, strong and economical walls for homes and buildings.",
    category: "Projects",
    image: "/images/blog/klavetek_1.webp",
  },
  {
    id: "thermal-efficiency",
    title: "Thermal Insulation & Energy Efficiency Floor to Ceiling",
    excerpt:
      "The porous structure of AAC materials provides natural thermal insulation, keeping interiors cooler in summer and cutting long-term air-conditioning energy costs.",
    category: "Sustainability",
    image: "/images/blog/klavetek_4.webp",
  },
  /* ------------------------------------------------------------------
   * Full in-depth guides — each card links to a real internal article
   * page at /blog/[slug] (content in src/data/blogArticles.ts).
   * ------------------------------------------------------------------ */
  {
    id: "aac-blocks-vs-traditional-bricks",
    title: "AAC Blocks vs Traditional Bricks: An Honest Comparison",
    excerpt:
      "Weight, strength, insulation, cost and construction speed — a balanced look at how AAC blocks and clay bricks really compare, so you can pick the right wall material for your project.",
    category: "AAC Blocks",
    image: "/images/blog/klavetek_2.webp",
    articleUrl: "/blog/aac-blocks-vs-traditional-bricks",
  },
  {
    id: "how-to-choose-aac-blocks-for-construction",
    title: "How to Choose the Right AAC Blocks for Your Construction",
    excerpt:
      "Block sizes, density, strength, dimensional accuracy and supplier reliability — the practical checks that matter when selecting AAC blocks for a residential or commercial build.",
    category: "Construction",
    image: "/images/blog/klavetek_4.webp",
    articleUrl: "/blog/how-to-choose-aac-blocks-for-construction",
  },
  {
    id: "aac-block-advantages-for-residential-construction",
    title: "AAC Block Advantages for Residential Construction",
    excerpt:
      "Why homes built with AAC blocks are cooler, quieter and faster to finish — and how lighter walls reduce structural load and long-term running costs for homeowners.",
    category: "Construction",
    image: "/images/blog/klavetek_1.webp",
    articleUrl: "/blog/aac-block-advantages-for-residential-construction",
  },
  {
    id: "aac-block-applications",
    title: "Where AAC Blocks Are Used: Applications Across Building Types",
    excerpt:
      "From homes and hospitals to schools, commercial complexes and industrial sheds — a practical overview of how AAC blocks are applied across building types.",
    category: "AAC Blocks",
    image: "/images/blog/klavetek_5.webp",
    articleUrl: "/blog/aac-block-applications",
  },
  {
    id: "aac-block-quality-testing",
    title: "AAC Block Quality Testing: What to Look For",
    excerpt:
      "Density, compressive strength, dimensional accuracy, water absorption and shrinkage — the quality checks that separate dependable AAC blocks from inconsistent ones.",
    category: "Products",
    image: "/images/process/QualityCheck.webp",
    articleUrl: "/blog/aac-block-quality-testing",
  },
];

/**
 * Category filter options shown on the blog page. Kept in the exact order the
 * design calls for so the filter rail looks intentional and always has results.
 */
export const categories: string[] = [
  "All",
  "Company Updates",
  "Products",
  "Sustainability",
  "Construction",
  "AAC Blocks",
  "Projects",
];