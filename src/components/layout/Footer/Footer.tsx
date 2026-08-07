"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ChevronRight,
  Download,
  ArrowUpRight,
} from "lucide-react";

import { company } from "@/constants/company";
import { socialLinks } from "@/constants/social";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Career", href: "/career" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const products = [
  { name: "AAC Blocks", href: "/products#aac-blocks" },
  { name: "Lightweight Blocks", href: "/products#lightweight" },
  { name: "Fire Resistant", href: "/products#fire-resistant" },
  { name: "Thermal Insulation", href: "/products#thermal" },
  { name: "Applications", href: "/applications" },
  { name: "Download Brochure", href: "/documents/brochure.pdf", external: true },
];

const contactEmail = (company as { email?: string }).email || "info@klavetek.com";

const particleCount = 40;

function FloatingParticles() {
  const [windowHeight, setWindowHeight] = useState(1000);
  const [particles, setParticles] = useState<Array<{size: number; duration: number; delay: number; startX: number; drift: number}>>([]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = Array.from({ length: particleCount }).map(() => ({
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      startX: Math.random() * 100,
      drift: (Math.random() - 0.5) * 40,
    }));
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.startX}%`,
            bottom: "-10px",
          }}
          animate={{
            y: [-20, -windowHeight - 100],
            x: [0, particle.drift],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function MagneticButton({ children, href, className = "", ...props }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link
        href={href}
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl ${className}`}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, -50]);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="relative overflow-hidden" suppressHydrationWarning>
      {/* Main Footer */}
      <div className="relative">
        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          {/* Factory background pattern */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('/images/factory-pattern.svg')`,
            }}
          />

          {/* Theme-aware background */}
          <div className={`absolute inset-0 ${isDark ? 'bg-[#0a0a0a]/85' : 'bg-white/85'}`} />

          {/* Green radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(34,197,94,0.15) 0%, transparent 60%)",
            }}
          />

          {/* Top gradient fade */}
          <div
            className="absolute top-0 left-0 right-0 h-32"
            style={{
              background: isDark 
                ? "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)"
                : "linear-gradient(to bottom, transparent 0%, #FFFFFF 100%)",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Floating particles - only render on client to avoid hydration mismatch */}
          {mounted && <FloatingParticles />}
        </div>

        {/* Footer Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          {/* Top section - 4 columns */}
          <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-14 lg:py-24">
            {/* Column 1 - Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              {/* Logo */}
              <Link href="/" className="inline-block group">
                <div className="relative h-[44px] w-auto">
                  <Image
                    src="/logos/logo.png"
                    alt="Klavetek Green Blocks & Tiles"
                    height={44}
                    width={140}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
              </Link>

              <p className={`mt-5 text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                Premium AAC blocks and construction solutions engineered for
                strength, sustainability and long-term performance.
              </p>

              {/* Social Icons */}
              <div className="mt-8 flex items-center gap-3">
                {socialLinks.facebook && (
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className={`group flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] ${
                        isDark 
                          ? 'border-white/10 bg-white/5 text-white/60 hover:border-primary/50 hover:text-primary hover:bg-primary/10' 
                          : 'border-black/10 bg-black/5 text-black/60 hover:border-primary/50 hover:text-primary hover:bg-primary/10'
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </Link>
                  </motion.div>
                )}
                {socialLinks.instagram && (
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className={`group flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] ${
                        isDark 
                          ? 'border-white/10 bg-white/5 text-white/60 hover:border-primary/50 hover:text-primary hover:bg-primary/10' 
                          : 'border-black/10 bg-black/5 text-black/60 hover:border-primary/50 hover:text-primary hover:bg-primary/10'
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </Link>
                  </motion.div>
                )}
                {socialLinks.youtube && (
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className={`group flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] ${
                        isDark 
                          ? 'border-white/10 bg-white/5 text-white/60 hover:border-primary/50 hover:text-primary hover:bg-primary/10' 
                          : 'border-black/10 bg-black/5 text-black/60 hover:border-primary/50 hover:text-primary hover:bg-primary/10'
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Badges */}
              <div className="mt-8 flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative h-14 w-14 rounded-xl border backdrop-blur-xl p-1.5 ${
                    isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <Image
                    src="/images/footer/isi.png"
                    alt="ISI Certified"
                    fill
                    sizes="(max-width: 768px) 64px, 64px"
                    className="object-contain"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative h-14 w-14 rounded-xl border backdrop-blur-xl p-1.5 ${
                    isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <Image
                    src="/images/footer/igbc.png"
                    alt="Indian Green Building Council Member"
                    fill
                    sizes="(max-width: 768px) 64px, 64px"
                    className="object-contain"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Column 2 - Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h3 className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                Quick Links
              </h3>
              <ul className="mt-6 space-y-3">
                {quickLinks.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-2 text-sm transition-all duration-300 hover:text-primary ${
                        isDark ? 'text-white/60' : 'text-black/60'
                      }`}
                    >
                      <ChevronRight
                        size={14}
                        className="opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0"
                      />
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 - Products */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                Products
              </h3>
              <ul className="mt-6 space-y-3">
                {products.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-2 text-sm transition-all duration-300 hover:text-primary ${
                          isDark ? 'text-white/60' : 'text-black/60'
                        }`}
                      >
                        <ChevronRight
                          size={14}
                          className="opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0"
                        />
                        <span className="relative flex items-center gap-1">
                          {item.name}
                          <Download size={12} className="opacity-0 group-hover:opacity-100" />
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`group flex items-center gap-2 text-sm transition-all duration-300 hover:text-primary ${
                          isDark ? 'text-white/60' : 'text-black/60'
                        }`}
                      >
                        <ChevronRight
                          size={14}
                          className="opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0"
                        />
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4 - Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              <h3 className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                Contact
              </h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border backdrop-blur-xl transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 ${
                    isDark ? 'border-white/10 bg-white/5 text-primary' : 'border-black/10 bg-black/5 text-primary'
                  }`}>
                    <MapPin size={16} />
                  </div>
                  <span className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    {company.address}
                  </span>
                </li>

                <li>
                  <a
                    href={`tel:${company.phone}`}
                    className="group flex items-center gap-3 text-sm transition-colors duration-300 hover:text-primary"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border backdrop-blur-xl transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 ${
                      isDark ? 'border-white/10 bg-white/5 text-primary' : 'border-black/10 bg-black/5 text-primary'
                    }`}>
                      <Phone size={16} />
                    </div>
                    <span className={isDark ? 'text-white/60' : 'text-black/60'}>{company.phone}</span>
                  </a>
                  {company.phone2 && (
                    <a
                      href={`tel:${company.phone2}`}
                      className={`group flex items-center gap-3 text-sm transition-colors duration-300 hover:text-primary mt-1.5 ml-11 ${isDark ? 'text-white/60' : 'text-black/60'}`}
                    >
                      <span>{company.phone2}</span>
                    </a>
                  )}
                </li>

                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="group flex items-center gap-3 text-sm transition-colors duration-300 hover:text-primary"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border backdrop-blur-xl transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 ${
                      isDark ? 'border-white/10 bg-white/5 text-primary' : 'border-black/10 bg-black/5 text-primary'
                    }`}>
                      <Mail size={16} />
                    </div>
                    <span className={isDark ? 'text-white/60' : 'text-black/60'}>{contactEmail}</span>
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border backdrop-blur-xl ${
                    isDark ? 'border-white/10 bg-white/5 text-primary' : 'border-black/10 bg-black/5 text-primary'
                  }`}>
                    <Clock size={16} />
                  </div>
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </li>

                <li className="pt-2">
                  <MagneticButton
                    href="https://maps.app.goo.gl/Q3QJyfQnhN8PPhuq8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Directions
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </MagneticButton>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Decorative divider */}
          <div className="relative h-px w-full overflow-hidden">
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`} />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="relative z-20 mx-4 mb-6 mt-8 lg:mx-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl ${
            isDark 
              ? 'border-white/10 bg-white/5' 
              : 'border-black/10 bg-black/5'
          }`}
        >
          {/* Map container */}
          <div className="relative h-[400px] w-full overflow-hidden lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90240.68654007485!2d88.1876632!3d25.011885599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb03b7832414cf%3A0x48557a1c564874fd!2sKLAVETEK%20GREEN%20BLOCKS%20%26%20TILES%20PVT.%20LTD!5e1!3m2!1sen!2sin!4v1786015735258!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: isDark ? "grayscale(0.3) invert(0.9) hue-rotate(180deg) brightness(0.8)" : "grayscale(0.3) brightness(0.9)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Klavetek Factory Location"
            />

            {/* Floating contact card - made clickable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:max-w-sm cursor-pointer hidden md:block"
              onClick={() => window.open('https://maps.app.goo.gl/Q3QJyfQnhN8PPhuq8', '_blank', 'noopener noreferrer')}
            >
              <div className={`rounded-2xl border p-6 shadow-2xl backdrop-blur-xl ${
                isDark 
                  ? 'border-white/10 bg-black/70' 
                  : 'border-black/10 bg-white/90'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Factory Address</h4>
                      <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                        {company.address}
                      </p>
                    </div>
                  </div>

                  <div className={`h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

                  <div className="space-y-2.5">
                    <a
                      href={`tel:${company.phone}`}
                      className={`flex items-center gap-2.5 text-sm transition-colors duration-300 hover:text-primary ${isDark ? 'text-white/70' : 'text-black/70'}`}
                    >
                      <Phone size={14} />
                      <span>{company.phone}</span>
                    </a>
                    {company.phone2 && (
                      <a
                        href={`tel:${company.phone2}`}
                        className={`flex items-center gap-2.5 text-sm transition-colors duration-300 hover:text-primary ${isDark ? 'text-white/70' : 'text-black/70'}`}
                      >
                        <Phone size={14} />
                        <span>{company.phone2}</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${contactEmail}`}
                      className={`flex items-center gap-2.5 text-sm transition-colors duration-300 hover:text-primary ${isDark ? 'text-white/70' : 'text-black/70'}`}
                    >
                      <Mail size={14} />
                      <span>{contactEmail}</span>
                    </a>
                  </div>

                  <div className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]`}>
                    Get Directions
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`relative z-20 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
            {/* Left - Copyright */}
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-black/50'}`}>
              © {year} Klavetek Green Blocks & Tiles Pvt. Ltd. All rights reserved.
            </p>

            {/* Center - Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className={`text-xs transition-colors duration-300 hover:text-primary ${isDark ? 'text-white/50' : 'text-black/50'}`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`text-xs transition-colors duration-300 hover:text-primary ${isDark ? 'text-white/50' : 'text-black/50'}`}
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className={`text-xs transition-colors duration-300 hover:text-primary ${isDark ? 'text-white/50' : 'text-black/50'}`}
              >
                Cookies
              </Link>
            </div>

            {/* Right - Credit */}
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-black/50'}`}>
              Designed & Developed by{" "}
              <motion.a
                href="https://www.linkedin.com/in/masud-sk-254b581b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all duration-300 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                Masud Sk
              </motion.a>
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}