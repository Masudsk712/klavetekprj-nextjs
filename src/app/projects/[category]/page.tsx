import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCTA from "@/components/projects/ProjectCTA";
import {
  categories,
  getProjectsByCategory,
  getCategoryInfo,
} from "@/data/projects";
import { motion } from "framer-motion";
import CategoryClient from "./CategoryClient";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryInfo(category);
  if (!cat) return { title: "Projects Not Found" };
  return {
    title: `${cat.label} Projects | Klavetek Green Blocks & Tiles`,
    description: cat.description,
    alternates: { canonical: `/projects/${category}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const info = getCategoryInfo(category);
  if (!info) notFound();

  const allProjects = getProjectsByCategory(category);

  return (
    <>
      <section className="relative pt-[90px] md:pt-[110px] lg:pt-[120px] overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${info.heroImage}')` }} />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <Container>
          <div className="relative z-10 py-16 md:py-24 text-center">
            <h1 className="text-[42px] md:text-[52px] lg:text-[58px] font-bold tracking-tight text-white"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}>
              {info.label}
              <span className="block mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent-glow rounded-full mx-auto" />
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              {info.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader title={info.label} subtitle={info.description} />
          <CategoryClient projects={allProjects} />
        </Container>
      </section>

      <ProjectCTA />
    </>
  );
}
