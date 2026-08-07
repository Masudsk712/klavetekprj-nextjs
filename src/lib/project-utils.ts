import type { Project, ProjectCategory } from "@/types/project";
import { categoryMap } from "@/data/projects";

export function formatCategoryLabel(category: string): string {
  return categoryMap[category] || category;
}

export function getCategoryBreadcrumb(category: string) {
  return [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: formatCategoryLabel(category) },
  ];
}

export function getProjectBreadcrumb(category: string, project: Project) {
  return [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: formatCategoryLabel(category), href: `/projects/${category}` },
    { label: project.title },
  ];
}

export function getStatusLabel(status: Project["status"]): string {
  const labels: Record<string, string> = {
    completed: "Completed",
    ongoing: "Ongoing",
    upcoming: "Upcoming",
  };
  return labels[status] || status;
}

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

