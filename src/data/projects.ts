import type { Project, CategoryInfo } from "@/types/project";

export const categories: CategoryInfo[] = [
  {
    key: "residential-buildings",
    label: "Residential Buildings",
    description: "Premium residential complexes built with Klavetek AAC blocks.",
    heroImage: "/images/features/Eco-Friendly.webp",
  },
  {
    key: "commercial-buildings",
    label: "Commercial Buildings",
    description: "Modern commercial spaces engineered for durability.",
    heroImage: "/images/features/EnergySavingThermalInsulation.webp",
  },
  {
    key: "industrial-projects",
    label: "Industrial Projects",
    description: "Heavy-duty industrial structures with high-strength AAC blocks.",
    heroImage: "/images/features/fire-resistant.webp",
  },
  {
    key: "hospitals",
    label: "Hospitals",
    description: "Healthcare facilities with fire resistance and acoustic comfort.",
    heroImage: "/images/features/Noise-Resistant.webp",
  },
  {
    key: "educational-institutions",
    label: "Educational Institutions",
    description: "Schools and colleges for safe learning environments.",
    heroImage: "/images/features/Lightweight.webp",
  },
  {
    key: "warehouses",
    label: "Warehouses",
    description: "Large-span warehouses with superior insulation.",
    heroImage: "/images/features/Pest-Resistant.webp",
  },
];

export const projects: Record<string, Project[]> = {
  "residential-buildings": [
    {
      id: "prm-mall", slug: "prm-mall", title: "PRM Heights Residential Complex", location: "Malda, West Bengal", status: "completed", category: "residential-buildings",
      heroImage: "/images/features/Eco-Friendly.webp", coverImage: "/images/features/Eco-Friendly.webp",
      gallery: ["/images/features/Eco-Friendly.webp", "/images/features/EnergySavingThermalInsulation.webp"],
      description: "A 12-story premium residential complex featuring 96 luxury apartments constructed using Klavetek 200mm AAC blocks.",
      highlights: ["12 stories, 96 luxury apartments","200mm Klavetek AAC blocks","30% faster construction","ISI-certified quality","Energy-efficient HVAC"],
      client: "PRM Developers Pvt. Ltd.", year: 2024, completionDate: "March 2024", constructionDuration: "18 months", aacBlockSize: "200mm",
      area: "45,000 sq.ft", blocksUsed: "1,25,000 blocks", co2Reduction: "420 tonnes", energySavings: "28%",
      projectStats: { totalBlocksUsed: "1,25,000", projectArea: "45,000", constructionTimeSaved: "30%", co2Reduction: "420", energySavings: "28", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Groundbreaking ceremony", date: "June 2022", icon: "Flag" },
        { title: "Foundation", description: "RCC raft foundation completed", date: "August 2022", icon: "Layers" },
        { title: "Structure", description: "Superstructure raised", date: "January 2024", icon: "Building2" },
        { title: "Completion", description: "Handed over to client", date: "March 2024", icon: "CheckCircle" },
      ],
    },
    {
      id: "green-valley-villas", slug: "green-valley-villas", title: "Green Valley Villas", location: "Siliguri, West Bengal", status: "ongoing", category: "residential-buildings",
      heroImage: "/images/features/Lightweight.webp", coverImage: "/images/features/Lightweight.webp",
      gallery: ["/images/features/Lightweight.webp", "/images/features/Eco-Friendly.webp", "/images/features/Noise-Resistant.webp"],
      description: "An eco-friendly gated community of 24 luxury villas using Klavetek AAC blocks.",
      highlights: ["24 luxury villas","150mm & 200mm AAC blocks","Eco-friendly design","Rainwater harvesting","Solar-ready rooftops"],
      client: "Green Valley Estates", year: 2025, completionDate: "Expected December 2025", constructionDuration: "24 months", aacBlockSize: "150mm / 200mm",
      area: "62,000 sq.ft", blocksUsed: "1,80,000 blocks", co2Reduction: "610 tonnes", energySavings: "35%",
      projectStats: { totalBlocksUsed: "1,80,000", projectArea: "62,000", constructionTimeSaved: "35%", co2Reduction: "610", energySavings: "35", completionPercentage: "65" },
      timeline: [
        { title: "Project Start", description: "Land acquisition", date: "January 2024", icon: "Flag" },
        { title: "Foundation", description: "Foundation in progress", date: "April 2024", icon: "Layers" },
        { title: "Structure", description: "Structural work ongoing", date: "Ongoing", icon: "Building2" },
        { title: "Completion", description: "Expected December 2025", date: "December 2025", icon: "CheckCircle" },
      ],
    },
  ],
  "commercial-buildings": [
    {
      id: "xyz-tower", slug: "xyz-tower", title: "XYZ Business Tower", location: "Kolkata, West Bengal", status: "completed", category: "commercial-buildings",
      heroImage: "/images/features/EnergySavingThermalInsulation.webp", coverImage: "/images/features/EnergySavingThermalInsulation.webp",
      gallery: ["/images/features/EnergySavingThermalInsulation.webp", "/images/features/Eco-Friendly.webp", "/images/features/Lightweight.webp", "/images/features/fire-resistant.webp"],
      description: "A 20-story Grade-A commercial office tower in Kolkata's business district.",
      highlights: ["20 stories, 2.5 lakh sq.ft","125mm & 150mm AAC blocks","Fire-rated partitions","LEED Gold certified","Smart HVAC integration"],
      client: "XYZ Infrastructure Ltd.", year: 2023, completionDate: "November 2023", constructionDuration: "22 months", aacBlockSize: "125mm / 150mm",
      area: "2,50,000 sq.ft", blocksUsed: "3,20,000 blocks", co2Reduction: "980 tonnes", energySavings: "32%",
      projectStats: { totalBlocksUsed: "3,20,000", projectArea: "2,50,000", constructionTimeSaved: "28%", co2Reduction: "980", energySavings: "32", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Design approvals", date: "January 2022", icon: "Flag" },
        { title: "Foundation", description: "Pile foundation completed", date: "April 2022", icon: "Layers" },
        { title: "Structure", description: "Full structural completion", date: "August 2023", icon: "Building2" },
        { title: "Completion", description: "Handed over with OC", date: "November 2023", icon: "CheckCircle" },
      ],
    },
    {
      id: "city-square-mall", slug: "city-square-mall", title: "City Square Mall", location: "Durgapur, West Bengal", status: "upcoming", category: "commercial-buildings",
      heroImage: "/images/features/Lightweight.webp", coverImage: "/images/features/Lightweight.webp",
      gallery: ["/images/features/Lightweight.webp", "/images/features/EnergySavingThermalInsulation.webp"],
      description: "A modern retail and entertainment complex spanning 4 floors with multiplex and food court.",
      highlights: ["4 floors, 1.2 lakh sq.ft","200mm AAC blocks","Fire-rated zones","Energy-efficient design","Expected 2026"],
      client: "City Square Developers", year: 2026, completionDate: "Expected June 2026", constructionDuration: "30 months", aacBlockSize: "200mm",
      area: "1,20,000 sq.ft", blocksUsed: "1,90,000 blocks", co2Reduction: "560 tonnes", energySavings: "30%",
      projectStats: { totalBlocksUsed: "1,90,000", projectArea: "1,20,000", constructionTimeSaved: "32%", co2Reduction: "560", energySavings: "30", completionPercentage: "15" },
      timeline: [
        { title: "Project Start", description: "Planning phase", date: "June 2025", icon: "Flag" },
        { title: "Foundation", description: "Upcoming", date: "Planned Q4 2025", icon: "Layers" },
        { title: "Structure", description: "Upcoming", date: "Planned 2026", icon: "Building2" },
        { title: "Completion", description: "Expected June 2026", date: "June 2026", icon: "CheckCircle" },
      ],
    },
  ],
  "industrial-projects": [
    {
      id: "drl-industrial-park", slug: "drl-industrial-park", title: "DRL Industrial Park", location: "Panagarh, West Bengal", status: "completed", category: "industrial-projects",
      heroImage: "/images/features/fire-resistant.webp", coverImage: "/images/features/fire-resistant.webp",
      gallery: ["/images/features/fire-resistant.webp", "/images/features/Lightweight.webp", "/images/features/Pest-Resistant.webp"],
      description: "A state-of-the-art industrial park with 8 manufacturing units using Klavetek AAC blocks.",
      highlights: ["8 manufacturing units","Fire-resistant partitions","Load-bearing walls","Quick turnaround","Low maintenance"],
      client: "DRL Industries Pvt. Ltd.", year: 2024, completionDate: "July 2024", constructionDuration: "20 months", aacBlockSize: "200mm / 250mm",
      area: "1,80,000 sq.ft", blocksUsed: "4,50,000 blocks", co2Reduction: "1,200 tonnes", energySavings: "40%",
      projectStats: { totalBlocksUsed: "4,50,000", projectArea: "1,80,000", constructionTimeSaved: "40%", co2Reduction: "1200", energySavings: "40", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Master planning", date: "November 2022", icon: "Flag" },
        { title: "Foundation", description: "Piling completed", date: "February 2023", icon: "Layers" },
        { title: "Structure", description: "All 8 units complete", date: "April 2024", icon: "Building2" },
        { title: "Completion", description: "Operational handover", date: "July 2024", icon: "CheckCircle" },
      ],
    },
  ],
  hospitals: [
    {
      id: "drl-hospital", slug: "drl-hospital", title: "DRL Multispeciality Hospital", location: "Malda, West Bengal", status: "completed", category: "hospitals",
      heroImage: "/images/features/Noise-Resistant.webp", coverImage: "/images/features/Noise-Resistant.webp",
      gallery: ["/images/features/Noise-Resistant.webp", "/images/features/fire-resistant.webp", "/images/features/Eco-Friendly.webp"],
      description: "A 200-bed multispeciality hospital constructed with Klavetek AAC blocks for fire resistance and acoustic comfort.",
      highlights: ["200 beds, 6 floors","Fire-rated walls","Acoustic comfort","Hygienic surfaces","Quick construction"],
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
      id: "city-care-hospital", slug: "city-care-hospital", title: "City Care Hospital", location: "Berhampore, West Bengal", status: "ongoing", category: "hospitals",
      heroImage: "/images/features/fire-resistant.webp", coverImage: "/images/features/fire-resistant.webp",
      gallery: ["/images/features/fire-resistant.webp", "/images/features/Noise-Resistant.webp"],
      description: "An upcoming 150-bed super-speciality hospital with Klavetek AAC blocks for safety and comfort.",
      highlights: ["150 beds, 5 floors","100mm AAC blocks","Fire-safe construction","Acoustic design","Expected 2025"],
      client: "City Care Healthcare", year: 2025, completionDate: "Expected October 2025", constructionDuration: "20 months", aacBlockSize: "100mm",
      area: "60,000 sq.ft", blocksUsed: "1,50,000 blocks", co2Reduction: "480 tonnes", energySavings: "22%",
      projectStats: { totalBlocksUsed: "1,50,000", projectArea: "60,000", constructionTimeSaved: "22%", co2Reduction: "480", energySavings: "22", completionPercentage: "55" },
      timeline: [
        { title: "Project Start", description: "Project launched", date: "February 2024", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "May 2024", icon: "Layers" },
        { title: "Structure", description: "Structure in progress", date: "Ongoing", icon: "Building2" },
        { title: "Completion", description: "Expected October 2025", date: "October 2025", icon: "CheckCircle" },
      ],
    },
  ],
  "educational-institutions": [
    {
      id: "global-school", slug: "global-school", title: "Global Knowledge School", location: "Baharampur, West Bengal", status: "completed", category: "educational-institutions",
      heroImage: "/images/features/Lightweight.webp", coverImage: "/images/features/Lightweight.webp",
      gallery: ["/images/features/Lightweight.webp", "/images/features/Eco-Friendly.webp", "/images/features/Noise-Resistant.webp"],
      description: "A K-12 international school built with Klavetek AAC blocks for safe learning.",
      highlights: ["K-12 campus, 3 buildings","Lightweight AAC structure","Acoustic classrooms","Eco-friendly","Smart ready"],
      client: "Global Education Trust", year: 2024, completionDate: "April 2024", constructionDuration: "14 months", aacBlockSize: "100mm / 125mm",
      area: "55,000 sq.ft", blocksUsed: "1,35,000 blocks", co2Reduction: "390 tonnes", energySavings: "20%",
      projectStats: { totalBlocksUsed: "1,35,000", projectArea: "55,000", constructionTimeSaved: "20%", co2Reduction: "390", energySavings: "20", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Approvals and setup", date: "February 2023", icon: "Flag" },
        { title: "Foundation", description: "Foundation completed", date: "April 2023", icon: "Layers" },
        { title: "Structure", description: "All 3 buildings raised", date: "January 2024", icon: "Building2" },
        { title: "Completion", description: "Academic session began", date: "April 2024", icon: "CheckCircle" },
      ],
    },
  ],
  warehouses: [
    {
      id: "apex-logistics-hub", slug: "apex-logistics-hub", title: "Apex Logistics Hub", location: "Dankuni, West Bengal", status: "completed", category: "warehouses",
      heroImage: "/images/features/Pest-Resistant.webp", coverImage: "/images/features/Pest-Resistant.webp",
      gallery: ["/images/features/Pest-Resistant.webp", "/images/features/Lightweight.webp", "/images/features/fire-resistant.webp"],
      description: "A 50,000 sq.ft automated warehouse with Klavetek AAC blocks for rapid construction.",
      highlights: ["50,000 sq.ft, 12m height","200mm AAC walls","Temperature zones","Fire-rated","30% faster"],
      client: "Apex Logistics Pvt. Ltd.", year: 2024, completionDate: "January 2024", constructionDuration: "12 months", aacBlockSize: "200mm",
      area: "50,000 sq.ft", blocksUsed: "95,000 blocks", co2Reduction: "310 tonnes", energySavings: "38%",
      projectStats: { totalBlocksUsed: "95,000", projectArea: "50,000", constructionTimeSaved: "30%", co2Reduction: "310", energySavings: "38", completionPercentage: "100" },
      timeline: [
        { title: "Project Start", description: "Site mobilization", date: "January 2023", icon: "Flag" },
        { title: "Foundation", description: "Raft foundation completed", date: "March 2023", icon: "Layers" },
        { title: "Structure", description: "Full structural completion", date: "August 2023", icon: "Building2" },
        { title: "Completion", description: "Operational handover", date: "January 2024", icon: "CheckCircle" },
      ],
    },
    {
      id: "cold-storage-facility", slug: "cold-storage-facility", title: "Cold Storage Facility", location: "Kalyani, West Bengal", status: "upcoming", category: "warehouses",
      heroImage: "/images/features/EnergySavingThermalInsulation.webp", coverImage: "/images/features/EnergySavingThermalInsulation.webp",
      gallery: ["/images/features/EnergySavingThermalInsulation.webp", "/images/features/Pest-Resistant.webp"],
      description: "A 30,000 sq.ft cold storage warehouse with superior thermal insulation.",
      highlights: ["30,000 sq.ft","150mm AAC blocks","Reduced refrigeration","Pest-resistant","Expected 2026"],
      client: "Cold Chain Solutions", year: 2026, completionDate: "Expected March 2026", constructionDuration: "18 months", aacBlockSize: "150mm",
      area: "30,000 sq.ft", blocksUsed: "60,000 blocks", co2Reduction: "220 tonnes", energySavings: "42%",
      projectStats: { totalBlocksUsed: "60,000", projectArea: "30,000", constructionTimeSaved: "25%", co2Reduction: "220", energySavings: "42", completionPercentage: "10" },
      timeline: [
        { title: "Project Start", description: "Planning", date: "Q3 2025", icon: "Flag" },
        { title: "Foundation", description: "Planned", date: "Q4 2025", icon: "Layers" },
        { title: "Structure", description: "Planned 2026", date: "2026", icon: "Building2" },
        { title: "Completion", description: "Expected March 2026", date: "March 2026", icon: "CheckCircle" },
      ],
    },
  ],
};

export const categoryMap: Record<string, string> = {
  "residential-buildings": "Residential Buildings",
  "commercial-buildings": "Commercial Buildings",
  "industrial-projects": "Industrial Projects",
  hospitals: "Hospitals",
  "educational-institutions": "Educational Institutions",
  warehouses: "Warehouses",
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

