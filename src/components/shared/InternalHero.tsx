"use client";

import { motion } from "framer-motion";
import Container from "./Container";

interface InternalHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function InternalHero({
  title,
  subtitle,
  backgroundImage,
  breadcrumb,
}: InternalHeroProps) {
  return (
    <section data-hero-section className="relative overflow-hidden pt-[90px] md:pt-[110px] lg:pt-[120px]">
      {/* Hero Background Image */}
      <div className="absolute inset-0 -z-20">
        {/* Background image with Ken Burns effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        {/* Soft wash for text readability — light in light mode, dark cinematic in dark mode */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />

        {/* Gradient overlay — light in light mode, dark cinematic in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/10 to-white/60 dark:from-black/50 dark:via-transparent dark:to-black/60" />

        {/* Light-mode only: horizontal readability wash on the content (left) side,
            fading to transparent on the right so the factory imagery stays visible. Hidden in dark mode. */}
        <div className="absolute inset-0 hero-light-overlay dark:hidden transition-opacity duration-500" />

        {/* Vignette — lighter in light mode, cinematic in dark mode */}
        <div className="absolute inset-0 hero-vignette" />

        {/* Subtle green glow accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-glow/8 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center">
        <Container>
          <div className="relative z-50 py-12 md:py-16 lg:py-20">
            {/* Breadcrumb */}
            {breadcrumb && breadcrumb.length > 0 && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-6"
              >
                <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--heading)] dark:text-white/80">
                  {breadcrumb.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {index > 0 && <span className="text-[var(--muted-text)]/60 dark:text-white/40">/</span>}
                      {item.href ? (
                        <a
                          href={item.href}
                          className="hover:text-accent-glow transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-[var(--heading)] dark:text-white/90 font-medium">
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </motion.nav>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[42px] font-semibold leading-[1.1] tracking-tight text-[var(--hero-heading)] dark:text-white md:text-[52px] lg:text-[58px]"
              style={{ textShadow: "var(--heading-shadow)" }}
            >
              {title}
              {/* Green accent line */}
              <span className="block mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent-glow rounded-full" />
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="mt-6 max-w-[650px] text-base leading-[1.75] text-[var(--hero-body)] dark:text-white/90 md:text-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}