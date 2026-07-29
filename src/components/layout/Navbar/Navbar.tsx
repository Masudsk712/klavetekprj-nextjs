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
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/20 bg-white/80 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/logos/logo.png"
              alt="Klavetek"
              width={170}
              height={55}
              priority
            />
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:block">
            <DesktopMenu />
          </div>

          {/* Right */}

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            <CTAButtons />
          </div>

          {/* Mobile */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl border p-2 lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
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