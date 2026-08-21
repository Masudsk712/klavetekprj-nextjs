"use client";

import { motion, useReducedMotion, type Transition, type ViewportOptions } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, type ReactNode } from "react";
import { useTheme } from "next-themes";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Download,
  Navigation,
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

interface FooterProductItem {
  name: string;
  href: string;
  external?: boolean;
  download?: string;
}

const products: FooterProductItem[] = [
  { name: "100mm AAC Blocks", href: "/products/100mm" },
  { name: "125mm AAC Blocks", href: "/products/125mm" },
  { name: "150mm AAC Blocks", href: "/products/150mm" },
  { name: "200mm AAC Blocks", href: "/products/200mm" },
  { name: "250mm AAC Blocks", href: "/products/250mm" },
];

const contactEmail = (company as { email?: string }).email || "info@klavetek.com";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90240.68654007485!2d88.1876632!3d25.011885599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb03b7832414cf%3A0x48557a1c564874fd!2sKLAVETEK%20GREEN%20BLOCKS%20%26%20TILES%20PVT.%20LTD!5e1!3m2!1sen!2sin!4v1786015735258!5m2!1sen!2sin";

const directionsUrl = "https://maps.app.goo.gl/Q3QJyfQnhN8PPhuq8";

const socialItems: Array<{ key: string; label: string; href: string; icon: ReactNode }> = [
  {
    key: "facebook",
    label: "Facebook",
    href: socialLinks.facebook,
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: socialLinks.instagram,
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    href: socialLinks.youtube,
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
].filter((s) => Boolean(s.href));

interface RevealProps {
  initial?: { opacity: number; y?: number };
  whileInView?: { opacity: number; y?: number };
  viewport: ViewportOptions;
  transition?: Transition;
}

function reveal(reduce: boolean, delay = 0, distance = 18): RevealProps {
  if (reduce) return { viewport: { once: true, margin: "-40px" } };
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

function AmbientGlow({ isDark, reduceMotion }: { isDark: boolean; reduceMotion: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-1/2"
      animate={reduceMotion ? undefined : { x: [0, 90, 0], y: [0, -70, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: isDark
          ? "radial-gradient(ellipse 42% 36% at 50% 50%, rgba(34,197,94,0.10) 0%, transparent 62%)"
          : "radial-gradient(ellipse 42% 36% at 50% 50%, rgba(22,163,74,0.06) 0%, transparent 62%)",
      }}
    />
  );
}

function FooterHeading({ children, isDark }: { children: ReactNode; isDark: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-primary/70" />
      <h3
        className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
          isDark ? "text-white/90" : "text-black/90"
        }`}
      >
        {children}
      </h3>
    </div>
  );
}

function ContactIcon({ children, isDark }: { children: ReactNode; isDark: boolean }) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-primary transition-colors duration-300 ${
        isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
      }`}
    >
      {children}
    </div>
  );
}
export default function Footer() {
  const year = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted ? theme === "dark" : true;
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <footer className="relative overflow-hidden noise-bg" suppressHydrationWarning>
      {/* Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className={`absolute inset-0 ${isDark ? "bg-[#070807]" : "bg-white"}`} />
        {/* Deep-green radial gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 70% 55% at 50% 115%, rgba(21,128,61,0.18) 0%, transparent 60%)"
              : "radial-gradient(ellipse 70% 55% at 50% 115%, rgba(22,163,74,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(21,128,61,0.14) 0%, transparent 65%)" }}
        />
        {/* Slow ambient green glow */}
        {mounted && <AmbientGlow isDark={isDark} reduceMotion={reduceMotion} />}
        {/* Top transition into the page */}
        <div
          className="absolute inset-x-0 top-0 h-20"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, transparent 0%, #070807 100%)"
              : "linear-gradient(to bottom, transparent 0%, #ffffff 100%)",
          }}
        />
      </div>

      {/* ===== Main 4-column footer ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:py-16">
          {/* Column 1 - Brand */}
          <motion.div {...reveal(reduceMotion, 0)}>
            <Link href="/" aria-label="Klavetek home" className="inline-block w-fit">
              <div className="relative h-[40px] w-auto">
                <Image
                  src="/logos/logo.png"
                  alt="Klavetek Green Blocks & Tiles"
                  height={40}
                  width={132}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            <p className={`mt-5 max-w-[27ch] text-sm leading-relaxed ${isDark ? "text-white/60" : "text-black/60"}`}>
              Premium AAC blocks and construction solutions engineered for strength, sustainability
              and long-term performance.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-2.5">
              {socialItems.map((s) => (
                <motion.a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.93 }}
                  transition={{ duration: 0.25 }}
                  className={`group flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 ${
                    isDark
                      ? "border-white/10 bg-white/5 text-white/75 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.25)]"
                      : "border-black/10 bg-black/5 text-black/70 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
            {/* Certifications */}
            <div className="mt-6 flex items-center gap-3">
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`relative h-11 w-11 rounded-lg border p-1.5 ${
                  isDark ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-black/5"
                }`}
              >
                <Image
                  src="/images/footer/isi.png"
                  alt="ISI Certified"
                  fill
                  sizes="(max-width: 768px) 44px, 44px"
                  className="object-contain"
                />
              </motion.div>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`relative h-11 w-11 rounded-lg border p-1.5 ${
                  isDark ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-black/5"
                }`}
              >
                <Image
                  src="/images/footer/igbc.png"
                  alt="Indian Green Building Council Member"
                  fill
                  sizes="(max-width: 768px) 44px, 44px"
                  className="object-contain"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div {...reveal(reduceMotion, 0.1)}>
            <FooterHeading isDark={isDark}>Quick Links</FooterHeading>
            <ul className="mt-6 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-2.5 text-sm transition-all duration-300 hover:translate-x-1 ${
                      isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
                    }`}
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3.5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Column 3 - Products */}
          <motion.div {...reveal(reduceMotion, 0.2)}>
            <FooterHeading isDark={isDark}>Products</FooterHeading>
            <ul className="mt-6 space-y-2.5">
              {products.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      {...(item.download
                        ? { download: item.download, "aria-label": "Download Klavetek brochure" }
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className={`group flex items-center gap-2.5 text-sm transition-all duration-300 hover:translate-x-1 ${
                        isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
                      }`}
                    >
                      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3.5" />
                      <span className="flex items-center gap-1.5">
                        {item.name}
                        <Download
                          size={12}
                          className="text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-2.5 text-sm transition-all duration-300 hover:translate-x-1 ${
                        isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
                      }`}
                    >
                      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3.5" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Contact */}
          <motion.div {...reveal(reduceMotion, 0.3)}>
            <FooterHeading isDark={isDark}>Contact</FooterHeading>
            <ul className="mt-6 space-y-3.5">
              {/* Address */}
              <li className="flex items-start gap-3">
                <ContactIcon isDark={isDark}>
                  <MapPin size={16} />
                </ContactIcon>
                <span className={`pt-1 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-black/60"}`}>
                  {company.address}
                </span>
              </li>
              {/* Phones */}
              <li className="flex items-start gap-3">
                <ContactIcon isDark={isDark}>
                  <Phone size={16} />
                </ContactIcon>
                <div className="space-y-1.5 pt-0.5">
                  <a
                    href={`tel:${company.phone}`}
                    className={`block text-sm transition-colors duration-300 hover:text-primary ${
                      isDark ? "text-white/60" : "text-black/60"
                    }`}
                  >
                    {company.phone}
                  </a>
                  {company.phone2 && (
                    <a
                      href={`tel:${company.phone2}`}
                      className={`block text-sm transition-colors duration-300 hover:text-primary ${
                        isDark ? "text-white/60" : "text-black/60"
                      }`}
                    >
                      {company.phone2}
                    </a>
                  )}
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <ContactIcon isDark={isDark}>
                  <Mail size={16} />
                </ContactIcon>
                <a
                  href={`mailto:${contactEmail}`}
                  className={`text-sm transition-colors duration-300 hover:text-primary ${
                    isDark ? "text-white/60" : "text-black/60"
                  }`}
                >
                  {contactEmail}
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-3">
                <ContactIcon isDark={isDark}>
                  <Clock size={16} />
                </ContactIcon>
                <div className={`space-y-0.5 pt-1 text-sm ${isDark ? "text-white/60" : "text-black/60"}`}>
                  <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>

              {/* Integrated Get Directions */}
              <li className="pt-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isDark
                      ? "border-primary/30 bg-primary/10 text-white hover:border-primary/60 hover:bg-primary/20"
                      : "border-primary/30 bg-primary/10 text-black hover:border-primary/60 hover:bg-primary/15"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Navigation size={15} className="text-primary" />
                    Get Directions
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider into location */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      {/* ===== Factory Location - premium split ===== */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-12 py-14 md:py-16 lg:flex-row lg:items-center lg:gap-16">
            {/* Left */}
            <motion.div {...reveal(reduceMotion, 0)} className="flex-1">
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                <span className="h-px w-6 bg-primary" />
                Find Us
              </span>
              <h2 className={`mt-4 text-2xl font-bold tracking-tight md:text-3xl ${isDark ? "text-white" : "text-black"}`}>
                Our Factory Location
              </h2>
              <p className={`mt-3 max-w-md text-sm leading-relaxed ${isDark ? "text-white/55" : "text-black/55"}`}>
                Drop by our manufacturing facility in Malda, West Bengal — or reach out to the team
                anytime for inquiries, samples and site visits.
              </p>

              {/* Opening-hours pills */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur-md ${
                    isDark ? "border-white/10 bg-white/5 text-white/75" : "border-black/10 bg-black/5 text-black/70"
                  }`}
                >
                  <Clock size={13} className="text-primary" />
                  Mon - Sat · 9:00 AM - 6:00 PM
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur-md ${
                    isDark ? "border-white/10 bg-white/5 text-white/75" : "border-black/10 bg-black/5 text-black/70"
                  }`}
                >
                  <MapPin size={13} className="text-primary" />
                  Sunday Closed
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-hover px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(var(--primary-rgb),0.4)]"
                >
                  Get Directions
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href={`tel:${company.phone}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition-colors duration-300 hover:border-primary/50 hover:text-primary ${
                    isDark ? "border-white/10 bg-white/5 text-white/80" : "border-black/10 bg-black/5 text-black/80"
                  }`}
                >
                  <Phone size={14} className="text-primary" />
                  {company.phone}
                </a>
              </div>
            </motion.div>
            {/* Right - Map */}
            <div className="w-full lg:w-[45%] lg:max-w-[560px]">
              <motion.div {...reveal(reduceMotion, 0.15)} className="relative">
                {/* Ambient glow behind the map */}
                <div className="absolute -inset-3 rounded-[28px] bg-primary/15 opacity-50 blur-2xl" aria-hidden="true" />
                <div
                  className={`relative overflow-hidden rounded-[24px] border shadow-lg ${
                    isDark ? "border-white/15 shadow-black/40" : "border-black/10 shadow-black/15"
                  }`}
                >
                  {/* 16:9 map */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    <iframe
                      src={mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        filter: isDark
                          ? "grayscale(0.3) invert(0.9) hue-rotate(180deg) brightness(0.8)"
                          : "grayscale(0.25) brightness(0.95)",
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Klavetek Factory Location"
                    />

                    {/* Small address label over the map (hidden on mobile) */}
                    <div className="pointer-events-none absolute bottom-3 left-3 z-10 hidden w-[240px] rounded-[16px] border border-primary/20 bg-[rgba(10,15,12,0.62)] px-3.5 py-2.5 shadow-md backdrop-blur-md md:block">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                          <MapPin size={12} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/60">
                            Factory Address
                          </p>
                          <p className="mt-0.5 text-[11px] font-medium leading-snug text-white">
                            {company.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient transition into the bottom bar */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* ===== Bottom bar ===== */}
      <div className="relative z-10 border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-4 py-6 md:flex-row md:items-center md:justify-between md:gap-6">
            <p className={`text-center text-xs leading-relaxed md:text-left md:min-w-0 ${isDark ? "text-white/50" : "text-black/50"}`}>
              © {year} Klavetek Green Blocks &amp; Tiles Pvt. Ltd. All rights reserved.
            </p>
            <p className={`text-center text-xs md:text-right md:ml-auto md:mr-[96px] lg:mr-[72px] md:max-w-[46%] ${isDark ? "text-white/50" : "text-black/50"}`}>
              Designed &amp; Developed by{" "}
              <a
                href="https://www.linkedin.com/in/masud-sk-254b581b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary transition-colors duration-300 hover:underline"
              >
                Masud Sk
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}








