"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/project";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

interface RelatedProjectsProps {
  projects: Project[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects.length) return null;

  return (
    <section className="py-20 md:py-28 bg-[var(--secondary-bg)]/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-3xl md:text-4xl font-bold text-center text-[var(--heading)] dark:text-white mb-4"
        >
          Related Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center text-[var(--muted-text)] dark:text-white/60 mb-16"
        >
          More projects in this category.
        </motion.p>

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mt-12 text-center"
        >
          <Link href="/projects" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
