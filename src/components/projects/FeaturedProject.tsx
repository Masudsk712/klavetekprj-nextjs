"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ChevronRight as ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/project";

interface FeaturedProjectProps {
  project: Project;
  related: Project[];
}

export default function FeaturedProject({ project, related }: FeaturedProjectProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = project.gallery.length > 0 ? project.gallery : [project.coverImage];

  const next = useCallback(() => setCurrentSlide((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrentSlide((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-[var(--heading)] dark:text-white mb-16">
          Featured Showcase
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative rounded-[24px] overflow-hidden aspect-[4/3] group"
            onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                <Image src={images[currentSlide]} alt={`${project.title}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"><ChevronRight className="w-5 h-5" /></button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white w-8" : "bg-white/40 hover:bg-white/70"}`} />
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Featured Project</span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-[var(--heading)] dark:text-white">{project.title}</h3>
              <p className="mt-3 text-[var(--muted-text)] dark:text-white/60 leading-relaxed">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Location", value: project.location },
                { label: "Status", value: project.status.charAt(0).toUpperCase() + project.status.slice(1) },
                { label: "Area", value: project.area },
                { label: "Duration", value: project.constructionDuration },
                { label: "Client", value: project.client },
                { label: "Blocks", value: project.blocksUsed },
              ].map((item, i) => (
                <div key={i} className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)]/60 p-4">
                  <p className="text-xs text-[var(--muted-text)] dark:text-white/50 mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-[var(--heading)] dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--heading)] dark:text-white mb-3">Highlights</h4>
              <ul className="space-y-2">
                {project.highlights.slice(0, 4).map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-text)] dark:text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />{h}
                  </li>
                ))}
              </ul>
            </div>

            <Link href={`/projects/${project.category}/${project.slug}`} className="inline-flex items-center gap-2 btn-primary">
              View Full Project <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
