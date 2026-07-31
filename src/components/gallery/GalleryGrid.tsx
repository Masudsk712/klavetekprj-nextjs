"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Play, X } from "lucide-react";
import { galleryData } from "@/data/gallery";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.08, delayChildren: 0.05 },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function GalleryGrid() {
 const [activeCategory, setActiveCategory] = useState(galleryData.categories[0].id);
 const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string; isVideo?: boolean } | null>(null);

 const activeCategoryData = galleryData.categories.find((c) => c.id === activeCategory);

 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 {/* Category Tabs */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={viewportOnce}
 className="flex flex-wrap gap-2 mb-6"
 >
 {galleryData.categories.map((category) => (
 <motion.button
 key={category.id}
 onClick={() => setActiveCategory(category.id)}
 whileHover={{ scale: 1.04 }}
 whileTap={{ scale: 0.96 }}
 transition={{ type: "spring", stiffness: 350, damping: 20 }}
 className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
 activeCategory === category.id
 ? "bg-primary text-white border-primary shadow-[0_12px_35px_rgba(var(--primary-rgb),0.35)]"
 : "bg-[var(--surface)] text-[var(--body-text)] border-[var(--border)] hover:border-primary/40 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
 }`}
 >
 {category.title}
 </motion.button>
 ))}
 </motion.div>

 {/* Category Description */}
 {activeCategoryData && (
 <motion.p
 key={activeCategoryData.id}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="text-[var(--muted-text)] mb-8"
 >
 {activeCategoryData.description}
 </motion.p>
 )}

 {/* Image Grid */}
 <AnimatePresence mode="wait">
 <motion.div
 key={activeCategory}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: 0.35, ease: easePremium }}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
 >
 {activeCategoryData?.images.map((image, index) => (
 <motion.div
 key={image.src}
 variants={itemVariants}
 whileHover={{ y: -6, scale: 1.02 }}
 transition={{ type: "spring", stiffness: 350, damping: 20 }}
 onClick={() => setSelectedImage(image)}
 className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-primary/10 bg-[var(--surface)] shadow-[0_24px_70px_rgba(0, 0, 0,0.08)] cursor-pointer"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-hover/5 transition-transform duration-700 group-hover:scale-105" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
 <div className="absolute inset-0 flex items-center justify-center">
 {image.isVideo ? (
 <div className="w-16 h-16 rounded-full bg-[var(--surface)]/90 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
 <Play className="w-6 h-6 text-primary ml-0.5" />
 </div>
 ) : (
 <div className="w-12 h-12 rounded-2xl bg-[var(--surface)]/90 backdrop-blur-md flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
 <Image className="w-6 h-6 text-primary" />
 </div>
 )}
 </div>
 <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
 <span className="text-white text-sm font-medium">{image.title}</span>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </AnimatePresence>

 {/* Lightbox */}
 <AnimatePresence>
 {selectedImage && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setSelectedImage(null)}
 className="fixed inset-0 z-[2000] bg-black/80 flex items-center justify-center p-4 cursor-pointer"
 >
 <motion.div
 initial={{ scale: 0.9 }}
 animate={{ scale: 1 }}
 exit={{ scale: 0.9 }}
 onClick={(e) => e.stopPropagation()}
 className="relative max-w-3xl w-full aspect-video rounded-3xl overflow-hidden bg-[var(--secondary-bg)]"
 >
 <div className="absolute inset-0 flex items-center justify-center">
 {selectedImage.isVideo ? (
 <Play className="w-20 h-20 text-white/80" />
 ) : (
 <Image className="w-20 h-20 text-white/40" />
 )}
 </div>
 <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80">
 <h3 className="text-white text-lg font-semibold">{selectedImage.title}</h3>
 </div>
 <button
 onClick={() => setSelectedImage(null)}
 className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--surface-2)]/10 flex items-center justify-center hover:bg-[var(--surface-2)]/20 transition-colors"
 >
 <X className="w-5 h-5 text-white" />
 </button>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </section>
 );
}
