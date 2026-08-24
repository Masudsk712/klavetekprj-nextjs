"use client";

import { useState, useRef, type FormEvent, type ChangeEvent, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Users, Lightbulb, TrendingUp, Heart,
  Shield, Wallet, Award, BookOpen, Calendar, HardHat,
  MapPin, Briefcase, Upload, ArrowRight, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import { careerData } from "@/data/career";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce } from "@/lib/animations";

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

const lifeIcons: Record<string, ReactNode> = {
  Users: <Users className="w-6 h-6 text-primary" />,
  Lightbulb: <Lightbulb className="w-6 h-6 text-primary" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-primary" />,
  Heart: <Heart className="w-6 h-6 text-primary" />,
};

const benefitIcons: Record<string, ReactNode> = {
  Shield: <Shield className="w-6 h-6 text-primary" />,
  Wallet: <Wallet className="w-6 h-6 text-primary" />,
  Award: <Award className="w-6 h-6 text-primary" />,
  BookOpen: <BookOpen className="w-6 h-6 text-primary" />,
  Calendar: <Calendar className="w-6 h-6 text-primary" />,
  HardHat: <HardHat className="w-6 h-6 text-primary" />,
};
interface CareerFormState {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
}

const EMPTY_FORM: CareerFormState = {
  name: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  message: "",
};

interface CareerFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  experience?: string;
  resume?: string;
  message?: string;
}

export default function CareerContent() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<CareerFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<CareerFormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof CareerFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status !== "idle") { setStatus("idle"); setStatusMessage(""); }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setFileName(selected ? selected.name : "");
    setErrors((prev) => ({ ...prev, resume: undefined }));
    if (status !== "idle") { setStatus("idle"); setStatusMessage(""); }
  };

  const selectPosition = (title: string) => {
    setSelectedPosition(title);
    setForm((prev) => ({ ...prev, position: title }));
    setErrors((prev) => ({ ...prev, position: undefined }));
  };

  const validate = (values: CareerFormState, resume: File | null): CareerFormErrors => {
    const next: CareerFormErrors = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    else if (values.name.trim().length > 120) next.name = "Name is too long.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.phone.trim()) next.phone = "Please enter your phone number.";
    else if (!/^[0-9+\-()\s]{7,30}$/.test(values.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!values.position.trim()) next.position = "Please state the position you are applying for.";
    else if (values.position.trim().length > 120) next.position = "Position is too long.";
    if (values.experience.length > 100) next.experience = "Experience value is too long.";

    if (!resume) {
      next.resume = "Please upload your resume.";
    } else {
      const ext = resume.name.split(".").pop()?.toLowerCase() ?? "";
      if (!["pdf", "doc", "docx"].includes(ext)) {
        next.resume = "Resume must be a PDF, DOC or DOCX file.";
      } else if (resume.size > 5 * 1024 * 1024) {
        next.resume = "Resume must be 5 MB or smaller.";
      }
    }
    return next;
  };

  const focusField = (key: string) => {
    if (key === "resume") { fileInputRef.current?.focus(); return; }
    document.querySelector<HTMLElement>(`[data-career-field="${key}"]`)?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate(form, file);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusField(Object.keys(nextErrors)[0] ?? "");
      return;
    }

    setStatus("sending");
    setStatusMessage("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("position", form.position);
      fd.append("experience", form.experience);
      fd.append("message", form.message);
      if (file) fd.append("resume", file);

      const res = await fetch("/api/career", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage("Your application has been submitted successfully.");
        setForm(EMPTY_FORM);
        setFile(null);
        setFileName("");
        setSelectedPosition(null);
      } else {
        setStatus("error");
        setStatusMessage(typeof data.message === "string" ? data.message : "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    }
  };

  const inputClass = (invalid?: string) =>
    `w-full px-4 py-3 rounded-xl border ${invalid ? "border-red-500 focus:border-red-500" : "border-[var(--border)] focus:border-primary"} focus:ring-2 ${invalid ? "focus:ring-red-500/20" : "focus:ring-primary/20"} outline-none transition-all`;

  return (
    <>
      {/* Life at Klavetek */}
      <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader title={careerData.lifeAtKlavetek.title} subtitle={careerData.lifeAtKlavetek.subtitle} />
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerData.lifeAtKlavetek.features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <GlassCard className="p-6 md:p-8 group relative overflow-hidden">
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
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerData.benefits.items.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <GlassCard className="p-6 md:p-8 group relative overflow-hidden">
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
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerData.openPositions.positions.map((position) => (
              <motion.div
                key={position.title}
                variants={itemVariants}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedPosition === position.title
                    ? "border-primary bg-primary/[0.04] shadow-[0_24px_70px_rgba(0, 0, 0,0.10)]"
                    : "border-[var(--border)] bg-[var(--surface)] shadow-sm hover:shadow-[0_24px_70px_rgba(0, 0, 0,0.10)]"
                }`}
                onClick={() => selectPosition(position.title)}
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
            {status === "success" && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} role="status"
                className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300 mb-6">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                {statusMessage}
              </motion.div>
            )}
            {status === "error" && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} role="alert"
                className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300 mb-6">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {statusMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="career-name" className="block text-sm font-medium text-[var(--body-text)] mb-2">Full Name *</label>
                  <input id="career-name" name="name" type="text" required
                    value={form.name} onChange={(e) => updateField("name", e.target.value)}
                    data-career-field="name" aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "career-name-error" : undefined}
                    className={inputClass(errors.name)} placeholder="John Doe" />
                  {errors.name && <p id="career-name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="career-email" className="block text-sm font-medium text-[var(--body-text)] mb-2">Email *</label>
                  <input id="career-email" name="email" type="email" required
                    value={form.email} onChange={(e) => updateField("email", e.target.value)}
                    data-career-field="email" aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "career-email-error" : undefined}
                    className={inputClass(errors.email)} placeholder="john@example.com" />
                  {errors.email && <p id="career-email-error" className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="career-phone" className="block text-sm font-medium text-[var(--body-text)] mb-2">Phone *</label>
                  <input id="career-phone" name="phone" type="tel" required
                    value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                    data-career-field="phone" aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "career-phone-error" : undefined}
                    className={inputClass(errors.phone)} placeholder="+91 XXXXX XXXXX" />
                  {errors.phone && <p id="career-phone-error" className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="career-position" className="block text-sm font-medium text-[var(--body-text)] mb-2">Position Applied For *</label>
                  <input id="career-position" name="position" type="text" required
                    value={form.position} onChange={(e) => updateField("position", e.target.value)}
                    data-career-field="position" aria-invalid={!!errors.position}
                    aria-describedby={errors.position ? "career-position-error" : undefined}
                    className={inputClass(errors.position)} placeholder="e.g. Production Engineer" />
                  {errors.position && <p id="career-position-error" className="mt-1.5 text-xs text-red-500">{errors.position}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="career-experience" className="block text-sm font-medium text-[var(--body-text)] mb-2">Years of Experience</label>
                <input id="career-experience" name="experience" type="text"
                  value={form.experience} onChange={(e) => updateField("experience", e.target.value)}
                  data-career-field="experience" aria-invalid={!!errors.experience}
                  aria-describedby={errors.experience ? "career-experience-error" : undefined}
                  className={inputClass(errors.experience)} placeholder="e.g. 3 years" />
                {errors.experience && <p id="career-experience-error" className="mt-1.5 text-xs text-red-500">{errors.experience}</p>}
              </div>

              <div>
                <label htmlFor="career-resume" className="block text-sm font-medium text-[var(--body-text)] mb-2">Upload Resume (PDF/DOC/DOCX) *</label>
                <div className="relative">
                  <input id="career-resume" ref={fileInputRef} name="resume" type="file"
                    accept=".pdf,.doc,.docx" onChange={handleFileChange}
                    data-career-field="resume" aria-invalid={!!errors.resume}
                    aria-describedby={errors.resume ? "career-resume-error" : undefined}
                    className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className={`w-full px-4 py-6 rounded-xl border-2 border-dashed ${errors.resume ? "border-red-500" : "border-[var(--border)] hover:border-primary"} flex items-center justify-center gap-2 ${errors.resume ? "text-red-500" : "text-[var(--muted-text)]"} transition-colors`}>
                    <Upload className="w-5 h-5" />
                    <span className="text-sm">{fileName || "Click to upload your resume"}</span>
                  </div>
                </div>
                {errors.resume && <p id="career-resume-error" className="mt-1.5 text-xs text-red-500">{errors.resume}</p>}
                {!errors.resume && <p className="mt-1.5 text-xs text-[var(--muted-text)]">PDF, DOC or DOCX. Maximum size 5 MB.</p>}
              </div>

              <div>
                <label htmlFor="career-message" className="block text-sm font-medium text-[var(--body-text)] mb-2">Cover Letter (Optional)</label>
                <textarea id="career-message" name="message" rows={4}
                  value={form.message} onChange={(e) => updateField("message", e.target.value)}
                  data-career-field="message" aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "career-message-error" : undefined}
                  className={inputClass(errors.message)} placeholder="Tell us why you'd be a great fit..." />
                {errors.message && <p id="career-message-error" className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={status !== "sending" ? { scale: 1.02 } : undefined}
                whileTap={status !== "sending" ? { scale: 0.98 } : undefined}
                className={`w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 ${status === "sending" ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {status === "sending" ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Application</>
                )}
              </motion.button>
            </form>
          </GlassCard>
        </div>
      </section>
    </>
  );
}