/**
 * =====================================================================
 * Klavetek Blog — ARTICLE CONTENT (internal article detail pages)
 * ---------------------------------------------------------------------
 * Each entry powers a real /blog/[slug] page with its own URL, metadata,
 * open graph data and body content. Content is factual about AAC blocks
 * and construction — no invented certifications or test values.
 * =====================================================================
 */

export interface BlogArticle {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  image: string;
  imageAlt: string;
  publishDate: string;
  readTime: string;
  intro: string;
  /** Body sections: heading + paragraphs (may include markdown-ish * bullets). */
  sections: { heading: string; body: string[] }[];
  faq: { question: string; answer: string }[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "aac-blocks-vs-traditional-bricks",
    title: "AAC Blocks vs Traditional Bricks: An Honest Comparison",
    metaDescription:
      "A balanced comparison of AAC blocks and traditional clay bricks — weight, strength, insulation, cost and sustainability — to help you choose the right wall material for your project.",
    category: "AAC Blocks",
    image: "/images/blog/klavetek_2.webp",
    imageAlt: "AAC blocks compared with traditional clay bricks",
    publishDate: "2024-05-02",
    readTime: "6 min read",
    intro:
      "AAC blocks and traditional clay bricks are the two most common wall-building materials in Indian construction, but they behave very differently on site and in the finished building. This guide looks at both honestly, so you can choose the right material for your project.",
    sections: [
      {
        heading: "Weight and Handling",
        body: [
          "AAC blocks are lightweight — roughly one-third the weight of an equivalent clay brick wall, with a density of about 550–650 kg/m³. This makes them easier to handle on site and reduces the dead load a building's frame has to carry.",
          "Clay bricks are denser and heavier per wall area. That weight can be an advantage for some traditional designs, but it also means more transport effort and higher structural loads.",
        ],
      },
      {
        heading: "Strength and Structural Use",
        body: [
          "Both materials can build strong, durable walls when used within their design limits. AAC blocks deliver compressive strength around 4–5 N/mm², which is well suited to load-bearing and non-load-bearing walls in residential and commercial buildings.",
          "Clay bricks can offer slightly higher compressive strength in some grades, which is one reason some builders still choose them for specific structural roles. Always confirm the structural design with a qualified engineer regardless of material.",
        ],
      },
      {
        heading: "Insulation and Comfort",
        body: [
          "The aerated structure of AAC gives it strong thermal insulation, helping interiors stay cooler in warm climates and reducing air-conditioning load. AAC also provides effective sound insulation and multi-hour fire resistance.",
          "Clay brick walls rely more on their thickness and added treatments for insulation, so they generally need more wall or secondary insulation to reach comparable thermal performance.",
        ],
      },
      {
        heading: "Cost and Construction Speed",
        body: [
          "AAC blocks are larger and more precise than bricks, so fewer are needed per square metre, with less mortar and plaster, fewer labour hours and faster wall construction. These site savings often offset any per-unit price difference.",
          "The right choice depends on your project, budget and design. For most modern residential and commercial construction, AAC blocks deliver strong overall wall economics.",
        ],
      },
      {
        heading: "Sustainability",
        body: [
          "AAC blocks are made largely from fly ash, a by-product of thermal power plants, saving top soil and reducing construction waste. This makes them an environmentally responsible choice compared to clay bricks, which consume fertile top soil and significant fuel.",
          "KLAVETEK manufactures AAC blocks at our Malda facility, where manufacturing follows IS 2185 (Part 3) standards with quality control at every stage.",
        ],
      },
    ],
    faq: [
      { question: "Which is stronger: AAC blocks or clay bricks?", answer: "Both can build strong walls when used within their design limits. Clay bricks can offer slightly higher compressive strength in some grades, while AAC blocks deliver around 4–5 N/mm² — more than enough for typical wall construction. Confirm structural design with a qualified engineer." },
      { question: "Are AAC blocks cheaper than bricks overall?", answer: "AAC blocks are larger and more precise, so fewer are needed per square metre with less mortar, plaster and labour. When these site savings are added up, the total installed wall cost with AAC is often lower even if the per-block price differs." },
    ],
  },
  {
    slug: "how-to-choose-aac-blocks-for-construction",
    title: "How to Choose the Right AAC Blocks for Your Construction",
    metaDescription:
      "A practical guide to selecting the right AAC block thickness for your project — considering wall role, load, insulation needs, budget and supplier reliability.",
    category: "Construction",
    image: "/images/blog/klavetek_4.webp",
    imageAlt: "Choosing the right AAC block thickness for a construction project",
    publishDate: "2024-04-18",
    readTime: "5 min read",
    intro:
      "Choosing an AAC block is more than picking a colour or a budget number. The right thickness and supplier depend on how the wall will be used, the structure around it, and how reliably the blocks can be supplied to your site.",
    sections: [
      {
        heading: "1. Decide the Role of the Wall",
        body: [
          "Internal partition walls carry little load and benefit from thinner blocks that maximise floor space — 100mm or 125mm blocks are common choices.",
          "External and load-bearing walls need more mass and strength — 150mm, 200mm or 250mm blocks give greater structural capacity, thermal insulation and fire resistance.",
        ],
      },
      {
        heading: "2. Consider Insulation and Fire Needs",
        body: [
          "For homes and offices in warm climates, thicker AAC walls improve thermal insulation and reduce air-conditioning load. In buildings with strict fire-safety rules, the higher fire resistance of thicker walls is a deciding factor.",
          "If acoustic privacy matters — for hospitals, hotels or shared-wall apartments — factor in the sound insulation performance of the chosen thickness.",
        ],
      },
      {
        heading: "3. Think About Total Cost, Not Just Block Price",
        body: [
          "Account for mortar, plaster, labour and delivery in addition to the block price. Fewer, larger blocks usually mean less finishing work and faster construction, which affects your overall budget.",
          "Get a total-supply quote for your wall areas rather than comparing single-block rates.",
        ],
      },
      {
        heading: "4. Choose a Reliable Supplier",
        body: [
          "A consistent, quality-controlled supply matters as much as price. A manufacturer with a local factory can coordinate delivery, samples and technical support more easily.",
          "KLAVETEK supplies AAC blocks from our Malda, West Bengal facility across the district and nearby regions — contact the team to discuss the right thickness for your project.",
        ],
      },
    ],
    faq: [
      { question: "What is the most common AAC block thickness for homes?", answer: "For residential construction, 150mm blocks are a common choice for external walls, while 125mm (or 100mm where space is tight) are used for internal partitions. Your structural design should guide the final selection." },
      { question: "Can I use AAC blocks for a load-bearing wall?", answer: "Yes. Thicker AAC blocks such as 200mm and 250mm are used for load-bearing and industrial walls. Confirm the wall design with a qualified engineer." },
    ],
  },
  {
    slug: "aac-block-advantages-for-residential-construction",
    title: "AAC Block Advantages for Residential Construction",
    metaDescription:
      "Why homeowners and builders choose AAC blocks for houses, villas and apartments — thermal comfort, fire safety, faster construction and lower long-term costs.",
    category: "Residential",
    image: "/images/blog/klavetek_1.webp",
    imageAlt: "AAC block advantages for residential construction",
    publishDate: "2024-03-22",
    readTime: "5 min read",
    intro:
      "For homes, AAC blocks bring benefits that go beyond the building site — lower cooling costs, quieter rooms, safer walls and a building that goes up faster. Here is what they add up to for a residential project.",
    sections: [
      {
        heading: "Comfortable Interiors",
        body: [
          "AAC walls provide strong thermal insulation, keeping interiors cooler in the hot Malda climate and cutting air-conditioning load. The same structure also dampens sound, making bedrooms and living spaces quieter.",
        ],
      },
      {
        heading: "Safer Walls",
        body: [
          "AAC is made from incombustible mineral materials and provides multi-hour fire resistance, adding an important layer of safety to family homes. Its lightweight nature also reduces structural load in the event of seismic activity.",
        ],
      },
      {
        heading: "Faster, Cleaner Construction",
        body: [
          "Large-format AAC blocks lay quickly with thin mortar beds, need less plaster and produce less site waste. Faster walls mean a home is ready sooner, with cleaner work for the family.",
        ],
      },
      {
        heading: "Lower Long-Term Costs",
        body: [
          "Better insulation lowers cooling bills over the life of the home, and precise dimensions reduce finishing and maintenance work. KLAVETEK supplies AAC blocks across Malda and North Bengal for residential projects of every size.",
        ],
      },
    ],
    faq: [
      { question: "Are AAC blocks good for a small home?", answer: "Yes. Thinner 125mm or 100mm AAC blocks maximise usable floor space while still giving good insulation and fast construction, making them ideal for space-conscious residential designs." },
      { question: "Do AAC blocks reduce energy bills?", answer: "By providing strong thermal insulation, AAC walls help keep interiors cooler in summer, which can reduce air-conditioning load and long-term energy costs." },
    ],
  },
  {
    slug: "aac-block-applications",
    title: "Where AAC Blocks Are Used: Applications Across Building Types",
    metaDescription:
      "From homes and hospitals to schools, malls and factories — the many building types where AAC blocks deliver strong, comfortable, insulated walls.",
    category: "AAC Blocks",
    image: "/images/blog/klavetek_5.webp",
    imageAlt: "AAC block applications across residential, commercial, hospital and industrial buildings",
    publishDate: "2024-03-05",
    readTime: "4 min read",
    intro:
      "AAC blocks are one of the most versatile wall materials available. Their combination of strength, light weight, insulation and precision makes them suitable for a wide range of building types.",
    sections: [
      {
        heading: "Residential Buildings",
        body: [
          "Homes, villas, apartments and housing complexes use AAC blocks for internal partitions and external walls, enjoying faster construction and comfortable interiors.",
        ],
      },
      {
        heading: "Hospitals and Healthcare",
        body: [
          "Hospitals and nursing homes value AAC for acoustic comfort, hygienic surfaces and fire safety. Several healthcare projects in and around Malda have been built with KLAVETEK AAC blocks.",
        ],
      },
      {
        heading: "Commercial and Retail",
        body: [
          "Offices, shopping complexes and retail spaces use AAC walls for fast build-out, thermal comfort and manageable structural loads.",
        ],
      },
      {
        heading: "Schools and Institutions",
        body: [
          "Educational institutions benefit from quiet, comfortable, energy-efficient classrooms built quickly with AAC blocks.",
        ],
      },
      {
        heading: "Industrial and Warehouses",
        body: [
          "Factories, warehouses and large commercial structures use thicker AAC blocks for strength, insulation and fire resistance in demanding conditions.",
        ],
      },
    ],
    faq: [
      { question: "Can AAC blocks be used for external walls?", answer: "Yes. Thicker AAC blocks such as 150mm, 200mm and 250mm are commonly used for external walls, with the thickness chosen for structural, insulation and fire-safety needs." },
      { question: "Are AAC blocks suitable for hospitals?", answer: "Yes. AAC is popular for healthcare because it offers acoustic comfort, fire resistance and hygienic surfaces. Several hospitals and nursing homes near Malda have been built with KLAVETEK blocks." },
    ],
  },
  {
    slug: "aac-block-quality-testing",
    title: "AAC Block Quality Testing: What to Look For",
    metaDescription:
      "Understand the quality checks that matter in AAC block manufacturing — density, strength, dimensions, water absorption and drying shrinkage — and how KLAVETEK applies them.",
    category: "Quality",
    image: "/images/process/QualityCheck.webp",
    imageAlt: "Quality testing of AAC blocks at the KLAVETEK facility",
    publishDate: "2024-02-15",
    readTime: "5 min read",
    intro:
      "The quality of an AAC block is decided at the factory, long before it reaches your site. Knowing what tests matter helps you choose a supplier you can rely on.",
    sections: [
      {
        heading: "Density and Weight",
        body: [
          "Density (measured in kg/m³) is the first indicator of an AAC block's class. KLAVETEK blocks fall in the 550–650 kg/m³ range, balancing light weight with strength.",
        ],
      },
      {
        heading: "Compressive Strength",
        body: [
          "Compressive strength tells you how much load a block can bear. KLAVETEK AAC blocks deliver around 4–5 N/mm², suited to load-bearing and non-load-bearing walls.",
        ],
      },
      {
        heading: "Dimensional Accuracy",
        body: [
          "Precise dimensions matter because they reduce mortar and plaster. Multi-wire cutting at KLAVETEK holds dimensions to within a tight tolerance, giving accurate, consistent blocks.",
        ],
      },
      {
        heading: "Moisture and Shrinkage",
        body: [
          "Water absorption and drying shrinkage affect long-term durability and crack resistance. Testing these ensures blocks perform well once installed.",
        ],
      },
      {
        heading: "How We Apply These Checks",
        body: [
          "At KLAVETEK's Malda facility, manufacturing conforms to IS 2185 (Part 3) standards, with quality control from raw material selection through to the finished block. This is part of why blocks come out consistent, batch after batch.",
        ],
      },
    ],
    faq: [
      { question: "What standard are AAC blocks tested to in India?", answer: "AAC block manufacturing in India is commonly aligned to IS 2185 (Part 3). KLAVETEK's manufacturing conforms to this standard, with checks on density, strength, dimensions and moisture." },
      { question: "Why does dimensional tolerance matter?", answer: "Precise block dimensions mean thinner, more even mortar beds, less plaster and faster, cleaner walls — which directly affects both construction time and finishing cost." },
    ],
  },
];
