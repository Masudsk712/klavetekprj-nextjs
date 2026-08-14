export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  experience: string;
  bio: string;
  responsibilities: string[];
  image: string;
  linkedin?: string;
}

export const managingDirector: TeamMember = {
  id: "managing-director",
  name: "Managing Director",
  position: "Managing Director",
  department: "Leadership",
  experience: "Founder & Managing Director",
  bio:
    "Steers the strategic vision of Klavetek, ensuring sustainable innovation and premium quality in every block manufactured. Committed to transforming construction with eco-friendly building solutions.",
  responsibilities: [
    "Define long-term strategic vision for sustainable growth",
    "Oversee all manufacturing operations and quality assurance",
    "Lead the team in delivering innovative AAC building solutions",
    "Build lasting partnerships with builders, developers, and stakeholders",
  ],
  image: "/images/team/MD.webp",
  linkedin: undefined,
};

export const teamMembers: TeamMember[] = [
  {
    id: "member-01",
    name: "Priya Sharma",
    position: "Senior Production Manager",
    department: "Production",
    experience: "12+ Years",
    bio:
      "Manages end-to-end production operations with a focus on quality optimization and continuous improvement. Ensures every batch of AAC blocks meets ISI certification standards.",
    responsibilities: [
      "Oversee daily production scheduling and resource allocation",
      "Implement quality control protocols and ISI compliance monitoring",
      "Lead process optimization initiatives for energy efficiency",
      "Mentor production supervisors and floor supervisors",
    ],
    image: "/images/team/MD.webp",
    linkedin: "https://linkedin.com/in/priya-sharma-aac",
  },
  {
    id: "member-02",
    name: "Rahul Mehta",
    position: "Design Engineer",
    department: "Engineering",
    experience: "9+ Years",
    bio:
      "Designs optimized AAC block formulations and autoclaving processes. Combines German manufacturing expertise with local construction requirements to deliver structurally superior, sustainable building materials.",
    responsibilities: [
      "Develop and validate new block mixture designs for enhanced performance",
      "Optimize autoclaving cycles for dimensional precision and strength",
      "Ensure ISI and BIS standard compliance across all product lines",
      "Collaborate with R&D on next-generation eco-friendly additives",
    ],
    image: "/images/team/MD.webp",
    linkedin: "https://linkedin.com/in/rahul-mehta-engineer",
  },
  {
    id: "member-03",
    name: "Meera Chandrasekhar",
    position: "Quality Assurance Lead",
    department: "Quality",
    experience: "8+ Years",
    bio:
      "Leads ISI certification audits and end-to-end quality assurance. Implements statistical process control to maintain consistent block density, strength, and dimensional tolerance across all production batches.",
    responsibilities: [
      "Execute ISI and BIS certification audits and maintain compliance records",
      "Implement statistical process control for density, strength, and tolerance",
      "Investigate and resolve quality deviations with corrective action plans",
      "Train quality team on new testing methodologies and standards",
    ],
    image: "/images/team/MD.webp",
    linkedin: "https://linkedin.com/in/meera-qaa",
  },
  {
    id: "member-04",
    name: "Arjun Singh",
    position: "Sustainability Coordinator",
    department: "Sustainability",
    experience: "6+ Years",
    bio:
      "Ensures Klavetek's manufacturing processes minimize environmental impact. Coordinates fly-ash sourcing, carbon-footprint tracking, and green-building certification (IGBC) for all product lines and client projects.",
    responsibilities: [
      "Monitor and reduce carbon footprint across manufacturing operations",
      "Coordinate fly-ash procurement from thermal power partners",
      "Facilitate IGBC and green-building certification for client projects",
      "Report sustainability metrics and lead ESG initiatives",
    ],
    image: "/images/team/MD.webp",
    linkedin: "https://linkedin.com/in/arjun-sustainability",
  },
  {
    id: "member-05",
    name: "Sanjay Verma",
    position: "Technical Sales Manager",
    department: "Sales",
    experience: "10+ Years",
    bio:
      "Bridges the gap between technical specifications and client requirements. Supports architects, engineers, and contractors with material selection, load calculations, and on-site technical guidance for AAC block projects across Eastern India.",
    responsibilities: [
      "Manage key account relationships and strategic client partnerships",
      "Provide technical consultancy on block selection, structural load, and installation",
      "Conduct site surveys and prepare material requirement estimates",
      "Represent Klavetek at trade shows, conferences, and industry seminars",
    ],
    image: "/images/team/MD.webp",
    linkedin: "https://linkedin.com/in/sanjay-verma-sales",
  },
];