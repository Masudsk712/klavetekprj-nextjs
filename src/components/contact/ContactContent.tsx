"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { company } from "@/constants/company";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.1, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const contactInfo = [
 {
 icon: <MapPin className="w-6 h-6 text-primary" />,
 title: "Visit Us",
 value: company.address,
 link: `https://maps.google.com/?q=${encodeURIComponent(company.address)}`,
 },
 {
 icon: <Phone className="w-6 h-6 text-primary" />,
 title: "Call Us",
 value: company.phone,
 link: `tel:${company.phone.replace(/\s/g, "")}`,
 },
 {
 icon: <Mail className="w-6 h-6 text-primary" />,
 title: "Email Us",
 value: company.email,
 link: `mailto:${company.email}`,
 },
 {
 icon: <MessageCircle className="w-6 h-6 text-primary" />,
 title: "WhatsApp",
 value: company.phone2,
 link: `https://wa.me/${company.phone2.replace(/\D/g, "")}`,
 },
];

const businessHours = [
 { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
 { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
 { day: "Sunday", hours: "Closed" },
];

export default function ContactContent() {
 return (
 <>
 {/* Contact Info Cards */}
 <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title="Get in Touch" subtitle="We're here to help with your AAC block requirements. Reach out through any of these channels." />
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
 >
 {contactInfo.map((info, index) => (
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
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Phone Number</label>
 <input
 type="tel"
 required
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
 placeholder="+91 XXXXX XXXXX"
 />
 </div>
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
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Subject</label>
 <select
 required
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-[var(--surface)]"
 >
 <option value="">Select a subject</option>
 <option>Product Inquiry</option>
 <option>Price Quote Request</option>
 <option>Technical Support</option>
 <option>Partnership Opportunity</option>
 <option>Other</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--body-text)] mb-2">Message</label>
 <textarea
 rows={5}
 required
 className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
 placeholder="Tell us about your project requirements..."
 />
 </div>
 <motion.button
 type="submit"
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
 >
 <Send className="w-4 h-4" />
 Send Message
 </motion.button>
 </form>
 </GlassCard>

 {/* Map & Business Hours */}
 <div className="space-y-6">
 {/* Map */}
 <GlassCard hover={false} elevated className="overflow-hidden">
 <div className="aspect-video w-full">
 <iframe
 src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`}
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

 {/* Business Hours */}
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
