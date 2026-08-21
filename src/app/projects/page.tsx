import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCTA from "@/components/projects/ProjectCTA";
import { categories, getAllProjects } from "@/data/projects";


import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Our Projects | Klavetek Green Blocks & Tiles",
  description:
    "Explore Klavetek's premium project showcase - residential, commercial, industrial, hospitals, educational institutions, and warehouses built with AAC blocks.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <>
      <section data-hero-section className="relative pt-[90px] md:pt-[110px] lg:pt-[120px] overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/features/Eco-Friendly.webp')" }} />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-white/60 dark:from-black/50 dark:via-transparent dark:to-black/70" />
          <div className="absolute inset-0 hero-light-overlay dark:hidden transition-opacity duration-500" />
          <div className="absolute inset-0 hero-vignette" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-glow/8 rounded-full blur-3xl pointer-events-none" />
        </div>
        <Container>
          <div className="relative z-10 py-16 md:py-24 text-center">
            <h1 className="text-[42px] md:text-[52px] lg:text-[58px] font-bold tracking-tight text-[var(--hero-heading)] dark:text-white"
              style={{ textShadow: "var(--heading-shadow)" }}>
              Our Projects
              <span className="block mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent-glow rounded-full mx-auto" />
            </h1>
            <p className="mt-6 text-base md:text-lg text-[var(--hero-body)] dark:text-white/80 max-w-2xl mx-auto leading-relaxed">
              Explore our portfolio of premium structures built with Klavetek AAC blocks.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link
              href="/projects"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent-glow text-sm font-semibold text-white shadow-green"
            >
              All
            </Link>
            {categories.map((cat, i) => (
              <a
                key={cat.key}
                href={`/projects/${cat.key}`}
                className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-md text-sm font-semibold text-[var(--heading)] dark:text-white hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-green"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <SectionHeader title="All Projects" subtitle="Browse our complete portfolio of construction projects." />
          <ProjectsClient projects={allProjects} />
        </Container>
      </section>

      <ProjectCTA />
    </>
  );
}
