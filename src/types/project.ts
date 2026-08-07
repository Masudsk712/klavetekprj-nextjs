export type ProjectStatus = "completed" | "ongoing" | "upcoming";

export type ProjectCategory =
  | "residential-buildings"
  | "commercial-buildings"
  | "industrial-projects"
  | "hospitals"
  | "educational-institutions"
  | "warehouses";

export interface ProjectStats {
  totalBlocksUsed: string;
  projectArea: string;
  constructionTimeSaved: string;
  co2Reduction: string;
  energySavings: string;
  completionPercentage: string;
}

export interface TimelineEvent {
  title: string;
  description: string;
  date: string;
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  status: ProjectStatus;
  category: ProjectCategory;
  heroImage: string;
  coverImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  client: string;
  year: number;
  completionDate: string;
  constructionDuration: string;
  aacBlockSize: string;
  area: string;
  blocksUsed: string;
  co2Reduction: string;
  energySavings: string;
  projectStats: ProjectStats;
  timeline: TimelineEvent[];
}

export interface CategoryInfo {
  key: ProjectCategory;
  label: string;
  description: string;
  heroImage: string;
}

export interface CategoryPageData {
  category: CategoryInfo;
  projects: Project[];
}
