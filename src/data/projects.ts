import type { Project, CategoryInfo } from "@/types/project";

export const categories: CategoryInfo[] = [
  {
    key: "hospitals",
    label: "Hospital",
    description: "Hospitals, nursing homes and healthcare facilities built with Klavetek AAC blocks.",
    heroImage: "/images/features/Noise-Resistant.webp",
  },
  {
    key: "educational-institutions",
    label: "School",
    description: "Educational institutions and schools for safe, comfortable learning environments.",
    heroImage: "/images/features/Lightweight.webp",
  },
  {
    key: "commercial-buildings",
    label: "Commercial",
    description: "Modern commercial, retail and mall projects engineered for durability.",
    heroImage: "/images/features/EnergySavingThermalInsulation.webp",
  },
  {
    key: "residential-buildings",
    label: "Residential",
    description: "Premium residential complexes built with Klavetek AAC blocks.",
    heroImage: "/images/features/Eco-Friendly.webp",
  },
  {
    key: "industrial-projects",
    label: "Industrial",
    description: "Heavy-duty industrial structures with high-strength AAC blocks.",
    heroImage: "/images/features/fire-resistant.webp",
  },
];
export const projects: Record<string, Project[]> = {
  hospitals: [
    {
      id: "drl-hospital", slug: "drl-hospital", title: "DRL Multispeciality Hospital", location: "Malda, West Bengal", status: "completed", category: "hospitals",
      heroImage: "/images/projects/drl%20hospital.webp", coverImage: "/images/projects/drl%20hospital.webp",
      gallery: ["/images/projects/drl%20hospital.webp", "/images/projects/drl%20hospital%201.webp"],
      description: "A 200-bed multispeciality hospital constructed with Klavetak AAC blocks for fire resistance, acoustic comfort and hygienic surfaces.",
      highlights: ["200 beds, 6 floors", "Fire-rated walls", "Acoustic comfort", "Hygienic surfaces", "Quick construction"],
      client: "DRL Healthcare Pvt. Ltd.", year: 2023, completionDate: "September 2023", constructionDuration: "16 months", aacBlockSize: "100mm / 150mm",
      area: "85,000 sq.ft", blocksUsed: "2,10,000 blocks", co2Reduction: "680 tonnes", energySavings: "25%",
      projectStats: { totalBlocksUsed: "2,10,000", projectArea: "85,000", constructionTimeSaved: "25%", co2Reduction: "680", energySavings: "25", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Planning and approvals", date: "May 2022", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "July 2022", icon: "Layers" },
        { title: "Structure", description: "Full structure raised", date: "March 2023", icon: "Building2" },
        { title: "Completion", description: "Commissioned", date: "September 2023", icon: "CheckCircle" },
      ],
    },
    {
      id: "eden-nursing-home", slug: "eden-nursing-home", title: "Eden Nursing Home", location: "Malda, West Bengal", status: "completed", category: "hospitals",
      heroImage: "/images/projects/Eden%20Nursing%20Home%20Malda.webp", coverImage: "/images/projects/Eden%20Nursing%20Home%20Malda.webp",
      gallery: ["/images/projects/Eden%20Nursing%20Home%20Malda.webp", "/images/projects/Eden%20Nursing%20Home%20Malda%202.webp"],
      description: "A dedicated nursing home in Malda built with Klavetak AAC blocks for patient comfort and a calm healing environment.",
      highlights: ["Patient comfort", "Acoustic walls", "Fire safety", "Hygienic surfaces", "Fast construction"],
      client: "Eden Healthcare", year: 2022, completionDate: "February 2022", constructionDuration: "14 months", aacBlockSize: "100mm / 125mm",
      area: "45,000 sq.ft", blocksUsed: "1,05,000 blocks", co2Reduction: "340 tonnes", energySavings: "22%",
      projectStats: { totalBlocksUsed: "1,05,000", projectArea: "45,000", constructionTimeSaved: "22%", co2Reduction: "340", energySavings: "22", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Site design approved", date: "January 2022", icon: "Flag" },
        { title: "Foundation", description: "Foundation laid", date: "February 2022", icon: "Layers" },
        { title: "Structure", description: "Structure completed", date: "December 2022", icon: "Building2" },
        { title: "Completion", description: "Handed over", date: "February 2022", icon: "CheckCircle" },
      ],
    },
    {
      id: "mgm-medical-college", slug: "mgm-medical-college-kishanganj", title: "MGM Medical College, Kishanganj", location: "Kishanganj, Bihar", status: "completed", category: "hospitals",
      heroImage: "/images/projects/mgm%20medical%20clg,Kishanganj.webp", coverImage: "/images/projects/mgm%20medical%20clg,Kishanganj.webp",
      gallery: ["/images/projects/mgm%20medical%20clg,Kishanganj.webp", "/images/projects/mgm%20medical%20clg,Kishanganj%202.webp"],
      description: "A medical college and hospital in Kishanganj built with Klavetak AAC blocks for durable and fire-safe healthcare infrastructure.",
      highlights: ["Medical campus", "Fire-rated walls", "Acoustic comfort", "Durable structure", "Energy-efficient"],
      client: "MGM Educational Trust", year: 2021, completionDate: "June 2021", constructionDuration: "24 months", aacBlockSize: "125mm / 150mm",
      area: "1,20,000 sq.ft", blocksUsed: "3,00,000 blocks", co2Reduction: "960 tonnes", energySavings: "28%",
      projectStats: { totalBlocksUsed: "3,00,000", projectArea: "1,20,000", constructionTimeSaved: "30%", co2Reduction: "960", energySavings: "28", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Campus approved", date: "April 2020", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "June 2020", icon: "Layers" },
        { title: "Structure", description: "Structural completion", date: "March 2021", icon: "Building2" },
        { title: "Completion", description: "Inaugurated", date: "June 2021", icon: "CheckCircle" },
      ],
    },
    {
      id: "square-nursing-home", slug: "square-nursing-home-malda", title: "Square Nursing Home", location: "Malda, West Bengal", status: "completed", category: "hospitals",
      heroImage: "/images/projects/square-nursing-home-malda%201.webp", coverImage: "/images/projects/square-nursing-home-malda%201.webp",
      gallery: ["/images/projects/square-nursing-home-malda%201.webp", "/images/projects/square-nursing-home-malda%202.webp"],
      description: "A modern nursing home in Malda built with Klavetak AAC blocks for comfort, hygiene and energy efficiency.",
      highlights: ["Patient rooms", "Acoustic partitions", "Hygienic surfaces", "Fire safety", "Fast build"],
      client: "Square Healthcare", year: 2021, completionDate: "August 2021", constructionDuration: "12 months", aacBlockSize: "100mm",
      area: "35,000 sq.ft", blocksUsed: "82,000 blocks", co2Reduction: "260 tonnes", energySavings: "20%",
      projectStats: { totalBlocksUsed: "82,000", projectArea: "35,000", constructionTimeSaved: "20%", co2Reduction: "260", energySavings: "20", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Design completion", date: "August 2020", icon: "Flag" },
        { title: "Foundation", description: "Foundation laid", date: "September 2020", icon: "Layers" },
        { title: "Structure", description: "Structure completed", date: "June 2021", icon: "Building2" },
        { title: "Completion", description: "Handed over", date: "August 2021", icon: "CheckCircle" },
      ],
    },
    {
      id: "sushparsha-nursing-home", slug: "sushparsha-nursing-home", title: "Sushparsha Nursing Home", location: "Malda, West Bengal", status: "completed", category: "hospitals",
      heroImage: "/images/projects/SUSHPARSHA%20NURING%20HOME.webp", coverImage: "/images/projects/SUSHPARSHA%20NURING%20HOME.webp",
      gallery: ["/images/projects/SUSHPARSHA%20NURING%20HOME.webp", "/images/projects/SUSHPARSHA%20NURING%20HOME%202.webp"],
      description: "A patient-centred nursing home built with Klavetak AAC blocks for a safe, comfortable and hygienic care environment.",
      highlights: ["Safe care", "Acoustic comfort", "Fire resistance", "Hygienic", "Rapid construction"],
      client: "Sushparsha Healthcare", year: 2022, completionDate: "May 2022", constructionDuration: "11 months", aacBlockSize: "100mm",
      area: "38,000 sq.ft", blocksUsed: "75,500 blocks", co2Reduction: "240 tonnes", energySavings: "20%",
      projectStats: { totalBlocksUsed: "75,500", projectArea: "38,000", constructionTimeSaved: "20%", co2Reduction: "240", energySavings: "20", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Approvals", date: "February 2021", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "March 2021", icon: "Layers" },
        { title: "Structure", description: "Structure raised", date: "February 2022", icon: "Building2" },
        { title: "Completion", description: "Ready for service", date: "May 2022", icon: "CheckCircle" },
      ],
    },
  ],
  "educational-institutions": [
    {
      id: "growth-career-institute", slug: "growth-career-institute", title: "Growth Career Institute", location: "Malda, West Bengal", status: "completed", category: "educational-institutions",
      heroImage: "/images/projects/the%20growth%20career%20institute.webp", coverImage: "/images/projects/the%20growth%20career%20institute.webp",
      gallery: ["/images/projects/the%20growth%20career%20institute.webp", "/images/projects/the%20growth%20career%20institute%201.webp"],
      description: "Growth Career Institute is built with Klavetak AAC blocks for safe, comfortable and energy-efficient learning spaces.",
      highlights: ["Safe learning spaces", "Acoustic classrooms", "Energy-efficient", "Durable structure", "Fast construction"],
      client: "Growth Career Institute", year: 2022, completionDate: "March 2022", constructionDuration: "12 months", aacBlockSize: "100mm / 125mm",
      area: "30,000 sq.ft", blocksUsed: "70,000 blocks", co2Reduction: "220 tonnes", energySavings: "20%",
      projectStats: { totalBlocksUsed: "70,000", projectArea: "30,000", constructionTimeSaved: "20%", co2Reduction: "220", energySavings: "20", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Campus design approved", date: "December 2020", icon: "Flag" },
        { title: "Foundation", description: "Foundation laid", date: "February 2021", icon: "Layers" },
        { title: "Structure", description: "Structure completed", date: "January 2022", icon: "Building2" },
        { title: "Completion", description: "Academic session began", date: "March 2022", icon: "CheckCircle" },
      ],
    },
  ],
  "commercial-buildings": [
    {
      id: "prm-centrepoint-malda", slug: "prm-centrepoint-malda", title: "PRM Centrepoint Malda", location: "Malda, West Bengal", status: "completed", category: "commercial-buildings",
      heroImage: "/images/projects/PRM-Centrepoint-Malda.webp", coverImage: "/images/projects/PRM-Centrepoint-Malda.webp",
      gallery: ["/images/projects/PRM-Centrepoint-Malda.webp", "/images/projects/prm%20centerMall.webp"],
      description: "A commercial centre in Malda built with Klavetak AAC blocks for modern retail and business spaces.",
      highlights: ["Retail spaces", "Commercial design", "Durable walls", "Energy-efficient", "Fire-safe"],
      client: "PRM Group", year: 2023, completionDate: "January 2023", constructionDuration: "18 months", aacBlockSize: "150mm",
      area: "40,000 sq.ft", blocksUsed: "98,000 blocks", co2Reduction: "310 tonnes", energySavings: "24%",
      projectStats: { totalBlocksUsed: "98,000", projectArea: "40,000", constructionTimeSaved: "22%", co2Reduction: "310", energySavings: "24", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Approvals", date: "February 2021", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "April 2021", icon: "Layers" },
        { title: "Structure", description: "Structure raised", date: "October 2022", icon: "Building2" },
        { title: "Completion", description: "Opened for business", date: "January 2023", icon: "CheckCircle" },
      ],
    },
    {
      id: "prm-prestige-malda", slug: "prm-prestige-malda", title: "PRM Prestige Malda", location: "Malda, West Bengal", status: "ongoing", category: "commercial-buildings",
      heroImage: "/images/projects/prm%20prestige%20malda.webp", coverImage: "/images/projects/prm%20prestige%20malda.webp",
      gallery: ["/images/projects/prm%20prestige%20malda.webp", "/images/projects/prm%20prestige%20malda%202.webp"],
      description: "A premium commercial development in Malda built with Klavetak AAC blocks for modern business spaces.",
      highlights: ["Commercial complex", "Office spaces", "Durable AAC walls", "Energy-efficient", "Fire-safe"],
      client: "PRM Group", year: 2024, completionDate: "February 2024", constructionDuration: "20 months", aacBlockSize: "150mm",
      area: "48,000 sq.ft", blocksUsed: "1,12,000 blocks", co2Reduction: "360 tonnes", energySavings: "25%",
      projectStats: { totalBlocksUsed: "1,12,000", projectArea: "48,000", constructionTimeSaved: "23%", co2Reduction: "360", energySavings: "25", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Planning", date: "March 2022", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "May 2022", icon: "Layers" },
        { title: "Structure", description: "Structure raised", date: "November 2023", icon: "Building2" },
        { title: "Completion", description: "Commissioned", date: "February 2024", icon: "CheckCircle" },
      ],
    },
  ],
  "residential-buildings": [
    {
      id: "riviera-purnia", slug: "riviera-purnia", title: "Riviera, Purnia", location: "Purnia, Bihar", status: "upcoming", category: "residential-buildings",
      heroImage: "/images/projects/riviera-purnia.webp", coverImage: "/images/projects/riviera-purnia.webp",
      gallery: ["/images/projects/riviera-purnia.webp"],
      description: "Riviera is a premium residential project in Purnia built with Klavetak AAC blocks for comfortable and durable living.",
      highlights: ["Premium apartments", "Comfortable living", "Thermal insulation", "Durable walls", "Energy-efficient"],
      client: "Riviera Developers", year: 2022, completionDate: "October 2022", constructionDuration: "20 months", aacBlockSize: "100mm / 125mm",
      area: "50,000 sq.ft", blocksUsed: "1,20,000 blocks", co2Reduction: "390 tonnes", energySavings: "24%",
      projectStats: { totalBlocksUsed: "1,20,000", projectArea: "50,000", constructionTimeSaved: "26%", co2Reduction: "390", energySavings: "24", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Land approved", date: "March 2021", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "May 2021", icon: "Layers" },
        { title: "Structure", description: "Structure raised", date: "August 2022", icon: "Building2" },
        { title: "Completion", description: "Handed over", date: "October 2022", icon: "CheckCircle" },
      ],
    },
  ],
  "industrial-projects": [
    {
      id: "balurghat-railway-station", slug: "balurghat-railway-station", title: "Balurghat Railway Station", location: "Balurghat, West Bengal", status: "completed", category: "industrial-projects",
      heroImage: "/images/projects/Balurghat%20Railway%20Station.webp", coverImage: "/images/projects/Balurghat%20Railway%20Station.webp",
      gallery: ["/images/projects/Balurghat%20Railway%20Station.webp", "/images/projects/Balurghat%20Railway%20Station%201.webp"],
      description: "Balurghat Railway Station was constructed with high-strength Klavetak AAC blocks for durable, large-span public infrastructure.",
      highlights: ["Public infrastructure", "Heavy-duty walls", "Longevity", "Fire resistance", "Low maintenance"],
      client: "Indian Railways", year: 2020, completionDate: "December 2020", constructionDuration: "15 months", aacBlockSize: "150mm / 200mm",
      area: "22,000 sq.ft", blocksUsed: "58,000 blocks", co2Reduction: "190 tonnes", energySavings: "20%",
      projectStats: { totalBlocksUsed: "58,000", projectArea: "22,000", constructionTimeSaved: "18%", co2Reduction: "190", energySavings: "20", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Contract awarded", date: "March 2019", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "June 2019", icon: "Layers" },
        { title: "Structure", description: "Structure completed", date: "October 2020", icon: "Building2" },
        { title: "Completion", description: "Commissioned", date: "December 2020", icon: "CheckCircle" },
      ],
    },
  ],
};

export const categoryMap: Record<string, string> = {
  hospitals: "Hospital",
  "educational-institutions": "School",
  "commercial-buildings": "Commercial",
  "residential-buildings": "Residential",
  "industrial-projects": "Industrial",
};

export function getCategoryInfo(key: string): CategoryInfo | undefined {
  return categories.find((c) => c.key === key);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects[category] || [];
}

export function getProjectBySlug(category: string, slug: string): Project | undefined {
  const list = projects[category];
  if (!list) return undefined;
  return list.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return Object.values(projects).flat();
}

export function getRelatedProjects(currentProject: Project, limit = 3): Project[] {
  const sameCategory = projects[currentProject.category] || [];
  return sameCategory.filter((p) => p.id !== currentProject.id).slice(0, limit);
}

export function statusColor(status: Project["status"]): string {
  switch (status) {
    case "completed": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
    case "ongoing": return "text-amber-400 bg-amber-400/10 border-amber-400/30";
    case "upcoming": return "text-sky-400 bg-sky-400/10 border-sky-400/30";
    default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
  }
}

export function formatCategoryLabel(category: string): string {
  return categoryMap[category] || category;
}