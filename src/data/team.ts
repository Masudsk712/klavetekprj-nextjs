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
    name: "Rabiul Sekh",
    position: "General Manager",
    department: "Management",
    experience: "10+ Years",
    shortDescription:
      "Leads overall plant strategy and operations, steering Klavetek toward consistent growth and profitability.",
    about:
      "Oversees business strategy, plant performance and cross-department coordination, steering the company toward profitable and sustainable growth.",
    responsibilities: [
      "Overall plant & business strategy",
      "Cross-department coordination",
      "Performance & growth oversight",
    ],
    image: "/images/team/RabiulSekh.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-02",
    name: "Mohan Kumar Saha",
    position: "Sales Manager",
    department: "Sales & Marketing",
    experience: "6+ Years",
    shortDescription:
      "Drives AAC block sales and market growth across the region, building lasting client relationships.",
    about:
      "Specializes in sales strategy, key account management and market expansion, growing AAC block sales and ensuring client satisfaction across the region.",
    responsibilities: [
      "Sales strategy & target achievement",
      "Client relationship management",
      "Market expansion & B2B tie-ups",
    ],
    image: "/images/team/MohanKrSaha.webp",
    linkedin: "",
    facebook: "",
  },

  {
    id: "member-03",
    name: "Sahanoyaj Ali",
    position: "Accountant",
    department: "Accounting & Finance",
    experience: "5+ Years",
    shortDescription:
      "Manages accounts, payroll and financial reporting to keep operations compliant and transparent.",
    about:
      "Handles day-to-day accounting, bookkeeping, tax compliance and financial reporting, ensuring accurate and transparent records for the business.",
    responsibilities: [
      "Bookkeeping & financial reporting",
      "Tax & statutory compliance",
      "Payroll & vendor payments",
    ],
    image: "/images/team/SahanoyajAli.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-04",
    name: "Nasim Ali",
    position: "Plant Head",
    department: "Production & Operations",
    experience: "6+ Years",
    shortDescription:
      "Heads plant operations, keeping AAC production safe, efficient and on schedule.",
    about:
      "Oversees day-to-day plant operations, production planning and quality output, ensuring AAC blocks are manufactured safely, efficiently and on schedule.",
    responsibilities: [
      "Plant operations oversight",
      "Production planning & output",
      "Safety & quality standards",
    ],
    image: "/images/team/NasimAli1.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-05",
    name: "Rahul Sekh",
    position: "Sales Executive",
    department: "Sales & Marketing",
    experience: "6+ Years",
    shortDescription:
      "Sells AAC solutions, qualifying leads and converting them into satisfied customers.",
    about:
      "Engages customers on the ground — qualifying leads, presenting product benefits and closing sales — while building strong, lasting relationships.",
    responsibilities: [
      "Lead generation & prospecting",
      "Customer presentations & demos",
      "Order closure & follow-up",
    ],
    image: "/images/team/RahulSekh.webp",
    linkedin: "",
    facebook: "",
  },
  {
    id: "member-06",
    name: "Biswajit Sarkar",
    position: "Boiler Operator",
    department: "Production & Operations",
    experience: "6+ Years",
    shortDescription:
      "Operates and maintains plant boilers, ensuring safe and efficient steam for AAC production.",
    about:
      "Operates and maintains the plant's boilers, monitoring pressure and fuel levels to supply reliable steam while keeping safety and efficiency high.",
    responsibilities: [
      "Boiler operation & monitoring",
      "Preventive maintenance",
      "Safety & fuel efficiency",
    ],
    image: "/images/team/BiswajitSarkar.webp",
    linkedin: "",
    facebook: "",
  },
];
