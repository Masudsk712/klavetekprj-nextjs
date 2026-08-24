"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Ruler } from "lucide-react";
import type { Project } from "@/types/project";
import { statusColor } from "@/data/projects";
import { easePremium, viewportOnce } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: easePremium, delay: index * 0.08 },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative rounded-[20px] border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl overflow-hidden shadow-card hover:shadow-green transition-all duration-500"
    >
      <Link href={`/projects/${project.category}/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${statusColor(project.status)}`}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
              View Project <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-[var(--heading)] dark:text-white mb-2 line-clamp-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-[var(--muted-text)] dark:text-white/60">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5" /> {project.area}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold">
            Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
