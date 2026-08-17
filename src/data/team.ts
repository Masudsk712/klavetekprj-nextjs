/* =====================================================================
   Team data — single source of truth for the About-page leadership and
   team sections. Card and profile modal both read from here so data is
   never duplicated across components.

   NOTE: Each member carries a concise `about` (1-2 sentences) plus up to
   three short `responsibilities`. Social links default to empty strings —
   no URL is invented. Add the real LinkedIn/Facebook profile URL here later
   and it flows through to the card and modal automatically.
   ===================================================================== */

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  experience?: string;
  shortDescription?: string;
  /** Concise 1-2 sentence professional summary shown in the profile modal. */
  about: string;
  responsibilities: string[];
  /** Real professional portrait path (centralized here). Leave undefined to show a premium placeholder. */
  image?: string;
  facebook?: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "member-01",
    name: "Priya Sharma",
    position: "Senior Production Manager",
    department: "Production",
    experience: "12+ Years",
    shortDescription:
      "Leads end-to-end production, ensuring every batch meets ISI-certified quality standards.",
    about:
      "Specializes in AAC production and process optimization, ensuring consistent quality and efficient manufacturing.",
    responsibilities: [
      "Production & process optimization",
      "Quality and standards compliance",
      "Continuous manufacturing improvement",
    ],
    image: "/images/team/pic1.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-02",
    name: "Rahul Mehta",
    position: "Design Engineer",
    department: "Engineering",
    experience: "9+ Years",
    shortDescription:
      "Designs optimized AAC formulations and autoclaving processes for superior strength.",
    about:
      "Designs optimized AAC formulations and autoclaving processes for structurally superior, sustainable blocks.",
    responsibilities: [
      "Mix design & formulation",
      "Autoclaving process optimization",
      "Standards & performance validation",
    ],
    image: "/images/team/pic2.webp",
    linkedin: "",
    facebook: "",
  },

  {
    id: "member-03",
    name: "Meera Chandrasekhar",
    position: "Quality Assurance Lead",
    department: "Quality",
    experience: "8+ Years",
    shortDescription:
      "Guards block density, strength and tolerance through statistical process control.",
    about:
      "Leads quality assurance and ISI certification, keeping every block consistent in density, strength and tolerance.",
    responsibilities: [
      "Quality assurance & testing",
      "ISI / BIS certification compliance",
      "Statistical process control",
    ],
    image: "/images/team/pic3.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-04",
    name: "Arjun Singh",
    position: "Sustainability Coordinator",
    department: "Sustainability",
    experience: "6+ Years",
    shortDescription:
      "Coordinates fly-ash sourcing, carbon tracking and green-building certification.",
    about:
      "Drives Klavetek's sustainability initiatives, cutting environmental impact and supporting green-building certification.",
    responsibilities: [
      "Carbon footprint reduction",
      "Fly-ash sourcing & coordination",
      "Green-building (IGBC) certification",
    ],
    image: "/images/team/pic4.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-05",
    name: "Sanjay Verma",
    position: "Technical Sales Manager",
    department: "Sales",
    experience: "10+ Years",
    shortDescription:
      "Bridges technical specifications and client needs across Eastern India.",
    about:
      "Bridges technical specifications and client needs, guiding material selection and installation across Eastern India.",
    responsibilities: [
      "Key client relationship management",
      "Technical consultancy & support",
      "Site surveys & requirement planning",
    ],
    image: "/images/team/pic5.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-06",
    name: "Rohit Nair",
    position: "Deputy Plant Manager",
    department: "Production",
    experience: "11+ Years",
    shortDescription:
      "Oversees plant operations and maintenance, keeping production safe, efficient and on schedule.",
    about:
      "Oversees day-to-day plant operations and maintenance, keeping production safe, efficient and on schedule.",
    responsibilities: [
      "Plant operations & maintenance",
      "Safety & efficiency standards",
      "Production line coordination",
    ],
    image: "/images/team/pic6.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-07",
    name: "Aditya Rao",
    position: "Field Application Engineer",
    department: "Engineering",
    experience: "7+ Years",
    shortDescription:
      "Provides on-site technical guidance and installation support for AAC block projects.",
    about:
      "Provides on-site technical guidance and installation support for AAC block projects across the region.",
    responsibilities: [
      "On-site technical guidance",
      "Installation best practices",
      "Client & contractor training",
    ],
    image: "/images/team/pic7.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-08",
    name: "Kavita Menon",
    position: "Supply Chain Manager",
    department: "Operations",
    experience: "9+ Years",
    shortDescription:
      "Manages supply chain and inventory to ensure timely, cost-effective delivery to site.",
    about:
      "Manages supply chain and inventory to ensure timely, cost-effective delivery of materials to site.",
    responsibilities: [
      "Supply chain & logistics",
      "Inventory & procurement planning",
      "Vendor coordination",
    ],
    image: "/images/team/pic8.webp",
    linkedin: "",
    facebook: "",
  },
];
