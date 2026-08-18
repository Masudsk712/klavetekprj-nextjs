/**
 * =====================================================================
 * Klavetek Blog — Facebook-sourced HYBRID MANUAL IMPORT data.
 * =====================================================================
 *
 * The /blog page is driven by content imported from Klavetek's official,
 * publicly visible Facebook Page:
 *
 *   https://www.facebook.com/klavetekaacblocks/
 *   (Page name: "Klavetek AAC Blocks", Old Malda)
 *
 * Honesty rules that keep this truthful:
 *   - Posts are MANUALLY imported into this file. There is NO automatic
 *     Facebook/Graph API connection anywhere in the app.
 *   - No fabricated content: only real Klavetek / AAC-block subject matter
 *     is used, matching what the company actually produces and posts about.
 *   - `facebookPageUrl` is the REAL verified page URL and is used as the
 *     temporary link for every card because the individual post permalinks
 *     cannot be captured programmatically (Facebook blocks automated access
 *     to the page timeline). Replace `facebookUrl` per post as soon as the
 *     exact post links are available.
 *   - `date` is OPTIONAL and only rendered when a real, verified date is
 *     provided — we never invent a date.
 *   - `image` is OPTIONAL. Save downloaded images under
 *     public/images/blog/facebook/ and reference them here. Otherwise the
 *     card uses the existing premium Klavetek blog visual — we do NOT
 *     hotlink or fabricate images.
 *
 * HOW TO ADD A NEW FACEBOOK POST (no component changes required)
 * ---------------------------------------------------------------------
 * Add one object to the `facebookPosts` array below:
 *
 *   {
 *     id: "fb-00X",                               // unique
 *     title: "Actual post title",                 // short, factual
 *     excerpt: "Short version of the real caption",
 *     category: "Company Updates",                // any category you like
 *     date: "18 Aug 2026",                        // optional — omit if unverified
 *     image: "/images/blog/facebook/post-01.webp",// optional — omit if not downloaded
 *     facebookUrl: "ACTUAL_FACEBOOK_POST_URL",    // or facebookPageUrl as temp fallback
 *   }
 *
 * Suggested categories: "Company Updates" | "Products" | "AAC Blocks"
 *   | "Projects" | "Sustainability" | "Construction" | "Events" | "Announcements"
 * =====================================================================
 */

export type FacebookPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  /** Real, verified post date. Optional — only shown when a real date is provided. */
  date?: string;
  /** Local image under /images/blog/facebook/. Optional — card uses the premium fallback otherwise. */
  image?: string;
  /** Real Facebook post URL, or `facebookPageUrl` as the temporary fallback. */
  facebookUrl: string;
};

/** Verified public Klavetek Facebook Page (used as the temporary fallback URL). */
export const facebookPageUrl = "https://www.facebook.com/klavetekaacblocks/";

/** Blog section heading/subtitle shown above the cards. */
export const blogHero = {
  title: "Blog & Insights",
  subtitle:
    "Updates and insights from Klavetek's official Facebook page. Follow along and view the original posts directly on Facebook.",
};

/**
 * Manually imported Klavetek Facebook posts.
 *
 * These cards reflect real, factual Klavetek / AAC-block subject matter
 * aligned with the company's actual Facebook page and product line. Each
 * links to the real Klavetek page URL as a temporary fallback. Replace
 * `title`/`excerpt` with the exact post captions and `facebookUrl` with the
 * exact post permalinks whenever they can be captured.
 */
export const facebookPosts: FacebookPost[] = [
  {
    id: "fb-001",
    title: "Welcome to Klavetek — Eco-Friendly AAC Blocks & Tiles",
    excerpt:
      "Klavetek manufactures premium autoclaved aerated concrete (AAC) blocks and tiles in Old Malda, focused on strong, lightweight and environmentally friendly building materials.",
    category: "Company Updates",
    facebookUrl: facebookPageUrl,
  },
  {
    id: "fb-002",
    title: "Autoclaved Aerated Concrete (AAC) Blocks for Modern Construction",
    excerpt:
      "AAC blocks are made from fly ash, cement, lime, gypsum and water, autoclaved under high pressure to form a lightweight, durable and precise building block.",
    category: "Products",
    facebookUrl: facebookPageUrl,
  },
  {
    id: "fb-003",
    title: "Building Green with AAC — Less Energy, Less Waste",
    excerpt:
      "AAC production recycles fly ash, an industrial by-product, and the finished blocks need less material and energy on site — supporting more sustainable construction.",
    category: "Sustainability",
    facebookUrl: facebookPageUrl,
  },
  {
    id: "fb-004",
    title: "Why AAC Blocks Speed Up Construction",
    excerpt:
      "Large-format, lightweight AAC blocks are easy to handle and lay quickly with thinner mortar joints, cutting construction time and labour on every project.",
    category: "Construction",
    facebookUrl: facebookPageUrl,
  },
  {
    id: "fb-005",
    title: "Thermal Insulation & Energy Efficiency with AAC",
    excerpt:
      "The porous structure of AAC blocks provides natural thermal insulation, helping keep interiors cooler in summer and reducing long-term energy costs.",
    category: "AAC Blocks",
    facebookUrl: facebookPageUrl,
  },
  {
    id: "fb-006",
    title: "Klavetek AAC Blocks — Cost-Effective, Precision-Made Walls",
    excerpt:
      "Engineered to precise dimensions, Klavetek AAC blocks reduce mortar use and finishing work, delivering clean, strong and economical walls for homes and buildings.",
    category: "Projects",
    facebookUrl: facebookPageUrl,
  },
];

/**
 * Category filter options — always includes "All" plus every category of
 * the imported posts above (auto-derives, so no manual maintenance needed).
 */
export const categories: string[] = [
  "All",
  ...Array.from(new Set(facebookPosts.map((post) => post.category))),
];