"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

interface TeamMemberCardProps {
  member: {
    id: string;
    name: string;
    position: string;
    department: string;
    experience: string;
    bio: string;
    responsibilities: string[];
    image: string;
    linkedin?: string;
  };
  onSelect: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function TeamMemberCard({
  member,
  onSelect,
}: TeamMemberCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      className="group/vertical"
      onClick={onSelect}
    >
      {/* Portrait image frame */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm transition-all duration-500 hover:shadow-card-hover"
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
          style={{ objectPosition: "center 40%" }}
        />
        {/* Subtle dark gradient overlay on hover */}
        <motion.div
          whileHover={{
            opacity: 0.6,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />
        {/* Green ambient glow when hovered */}
        <motion.div
          whileHover={{
            boxShadow: "0 0 40px rgba(22, 163, 74, 0.15)",
            transition: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </motion.div>

      {/* Card lift and info on hover */}
      <motion.div
        whileHover={{ y: -6, scale: 1.008 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative pt-6 pb-4 transition-all duration-300"
      >
        <div className="text-center">
          <div className="text-lg font-semibold text-[var(--heading)] dark:text-white">
            {member.name}
          </div>
          <div className="mt-1 text-sm text-[var(--muted-text)] dark:text-white/70">
            {member.position}
          </div>
          <div className="mt-0.5">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary/60 dark:text-primary/40">
              {member.department}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xs font-medium tracking-[0.1em] text-gray-600 dark:text-gray-400">
              {member.experience}
            </span>
          </div>
        </div>

        {/* "View Profile" indicator - slides up on hover */}
        <motion.div
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-widest transition-all duration-300 group-hover:text-primary group-hover:translate-y-[-10px]"
        >
          {"View Profile"}
          <svg
            className="inline-block mt-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-[-4px]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.div>
      </motion.div>
      {/* Accessibility: card is clickable */}
      <button className="sr-only" aria-label={`View ${member.name}'s profile`} tabIndex={-1}>
        View {member.name}&apos;s profile
      </button>
    </motion.div>
  );
}