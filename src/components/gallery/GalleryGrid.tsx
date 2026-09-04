"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import NextImage from "next/image";
import { allGalleryImages, galleryData, type GalleryCategory, type GalleryItem } from "@/data/gallery";
import { easePremium, viewportOnce } from "@/lib/animations";

const ALL_ID = "all";
const VIDEOS_ID = "videos";

const tabs = [
  {
    id: ALL_ID,
    title: "All",
    description:
      "Every corner of the Klavetek facility — production, machinery, quality testing, finished blocks and delivery.",
  },
  ...galleryData.categories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
  })),
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: easePremium } },
};

const GRID_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw";

export default function GalleryGrid({ initialCategory = "" }: { initialCategory?: string }) {
  const validInitialCategory = tabs.some((tab) => tab.id === initialCategory)
    ? initialCategory
    : ALL_ID;
  const [activeCategory, setActiveCategory] = useState(validInitialCategory);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const activeTab = tabs.find((tab) => tab.id === activeCategory) ?? tabs[0];

  // Collections currently rendered — "All" shows every photo collection in order.
  const sections: GalleryCategory[] =
    activeCategory === ALL_ID
      ? galleryData.categories.filter((category) => category.id !== VIDEOS_ID)
      : [
          galleryData.categories.find((category) => category.id === activeCategory) ??
            galleryData.categories[0],
        ];

  // Flat list the lightbox navigates — matches the rendered section order.
  const lightboxList: GalleryItem[] =
    activeCategory === ALL_ID ? allGalleryImages : sections[0].images;

  const selectedImage = lightboxIndex !== null ? lightboxList[lightboxIndex] : undefined;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + lightboxList.length) % lightboxList.length
    );
  }, [lightboxList.length]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % lightboxList.length
    );
  }, [lightboxList.length]);

  // Keyboard navigation (Esc / ← / →) + background scroll lock while open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };
    window.addEventListener("keydown", handler);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, closeLightbox, goToPrevious, goToNext]);

  // Flat index of each section's first image so lightbox navigation in
  // "All" mode follows the exact rendered order.
  let runningOffset = 0;
  const sectionsWithOffset = sections.map((category) => {
    const entry = { category, offset: runningOffset };
    runningOffset += category.images.length;
    return entry;
  });

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
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setLightboxIndex(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-pressed={activeCategory === tab.id}
              className={`relative px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === tab.id
                  ? "bg-primary text-white border-primary shadow-[0_12px_35px_rgba(22,163,74,0.35)]"
                  : "bg-[var(--surface)] text-[var(--body-text)] border-[var(--border)] hover:border-primary/40 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
              }`}
            >
              {tab.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Active collection description */}
        <motion.div
          key={activeTab.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easePremium }}
          className="text-center mb-12 md:mb-14"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--heading)] dark:text-white mb-2">
            {activeTab.title}
          </h3>
          <p className="text-[var(--muted-text)] text-base md:text-lg max-w-3xl mx-auto">
            {activeTab.description}
          </p>
          {activeCategory === ALL_ID && (
            <p className="text-sm text-[var(--muted-text)] mt-2">
              Showing {allGalleryImages.length} photos across {sections.length} collections — click
              any photo to view it full screen.
            </p>
          )}
        </motion.div>
        {sectionsWithOffset.map(({ category, offset }, sectionIndex) => (
          <div key={category.id} className="mb-16 last:mb-0">
            {activeCategory === ALL_ID && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                className="flex items-center gap-4 mb-6"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <h4 className="text-xl md:text-2xl font-bold text-[var(--heading)] dark:text-white whitespace-nowrap">
                    {category.title}
                  </h4>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                    {category.images.length} {category.images.length === 1 ? "photo" : "photos"}
                  </span>
                </div>
                <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </motion.div>
            )}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {category.images.map((image, index) => (
                <motion.button
                  key={image.src}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  onClick={() => setLightboxIndex(offset + index)}
                  aria-label={`Open ${image.title} in full screen viewer`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-primary/10 dark:border-primary/25 bg-[var(--surface)] text-left cursor-pointer shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500 hover:shadow-[0_24px_70px_rgba(22,163,74,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--secondary-bg)]"
                >
                  <NextImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={85}
                    sizes={GRID_SIZES}
                    priority={sectionIndex === 0 && index < 4}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {activeCategory === ALL_ID && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-medium">
                      {category.title}
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-white text-sm md:text-base font-semibold truncate">
                          {image.title}
                        </p>
                        <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{image.alt}</p>
                      </div>
                      <span className="shrink-0 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        {image.isVideo ? (
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        ) : (
                          <Expand className="w-4 h-4 text-white" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        ))}

        {/* Explore more — internal links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easePremium }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-[0_12px_35px_rgba(22,163,74,0.35)] hover:bg-primary-hover transition-colors"
          >
            <span>Buildings Built With Klavetek</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--surface)] border border-primary/30 text-[var(--body-text)] font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            <span>Explore Our AAC Blocks</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`Image viewer: ${selectedImage.title}`}
              className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            >
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, x: direction * 80, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -80, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                onClick={(event) => event.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) goToNext();
                  else if (info.offset.x > 80) goToPrevious();
                }}
                className="relative w-full max-w-6xl h-[74vh] md:h-[80vh] cursor-default"
              >
                {selectedImage.videoSrc ? (
                  <video
                    key={selectedImage.src}
                    src={selectedImage.videoSrc}
                    poster={selectedImage.poster || selectedImage.src}
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full rounded-3xl object-contain bg-black shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
                  />
                ) : (
                  <NextImage
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    quality={90}
                    sizes="100vw"
                    priority
                    className="object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
                  />
                )}

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 rounded-b-3xl bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none">
                  <h3 className="text-white text-lg md:text-2xl font-bold mb-0.5">
                    {selectedImage.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm line-clamp-2">{selectedImage.alt}</p>
                </div>
              </motion.div>

              {/* Close button */}
              <motion.button
                autoFocus
                onClick={closeLightbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close image viewer"
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Navigation arrows */}
              {lightboxList.length > 1 && (
                <>
                  <motion.button
                    onClick={(event) => {
                      event.stopPropagation();
                      goToPrevious();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous image"
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </motion.button>

                  <motion.button
                    onClick={(event) => {
                      event.stopPropagation();
                      goToNext();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next image"
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </motion.button>
                </>
              )}

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/55 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-white text-sm font-medium">
                  {lightboxIndex + 1} / {lightboxList.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}