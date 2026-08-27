"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/shared/Container";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { getCategoryBreadcrumb } from "@/lib/project-utils";
import type { Project } from "@/types/project";

// Deterministic (seeded) pseudo-random values so server & client render identical particles
const heroDots = (() => {
  let seed = 20240117;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    drift: -20 + rand() * 40,
    duration: 6 + rand() * 8,
    delay: rand() * 4,
  }));
})();

interface ProjectHeroProps {
  project: Project;
  category: string;
}

export default function ProjectHero({ project, category }: ProjectHeroProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const breadcrumb = getCategoryBreadcrumb(category);
  const lastCrumb = breadcrumb[breadcrumb.length - 1];
  breadcrumb[breadcrumb.length - 1] = { ...lastCrumb, href: `/projects/${category}/${project.slug}` };

  return (
    <section className="relative overflow-hidden pt-[90px] md:pt-[110px] lg:pt-[120px]">
      <div className="absolute inset-0 -z-20">
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.heroImage}')` }}
          initial={{ scale: 1.15 }} animate={{ scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/10 to-white/60 dark:from-black/50 dark:via-transparent dark:to-black/60" />
        <div className="absolute inset-0 hero-light-overlay dark:hidden transition-opacity duration-500" />
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-glow/8 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!reduceMotion && heroDots.map((p) => (
          <motion.div key={p.id} className="absolute w-1 h-1 bg-primary/40 rounded-full"
            initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
            animate={{ y: [null, `${p.y + p.drift}%`], opacity: [0, 0.6, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-20 flex items-center">
        <Container>
          <div className="relative z-50 py-12 md:py-16 lg:py-20">
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }} className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--heading)] dark:text-white/80">
                {breadcrumb.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {index > 0 && <span className="text-[var(--muted-text)]/60 dark:text-white/40">/</span>}
                    {item.href ? <a href={item.href} className="hover:text-accent-glow transition-colors">{item.label}</a>
                      : <span className="text-[var(--heading)] dark:text-white/90 font-medium">{item.label}</span>}
                  </li>
                ))}
              </ol>
            </motion.nav>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[42px] font-semibold leading-[1.1] tracking-tight text-[var(--heading)] dark:text-white md:text-[52px] lg:text-[58px]"
              style={{ textShadow: "var(--heading-shadow)" }}>
              {project.title}
              <span className="block mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent-glow rounded-full" />
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-[var(--body-text)] dark:text-white/80 max-w-2xl leading-relaxed">
              {project.description.slice(0, 180)}...
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-black/5 backdrop-blur-md border border-[var(--border)] text-black dark:bg-white/10 dark:border-white/20 dark:text-white text-sm font-medium">{project.location}</span>
              <span className="px-4 py-2 rounded-full bg-black/5 backdrop-blur-md border border-[var(--border)] text-black dark:bg-white/10 dark:border-white/20 dark:text-white text-sm font-medium">{project.area}</span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md ${
                project.status === "completed" ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-600 dark:text-emerald-300" :
                project.status === "ongoing" ? "bg-amber-400/10 border-amber-400/30 text-amber-600 dark:text-amber-300" :
                "bg-sky-400/10 border-sky-400/30 text-sky-600 dark:text-sky-300"
              }`}>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }} className="mt-8 flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">Get Quote <ArrowRight className="w-4 h-4" /></a>
              <a
                href="/Klavetek-EBrochure-2022-23.pdf"
                download="Klavetek-AAC-Blocks-Brochure.pdf"
                aria-label="Download Klavetek brochure"
                className="btn-ghost text-black dark:text-white border-black/20 dark:border-white/30 hover:border-primary hover:text-primary"
              >
                <Download className="w-4 h-4" /> Download Brochure
              </a>
            </motion.div>
          </div>
        </Container>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={reduceMotion ? undefined : { y: [0, 8, 0] }} transition={reduceMotion ? undefined : { duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[var(--muted-text)] dark:text-white/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
