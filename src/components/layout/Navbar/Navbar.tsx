"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import CTAButtons from "./CTAButtons";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 top-0 z-50 h-[82px] w-full transition-all duration-500 ${
          isScrolled
            ? "border-b border-white/20 bg-white/85 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/logos/logo.png"
              alt="Klavetek Green Blocks"
              width={170}
              height={55}
              priority
              className="h-auto w-auto max-h-[52px]"
            />
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:block">
            <DesktopMenu isScrolled={isScrolled} />
          </div>

          {/* Right */}

          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />

            <CTAButtons isScrolled={isScrolled} />
          </div>

          {/* Mobile */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-xl border p-2.5 lg:hidden transition-colors duration-300 ${
              isScrolled
                ? "border-gray-200 text-gray-900"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            closeMenu={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}