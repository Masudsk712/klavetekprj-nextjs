"use client";

import { motion } from "framer-motion";
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
  const breadcrumb = getCategoryBreadcrumb(category);
  const lastCrumb = breadcrumb[breadcrumb.length - 1];
  breadcrumb[breadcrumb.length - 1] = { ...lastCrumb, href: `/projects/${category}/${project.slug}` };

  return (
    <section className="relative overflow-hidden pt-[90px] md:pt-[110px] lg:pt-[120px]">
      <div className="absolute inset-0 -z-20">
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.heroImage}')` }}
          initial={{ scale: 1.15 }} animate={{ scale: 1 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.7)" }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-glow/8 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heroDots.map((p) => (
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
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                {breadcrumb.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {index > 0 && <span className="text-white/40">/</span>}
                    {item.href ? <a href={item.href} className="hover:text-accent-glow transition-colors">{item.label}</a>
                      : <span className="text-white/90 font-medium">{item.label}</span>}
                  </li>
                ))}
              </ol>
            </motion.nav>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[42px] font-semibold leading-[1.1] tracking-tight text-white md:text-[52px] lg:text-[58px]"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}>
              {project.title}
              <span className="block mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent-glow rounded-full" />
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              {project.description.slice(0, 180)}...
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">{project.location}</span>
              <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">{project.area}</span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md ${
                project.status === "completed" ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-300" :
                project.status === "ongoing" ? "bg-amber-400/10 border-amber-400/30 text-amber-300" :
                "bg-sky-400/10 border-sky-400/30 text-sky-300"
              }`}>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }} className="mt-8 flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">Get Quote <ArrowRight className="w-4 h-4" /></a>
              <button className="btn-ghost text-white border-white/30 hover:border-primary hover:text-primary">
                <Download className="w-4 h-4" /> Download Brochure
              </button>
            </motion.div>
          </div>
        </Container>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
