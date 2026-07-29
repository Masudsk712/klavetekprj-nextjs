"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

import { company } from "@/constants/company";
import { socialLinks } from "@/constants/social";

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Gallery", href: "/gallery" },
  { name: "Career", href: "/career" },
  { name: "Contact", href: "/contact" },
];

const contactEmail = (company as { email?: string }).email || "info@klavetek.com";

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  return (
    <footer className="relative bg-[#0B0D0E]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-3 md:gap-12 lg:py-16">

          {/* Company */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block">
              <span className="text-lg font-semibold tracking-tight text-white">
                Klavetek
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Premium AAC blocks and construction solutions engineered for
              strength, sustainability and long-term performance.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href={socialLinks.facebook}
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-green-400/40 hover:text-green-400 hover:bg-white/5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>

              <Link
                href={socialLinks.instagram}
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-green-400/40 hover:text-green-400 hover:bg-white/5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </Link>

              <Link
                href={socialLinks.youtube}
                aria-label="Youtube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-green-400/40 hover:text-green-400 hover:bg-white/5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Company
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-block transition-colors duration-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-gray-500" />

                <span>Klavetek Green Blocks & Tiles Pvt. Ltd., India</span>
              </li>

              <li>
                <Link
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
                >
                  <Phone size={16} className="text-gray-500" />

                  <span>{company.phone}</span>
                </Link>
              </li>

              <li>
                <Link
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
                >
                  <Mail size={16} className="mt-0.5 text-gray-500" />

                  <span>{contactEmail}</span>
                </Link>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 py-6">
          <p className="text-center text-xs text-gray-500">
            © {year ?? new Date().getFullYear()} Klavetek Green Blocks & Tiles Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}