"use client";

import { motion } from "framer-motion";
import { Flag, Layers, Building2, CheckCircle } from "lucide-react";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";
import type { TimelineEvent } from "@/types/project";

interface ProjectTimelineProps {
  events: TimelineEvent[];
}

const iconMap: Record<string, React.ElementType> = { Flag, Layers, Building2, CheckCircle };

export default function ProjectTimeline({ events }: ProjectTimelineProps) {
  return (
    <section className="py-20 md:py-28 bg-[var(--secondary-bg)]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-3xl md:text-4xl font-bold text-center text-[var(--heading)] dark:text-white mb-4"
        >
          Project Timeline
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center text-[var(--muted-text)] dark:text-white/60 mb-16"
        >
          Key milestones in the construction journey.
        </motion.p>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-12"
          >
            {events.map((event, index) => {
              const Icon = iconMap[event.icon] || CheckCircle;
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  variants={{ hidden: { opacity: 0, x: isLeft ? -30 : 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easePremium } } }}
                  className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl p-6 shadow-card hover:shadow-green transition-all duration-500">
                      <div className="flex items-center gap-3 mb-2 ${isLeft ? 'md:justify-end' : ''}">
                        <Icon className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold text-[var(--heading)] dark:text-white">{event.title}</h3>
                      </div>
                      <p className="text-sm text-[var(--muted-text)] dark:text-white/60">{event.description}</p>
                      <span className="inline-block mt-3 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {event.date}
                      </span>
                    </div>
                  </div>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-green z-10">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
