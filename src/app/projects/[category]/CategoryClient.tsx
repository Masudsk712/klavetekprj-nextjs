"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectFilter from "@/components/projects/ProjectFilter";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/types/project";
import { staggerContainerFast } from "@/lib/animations";

interface CategoryClientProps {
  projects: Project[];
}

type FilterTab = "all" | "completed" | "ongoing" | "upcoming";

export default function CategoryClient({ projects }: CategoryClientProps) {
  const [filter, setFilter] = useState<FilterTab>("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <>
      <div className="mb-10">
        <ProjectFilter active={filter} onChange={setFilter} />
      </div>
      <motion.div layout variants={staggerContainerFast} initial="hidden" animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </motion.div>
      {filtered.length === 0 && (
        <p className="text-center text-[var(--muted-text)] py-12">No projects found for this filter.</p>
      )}
    </>
  );
}
