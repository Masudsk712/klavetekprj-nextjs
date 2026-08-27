"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import NextImage from "next/image";
import { galleryData } from "@/data/gallery";
import { easePremium, viewportOnce } from "@/lib/animations";

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: easePremium } },
};

const categoryImages: Record<string, string> = {
  factory: "/images/features/Lightweight.webp",
  machinery: "/images/features/Eco-Friendly.webp",
  production: "/images/features/EnergySavingThermalInsulation.webp",
  projects: "/images/features/fire-resistant.webp",
  construction: "/images/features/Noise-Resistant.webp",
  videos: "/images/features/Pest-Resistant.webp",
};

export default function GalleryGrid({ initialCategory = "" }: { initialCategory?: string }) {
  const defaultCategoryId = galleryData.categories[0].id;
  const validInitialCategory = galleryData.categories.some((c) => c.id === initialCategory)
    ? initialCategory
    : defaultCategoryId;
  const [activeCategory, setActiveCategory] = useState(validInitialCategory);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const activeCategoryData = galleryData.categories.find((c) => c.id === activeCategory);
  const selectedImage = selectedImageIndex !== null ? activeCategoryData?.images[selectedImageIndex] : null;

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (!activeCategoryData || selectedImageIndex === null) return;
    setDirection(-1);
    setSelectedImageIndex((selectedImageIndex - 1 + activeCategoryData.images.length) % activeCategoryData.images.length);
  };

  const goToNext = () => {
    if (!activeCategoryData || selectedImageIndex === null) return;
    setDirection(1);
    setSelectedImageIndex((selectedImageIndex + 1) % activeCategoryData.images.length);
  };

  return (
    <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-hover/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="flex flex-wrap gap-2 mb-8"
        >
          {galleryData.categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => { setActiveCategory(category.id); setSelectedImageIndex(null); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === category.id
                  ? "bg-primary text-white border-primary shadow-[0_12px_35px_rgba(var(--primary-rgb),0.35)]"
                  : "bg-[var(--surface)] text-[var(--body-text)] border-[var(--border)] hover:border-primary/40 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
              }`}
            >
              {category.title}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-primary shadow-[0_12px_35px_rgba(var(--primary-rgb),0.35)] -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Category Description */}
        {activeCategoryData && (
          <motion.div
            key={activeCategoryData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--heading)] dark:text-white mb-2">
              {activeCategoryData.title}
            </h3>
            <p className="text-[var(--muted-text)] text-base md:text-lg max-w-3xl">
              {activeCategoryData.description}
            </p>
          </motion.div>
        )}
        {/* Image Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: easePremium }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {activeCategoryData?.images.map((image, index) => (
              <motion.div
                key={image.src}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-primary/10 bg-[var(--surface)] shadow-[0_24px_70px_rgba(0, 0, 0,0.08)] cursor-pointer hover:shadow-green dark:bg-[var(--surface)] dark:border-primary/25"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${categoryImages[activeCategory] || image.src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-5 text-left">
                  <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 backdrop-blur-xl flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mb-2"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    {image.isVideo ? (
                      <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" />
                    ) : (
                      <Image className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    )}
                  </motion.div>
                  <p className="text-white text-sm md:text-base font-semibold">{image.title}</p>
                  {image.alt && <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{image.alt}</p>}
                </div>

                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.div>

                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeLightbox();
                else if (e.key === "ArrowLeft") { e.preventDefault(); goToPrevious(); }
                else if (e.key === "ArrowRight") { e.preventDefault(); goToNext(); }
              }}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={`Image viewer: ${selectedImage.title}`}
              className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer lg:p-8"
            >
              <motion.div
                key={selectedImageIndex}
                initial={{ scale: 0.95, opacity: 0, x: direction * 30 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-6xl w-full aspect-video md:aspect-[16/9] rounded-3xl overflow-hidden bg-black shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
              >
                {/* ACTUAL SELECTED IMAGE - the fix (was a gradient + icon placeholder) */}
                <NextImage
                  src={selectedImage.src}
                  alt={selectedImage.alt || selectedImage.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />

                {/* Subtle bottom scrim so the title/counter stay legible over any image */}
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">{selectedImage.title}</h3>
                  {selectedImage.alt && <p className="text-white/70 text-sm">{selectedImage.alt}</p>}
                </div>

                {/* Play badge for video entries (image still shown underneath) */}
                {selectedImage.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.span
                      className="flex h-16 w-16 rounded-full bg-white/15 backdrop-blur-md items-center justify-center border border-white/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <Play className="w-7 h-7 text-white ml-0.5" />
                    </motion.span>
                  </div>
                )}
                {/* Close button */}
                <motion.button
                  autoFocus
                  onClick={closeLightbox}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close image viewer"
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>

                {/* Navigation arrows */}
                {activeCategoryData && activeCategoryData.images.length > 1 && (
                  <>
                    <motion.button
                      onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </motion.button>

                    <motion.button
                      onClick={(e) => { e.stopPropagation(); goToNext(); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </motion.button>
                  </>
                )}

                {/* Image counter */}
                {activeCategoryData && (
                  <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <span className="text-white text-sm font-medium">
                      {selectedImageIndex + 1} / {activeCategoryData.images.length}
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}