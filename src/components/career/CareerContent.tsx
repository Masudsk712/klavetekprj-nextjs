
"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
 Users, Lightbulb, TrendingUp, Heart,
 Shield, Wallet, Award, BookOpen, Calendar, HardHat,
 MapPin, Briefcase, Upload, ArrowRight,
} from "lucide-react";
import { careerData } from "@/data/career";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.08, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const lifeIcons: Record<string, React.ReactNode> = {
 Users: <Users className="w-6 h-6 text-primary" />,
 Lightbulb: <Lightbulb className="w-6 h-6 text-primary" />,
 TrendingUp: <TrendingUp className="w-6 h-6 text-primary" />,
 Heart: <Heart className="w-6 h-6 text-primary" />,
};

const benefitIcons: Record<string, React.ReactNode> = {
 Shield: <Shield className="w-6 h-6 text-primary" />,
 Wallet: <Wallet className="w-6 h-6 text-primary" />,
 Award: <Award className="w-6 h-6 text-primary" />,
 BookOpen: <BookOpen className="w-6 h-6 text-primary" />,
 Calendar: <Calendar className="w-6 h-6 text-primary" />,
 HardHat: <HardHat className="w-6 h-6 text-primary" />,
};

export default function CareerContent() {
 const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
 const [fileName, setFileName] = useState<string>("");

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files && e.target.files[0]) {
 setFileName(e.target.files[0].name);
 }
 };

 return (
 <>
 {/* Life at Klavetek */}
 <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={careerData.lifeAtKlavetek.title} subtitle={careerData.lifeAtKlavetek.subtitle} />
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
 >
 {careerData.lifeAtKlavetek.features.map((feature, index) => (
 <motion.div key={feature.title} variants={itemVariants}>
 <GlassCard delay={index * 0.05} className="p-6 md:p-8 group relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/10 flex items-center justify-center mb-5">
 {lifeIcons[feature.icon]}
 </div>
 <h3 className="text-lg font-semibold text-[var(--heading)] mb-3">{feature.title}</h3>
 <p className="text-sm text-[var(--muted-text)] leading-relaxed">{feature.description}</p>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* Benefits */}
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={careerData.benefits.title} subtitle={careerData.benefits.subtitle} />
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
 >
 {careerData.benefits.items.map((item, index) => (
 <motion.div key={item.title} variants={itemVariants}>
 <GlassCard delay={index * 0.05} className="p-6 md:p-8 group relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/10 flex items-center justify-center mb-5">
 {benefitIcons[item.icon]}
 </div>
 <h3 className="text-lg font-semibold text-[var(--heading)] mb-3">{item.title}</h3>
 <p className="text-sm text-[var(--muted-text)] leading-relaxed">{item.description}</p>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* Open Positions */}
 <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={careerData.openPositions.title} subtitle={careerData.openPositions.subtitle} />
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 gap-6"
 >
 {careerData.openPositions.positions.map((position, index) => (
 <motion.div
 key={position.title}
 variants={itemVariants}
 className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
 selectedPosition === position.title
 ? "border-primary bg-primary/[0.04] shadow-[0_24px_70px_rgba(0, 0, 0,0.10)]"
 : "border-[var(--border)] bg-[var(--surface)] shadow-sm hover:shadow-[0_24px_70px_rgba(0, 0, 0,0.10)]"
 }`}
 onClick={() => setSelectedPosition(position.title)}
 >
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="text-lg font-semibold text-[var(--heading)]">{position.title}</h3>
 <span className="text-sm text-primary font-medium">{position.department}</span>
 </div>
 <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
 {position.type}
 </span>
 </div>
 <p className="text-sm text-[var(--muted-text)] mb-4 leading-relaxed">{position.description}</p>
 <div className="flex flex-wrap gap-4 text-xs text-[var(--muted-text)]">
 <span className="flex items-center gap-1">
 <MapPin className="w-3.5 h-3.5" /> {position.location}
 </span>
 <span className="flex items-center gap-1">
 <Briefcase className="w-3.5 h-3.5" /> {position.experience}
 </span>
 </div>
 {selectedPosition === position.title && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 className="mt-4 pt-4 border-t border-primary/10"
 >
 <span className="text-sm text-primary font-medium flex items-center gap-1">
 Apply for this position <ArrowRight className="w-3.5 h-3.5" />
 </span>
 </motion.div>
 )}
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* Resume Upload Form */}
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-3xl px-6 lg:px-10">
 <SectionHeader title="Submit Your Resume" subtitle="Don't see the right position? Send us your resume and we'll reach out when a matching opportunity arises." />
 <GlassCard hover={false} elevated className="p-8 md:p-10">
 <form className="space-y-5">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Full Name</label>
 <input
 type="text"
 required
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
 placeholder="John Doe"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Email</label>
 <input
 type="email"
 required
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
 placeholder="john@example.com"
 />
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Phone</label>
 <input
 type="tel"
 required
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
 placeholder="+91 XXXXX XXXXX"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Position Applied For</label>
 <input
 type="text"
 required
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
 placeholder={selectedPosition || "e.g. Production Engineer"}
 defaultValue={selectedPosition || ""}
 />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Years of Experience</label>
 <input
 type="text"
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
 placeholder="e.g. 3 years"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Upload Resume (PDF/DOC)</label>
 <div className="relative">
 <input
 type="file"
 accept=".pdf,.doc,.docx"
 onChange={handleFileChange}
 className="absolute inset-0 opacity-0 cursor-pointer"
 />
 <div className="w-full px-4 py-6 rounded-xl border-2 border-dashed border-[var(--border)] hover:border-primary flex items-center justify-center gap-2 text-[var(--muted-text)] transition-colors">
 <Upload className="w-5 h-5" />
 <span className="text-sm">{fileName || "Click to upload your resume"}</span>
 </div>
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Cover Letter (Optional)</label>
 <textarea
 rows={4}
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
 placeholder="Tell us why you'd be a great fit..."
 />
 </div>
 <motion.button
 type="submit"
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
 >
 Submit Application
 </motion.button>
 </form>
 </GlassCard>
 </div>
 </section>
 </>
 );
}
