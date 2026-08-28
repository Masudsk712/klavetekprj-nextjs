"use client";

import { useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import {
  MapPin, Phone, Mail, MessageCircle, Clock, Send, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import { company } from "@/constants/company";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce } from "@/lib/animations";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const contactInfo = [
  { icon: <MapPin className="w-6 h-6 text-primary" />, title: "Visit Us", value: company.address, link: `https://maps.google.com/?q=${encodeURIComponent(company.address)}` },
  { icon: <Phone className="w-6 h-6 text-primary" />, title: "Call Us", value: company.phone, link: `tel:${company.phone.replace(/\s/g, "")}` },
  { icon: <Mail className="w-6 h-6 text-primary" />, title: "Email Us", value: company.email, link: `mailto:${company.email}` },
  { icon: <MessageCircle className="w-6 h-6 text-primary" />, title: "WhatsApp", value: company.phone2, link: `https://wa.me/${company.phone2.replace(/\D/g, "")}` },
];

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const subjectOptions = [
  "Get a Quote",
  "Product Inquiry",
  "Other",
];
interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  product: string;
  message: string;
}

const EMPTY_FORM: ContactFormState = { name: "", email: "", phone: "", subject: "", product: "", message: "" };

interface ContactContentProps {
  preselectedProduct?: string;
}

export default function ContactContent({ preselectedProduct = "" }: ContactContentProps) {
  const [form, setForm] = useState<ContactFormState>({ ...EMPTY_FORM, product: preselectedProduct });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status !== "idle") { setStatus("idle"); setStatusMessage(""); }
  };

  const validate = (values: ContactFormState): Partial<Record<keyof ContactFormState, string>> => {
    const next: Partial<Record<keyof ContactFormState, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    else if (values.name.trim().length > 120) next.name = "Name is too long.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.phone.trim()) next.phone = "Please enter your phone number.";
    else if (!/^[0-9+\-()\s]{7,30}$/.test(values.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!values.subject) next.subject = "Please select a subject.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    else if (values.message.trim().length > 5000) next.message = "Message is too long.";
    return next;
  };

  const focusField = (key: string) => {
    document.querySelector<HTMLElement>(`[data-contact-field="${key}"]`)?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return; // prevent duplicate submissions

    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0] ?? "";
      focusField(first);
      return;
    }

    setStatus("sending");
    setStatusMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage("Thank you. Your enquiry has been submitted successfully.");
        setForm({ ...EMPTY_FORM, product: preselectedProduct });
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
      <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader title="Get in Touch" subtitle="We're here to help with your AAC block requirements. Reach out through any of these channels." />
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <motion.a
                key={info.title}
                href={info.link}
                target={info.title === "WhatsApp" ? "_blank" : undefined}
                rel={info.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl border border-primary/10 bg-[var(--surface)] shadow-[0_24px_70px_rgba(0, 0, 0,0.08)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <h3 className="text-base font-semibold text-[var(--heading)] mb-2">{info.title}</h3>
                <p className="text-sm text-[var(--muted-text)] leading-relaxed">{info.value}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Contact Form & Map */}
      <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <GlassCard hover={false} elevated className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-[var(--heading)] mb-2">Send Us a Message</h3>
              <p className="text-sm text-[var(--muted-text)] mb-6">Fill out the form below and our team will get back to you within 24 hours.</p>

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} role="status"
                  className="flex items-center gap-2 rounded-xl border border-accent-glow/30 bg-accent-glow/10 px-4 py-3 text-sm text-accent-glow dark:text-accent-glow mb-6">
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
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--body-text)] mb-2">Full Name *</label>
                    <input id="contact-name" name="name" type="text" required
                      value={form.name} onChange={(e) => updateField("name", e.target.value)}
                      data-contact-field="name" aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClass(errors.name)} placeholder="John Doe" />
                    {errors.name && <p id="contact-name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-[var(--body-text)] mb-2">Phone Number *</label>
                    <input id="contact-phone" name="phone" type="tel" required
                      value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                      data-contact-field="phone" aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                      className={inputClass(errors.phone)} placeholder="+91 XXXXX XXXXX" />
                    {errors.phone && <p id="contact-phone-error" className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--body-text)] mb-2">Email *</label>
                  <input id="contact-email" name="email" type="email" required
                    value={form.email} onChange={(e) => updateField("email", e.target.value)}
                    data-contact-field="email" aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputClass(errors.email)} placeholder="john@example.com" />
                  {errors.email && <p id="contact-email-error" className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-[var(--body-text)] mb-2">Subject *</label>
                    <select id="contact-subject" name="subject" required
                      value={form.subject} onChange={(e) => updateField("subject", e.target.value)}
                      data-contact-field="subject" aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                      className={`${inputClass(errors.subject)} bg-[var(--surface)] text-[var(--body-text)]`}>
                      <option value="">Select a subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.subject && <p id="contact-subject-error" className="mt-1.5 text-xs text-red-500">{errors.subject}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-product" className="block text-sm font-medium text-[var(--body-text)] mb-2">Product (Optional)</label>
                    <input id="contact-product" name="product" type="text"
                      value={form.product} onChange={(e) => updateField("product", e.target.value)}
                      className={inputClass()} placeholder="e.g. 150mm AAC Block" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--body-text)] mb-2">Message *</label>
                  <textarea id="contact-message" name="message" rows={5} required
                    value={form.message} onChange={(e) => updateField("message", e.target.value)}
                    data-contact-field="message" aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={inputClass(errors.message)} placeholder="Tell us about your project requirements..." />
                  {errors.message && <p id="contact-message-error" className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={status !== "sending" ? { scale: 1.02 } : undefined}
                  whileTap={status !== "sending" ? { scale: 0.98 } : undefined}
                  className={`w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 ${status === "sending" ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {status === "sending" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </motion.button>
              </form>
            </GlassCard>

            {/* Map & Business Hours */}
            <div className="space-y-6">
              <GlassCard hover={false} elevated className="overflow-hidden">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90240.68654007485!2d88.1876632!3d25.011885599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb03b7832414cf%3A0x48557a1c564874fd!2sKLAVETEK%20GREEN%20BLOCKS%20%26%20TILES%20PVT.%20LTD!5e1!3m2!1sen!2sin!4v1786015735258!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Klavetek Location"
                    className="w-full h-full"
                  />
                </div>
              </GlassCard>

              <GlassCard hover={false} elevated className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--heading)]">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((item) => (
                    <div key={item.day} className="flex items-center justify-between py-2 border-b border-primary/10 last:border-0">
                      <span className="text-sm text-[var(--body-text)]">{item.day}</span>
                      <span className={`text-sm font-medium ${item.hours === "Closed" ? "text-[var(--muted-text)]" : "text-[var(--heading)]"}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}