import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHero from "@/components/projects/ProjectHero";
import FeaturedProject from "@/components/projects/FeaturedProject";
import ProjectStats from "@/components/projects/ProjectStats";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectTimeline from "@/components/projects/ProjectTimeline";
import RelatedProjects from "@/components/projects/RelatedProjects";
import {
  getProjectBySlug,
  getRelatedProjects,
  formatCategoryLabel,
} from "@/data/projects";
import Script from "next/script";
import { company } from "@/constants/company";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const { projects } = await import("@/data/projects");
  const params: { category: string; slug: string }[] = [];
  for (const [category, list] of Object.entries(projects)) {
    for (const project of list) {
      params.push({ category, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const project = getProjectBySlug(category, slug);
  if (!project) return { title: "Project Not Found" };

  const categoryLabel = formatCategoryLabel(category);

  return {
    title: `${project.title} - ${categoryLabel} | Klavetek Green Blocks & Tiles`,
    description: project.description,
    alternates: { canonical: `/projects/${category}/${slug}` },
    openGraph: {
      title: `${project.title} | Klavetek`,
      description: project.description,
      images: [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Klavetek`,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const project = getProjectBySlug(category, slug);
  if (!project) notFound();

  const related = getRelatedProjects(project, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kgbt.in/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://kgbt.in/projects" },
      { "@type": "ListItem", position: 3, name: formatCategoryLabel(category), item: `https://kgbt.in/projects/${category}` },
      { "@type": "ListItem", position: 4, name: project.title },
    ],
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.description,
    location: { "@type": "Place", name: project.location },
    client: { "@type": "Organization", name: project.client },
    completionDate: project.completionDate,
    image: project.coverImage,
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <ProjectHero project={project} category={category} />

      <FeaturedProject project={project} related={related} />

      <ProjectStats stats={project.projectStats} />

      <ProjectGallery images={project.gallery} title={project.title} />

      <ProjectTimeline events={project.timeline} />

      <RelatedProjects projects={related} />
    </>
  );
}
