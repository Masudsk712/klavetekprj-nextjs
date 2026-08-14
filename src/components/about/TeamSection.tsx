"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import { managingDirector, teamMembers, type TeamMember } from "@/data/team";
import { easePremium, viewportOnce } from "@/lib/animations";
import TeamMemberCard from "@/components/about/TeamMemberCard";
import TeamProfileModal from "@/components/about/TeamProfileModal";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easePremium } },
};

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-24 text-[var(--heading)] md:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-accent-glow/8 blur-[110px]" />

      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <span className="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Established in 2020
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.08, duration: 0.75, ease: easePremium }}
            className="mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            The People Behind Klavetek
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.16, duration: 0.7, ease: easePremium }}
            className="mt-5 text-base leading-relaxed text-[var(--muted-text)] md:text-lg"
          >
            Engineers, technicians, operators and support teams who build with precision.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easePremium }}
          className="group relative mb-16 overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm md:mb-20"
        >
          <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-radial from-primary/15 to-transparent blur-[60px]" />
          <div className="grid grid-cols-1 items-center md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-[480px]">
              <Image
                src={managingDirector.image}
                alt={managingDirector.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                style={{ objectPosition: "center 20%" }}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="p-8 md:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                A Message From Our Managing Director
              </span>
              <h3 className="mt-4 text-2xl font-bold md:text-3xl">{managingDirector.name}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-primary/80">
                {managingDirector.position}
              </p>
              <p className="mt-4 max-w-md text-[var(--muted-text)]">{managingDirector.bio}</p>
              <button
                onClick={() => setSelectedMember(managingDirector)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
              >
                View Full Profile
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {teamMembers.map((m) => (
            <motion.div key={m.id} variants={reveal}>
              <TeamMemberCard member={m} onSelect={() => setSelectedMember(m)} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center md:mt-24">
          <Link href="/career" className="group inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-8 py-3.5 text-sm font-semibold text-[var(--body-text)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary">
            Explore Careers at Klavetek
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>

      <TeamProfileModal
        open={selectedMember !== null}
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}