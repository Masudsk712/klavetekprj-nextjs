"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { X, Phone, MessageCircle, ArrowRight } from "lucide-react";

import { navigation } from "@/constants/navigation";
import { company } from "@/constants/company";

interface MobileMenuProps {
  closeMenu: () => void;
}

export default function MobileMenu({
  closeMenu,
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-xl lg:hidden"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 30,
        }}
        className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold">
            Menu
          </h2>

          <button
            onClick={closeMenu}
            aria-label="Close Menu"
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-6 py-8">
          <ul className="space-y-3">
            {navigation.map((item) => {
              const active =
                pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block rounded-xl px-4 py-3 text-lg font-medium transition-all duration-300 ${
                      active
                        ? "bg-[var(--primary)] text-white"
                        : "text-[var(--black)] hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom CTA */}

        <div className="space-y-4 border-t p-6">
          <Link
            href={`tel:${company.phone}`}
            className="flex items-center justify-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <Phone size={18} />
            Call Now
          </Link>

          <Link
            href={`https://wa.me/${company.phone.replace(
              /\D/g,
              ""
            )}`}
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--primary-dark)]"
          >
            <MessageCircle size={18} />
            WhatsApp
          </Link>

          <Link
            href="/contact"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-900"
          >
            Get Quote

            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}