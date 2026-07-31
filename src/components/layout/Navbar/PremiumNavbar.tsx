"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Phone, MessageCircle, ArrowRight, Menu, X } from "lucide-react";
import { navigation } from "@/constants/navigation";
import ThemeToggle from "@/components/shared/ThemeToggle";


const linkVariants = {
 hidden: { opacity: 0, y: -10 },
 visible: (i: number) => ({
 opacity: 1,
 y: 0,
 transition: {
 delay: i * 0.05,
 duration: 0.3,
 },
 }),
};

const mobileMenuVariants = {
 hidden: {
 opacity: 0,
 y: -20,
 scale: 0.95,
 transition: {
 duration: 0.3,
 },
 },
 visible: {
 opacity: 1,
 y: 0,
 scale: 1,
 transition: {
 duration: 0.4,
 staggerChildren: 0.05,
 delayChildren: 0.1,
 },
 },
 exit: {
 opacity: 0,
 y: -20,
 scale: 0.95,
 transition: {
 duration: 0.3,
 },
 },
};

const menuItemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: {
 opacity: 1,
 y: 0,
 transition: {
 duration: 0.3,
 },
 },
};

const activeIndicatorVariants = {
 hidden: { scale: 0, opacity: 0 },
 visible: {
 scale: 1,
 opacity: 1,
 transition: {
 type: "spring",
 stiffness: 500,
 damping: 30,
 } as const,
 },
};

interface NavLinkProps {
 href: string;
 name: string;
 isActive: boolean;
 index: number;
 onClick?: () => void;
 className?: string;
}

function NavLink({ href, name, isActive, index, onClick, className = "" }: NavLinkProps) {
 return (
 <motion.div
 custom={index}
 variants={linkVariants}
 initial="hidden"
 animate="visible"
 className="relative"
 >
 <Link
 href={href}
 onClick={onClick}
 className={`relative px-4 py-2 text-[15px] font-poppins font-medium tracking-wide transition-all duration-300 ease-out ${isActive ? "text-primary" : "text-[var(--muted-text)] hover:text-[var(--heading)]"} group ${className}`}
 >
 {name}
 {isActive && (
 <motion.span
 layoutId="activeIndicator"
 variants={activeIndicatorVariants}
 className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
 style={{ boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)" }}
 />
 )}
 </Link>
 </motion.div>
 );
}

export default function PremiumNavbar() {
 const [scrolled, setScrolled] = useState(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const pathname = usePathname();
 const { theme } = useTheme();
 const isDark = theme === "dark";

 useEffect(() => {
 const handleScroll = () => {
 setScrolled(window.scrollY > 40);
 };
 window.addEventListener("scroll", handleScroll, { passive: true });
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const handleMobileMenuToggle = () => {
 setMobileMenuOpen(!mobileMenuOpen);
 document.body.style.overflow = mobileMenuOpen ? "unset" : "hidden";
 };

 const handleMobileMenuClose = () => {
 setMobileMenuOpen(false);
 document.body.style.overflow = "unset";
 };

 return (
 <>
 <nav
 className="fixed top-0 left-0 right-0 z-[1000] h-[78px] px-5 md:px-8"
 style={{
 backgroundColor: scrolled
 ? isDark
 ? "rgba(0,0,0,0.80)"
 : "rgba(255,255,255,0.90)"
 : "transparent",
 backdropFilter: scrolled ? "blur(22px)" : "blur(0px)",
 borderRadius: "0px",
 borderWidth: scrolled ? "1px" : "0px",
 borderStyle: "solid",
 borderColor: scrolled
 ? isDark
 ? "rgba(255,255,255,0.10)"
 : "rgba(0,0,0,0.06)"
 : "transparent",
 boxShadow: scrolled
 ? isDark
 ? "0 20px 60px rgba(0,0,0,0.5)"
 : "0 20px 60px rgba(0,0,0,0.08)"
 : "none",
 transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
 }}
 >
 <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between">
 {/* Logo */}
 <Link href="/" className="flex-shrink-0 group">
 <motion.div
 className="relative h-[44px] w-auto"
 whileHover={{ scale: 1.05 }}
 transition={{ duration: 0.2 }}
 >
 <Image
 src="/logos/logo.png"
 alt="Klavetek Green Blocks & Tiles"
 height={44}
 width={140}
 className="h-full w-auto object-contain"
 style={{ width: "auto", height: "100%" }}
 priority
 />
 </motion.div>
 </Link>

 <div className="flex h-full items-center gap-6">
 {/* Desktop Navigation Links */}
 <motion.div className="hidden lg:flex items-center gap-1">
 {navigation.map((item, index) => (
 <NavLink
 key={item.name}
 href={item.href}
 name={item.name}
 isActive={pathname === item.href}
 index={index}
 />
 ))}
 </motion.div>

 {/* Desktop Right Side Actions */}
 <motion.div
 className="hidden lg:flex items-center gap-3"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.3, duration: 0.5 }}
 >
 <ThemeToggle />
 {/* Phone Button */}
 <motion.a
 href="tel:+91XXXXXXXXXX"
 aria-label="Call us"
 className="relative w-12 h-12 flex items-center justify-center rounded-full border-[var(--border)] bg-transparent"
 whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.4)" }}
 whileTap={{ scale: 0.95 }}
 transition={{ type: "spring", stiffness: 400, damping: 17 }}
 >
 <Phone className="w-5 h-5 text-[var(--heading)]" strokeWidth={2} />
 <span className="absolute inset-0 rounded-full border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
 </motion.a>

 {/* WhatsApp Button */}
 <motion.a
 href="https://wa.me/91XXXXXXXXXX"
 target="_blank"
 rel="noopener noreferrer"
 aria-label="WhatsApp"
 className="relative w-12 h-12 flex items-center justify-center rounded-full border-[var(--border)] bg-transparent"
 whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary-rgb), 0.2)", boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.4)" }}
 whileTap={{ scale: 0.95 }}
 transition={{ type: "spring", stiffness: 400, damping: 17 }}
 >
 <MessageCircle className="w-5 h-5 text-primary" strokeWidth={2} />
 </motion.a>

 {/* Get Quote Button */}
 <motion.div
 whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px rgba(var(--primary-rgb), 0.3)" }}
 whileTap={{ scale: 0.98 }}
 transition={{ type: "spring", stiffness: 400, damping: 17 }}
 className="relative"
 >
 <Link
 href="/contact"
 className="relative inline-flex items-center gap-2 h-12 px-[26px] bg-primary text-white font-poppins font-semibold text-[15px] rounded-full overflow-hidden group"
 >
 <span className="relative z-10">Get Quote</span>
 <motion.span
 className="relative z-10"
 initial={{ x: 0 }}
 whileHover={{ x: 5 }}
 transition={{ type: "spring", stiffness: 400, damping: 17 }}
 >
 <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
 </motion.span>
 <motion.div
 className="absolute inset-0 bg-black/20"
 initial={{ y: "100%" }}
 whileHover={{ y: "0%" }}
 transition={{ duration: 0.3 }}
 />
 </Link>
 </motion.div>
 </motion.div>
 </div>

 {/* Mobile Menu Button */}
 <motion.button
 className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-full border-[var(--border)] bg-transparent"
 onClick={handleMobileMenuToggle}
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.95 }}
 aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
 >
 <AnimatePresence mode="wait">
 {mobileMenuOpen ? (
 <motion.div
 key="close"
 initial={{ rotate: -90, opacity: 0 }}
 animate={{ rotate: 0, opacity: 1 }}
 exit={{ rotate: 90, opacity: 0 }}
 transition={{ duration: 0.2 }}
 >
 <X className="w-5 h-5 text-[var(--heading)]" strokeWidth={2.5} />
 </motion.div>
 ) : (
 <motion.div
 key="menu"
 initial={{ rotate: 90, opacity: 0 }}
 animate={{ rotate: 0, opacity: 1 }}
 exit={{ rotate: -90, opacity: 0 }}
 transition={{ duration: 0.2 }}
 >
 <Menu className="w-5 h-5 text-[var(--heading)]" strokeWidth={2.5} />
 </motion.div>
 )}
 </AnimatePresence>
 </motion.button>

 {/* Mobile Theme Toggle */}
 <div className="lg:hidden">
 <ThemeToggle />
 </div>
 </div>
 </nav>

 {/* Mobile Menu */}
 <AnimatePresence>
 {mobileMenuOpen && (
 <motion.div
 variants={mobileMenuVariants}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="fixed inset-x-4 top-20 z-40 bg-[var(--background)]/95 backdrop-blur-2xl border-[var(--border)] rounded-3xl shadow-2xl p-6 lg:hidden"
 style={{ maxWidth: "calc(1280px - 32px)", margin: "0 auto" }}
 >
 {/* Navigation Links */}
 <motion.div className="flex flex-col space-y-2 mb-6">
 {navigation.map((item, index) => (
 <motion.div key={item.name} variants={menuItemVariants} custom={index}>
 <Link
 href={item.href}
 onClick={handleMobileMenuClose}
 className={`block px-4 py-3 text-base font-poppins font-medium rounded-2xl transition-all duration-300 ease-out ${
 pathname === item.href
 ? "text-primary bg-primary/10 border border-primary/20"
 : "text-[var(--muted-text)] hover:text-[var(--heading)] hover:bg-[var(--surface-2)]/5"
 }`}
 >
 {item.name}
 </Link>
 </motion.div>
 ))}
 </motion.div>

 {/* Mobile Divider */}
 <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-4" />

 {/* Mobile Action Buttons */}
 <motion.div className="flex flex-col gap-3" variants={menuItemVariants}>
 {/* Phone Button */}
 <motion.a
 href="tel:+91XXXXXXXXXX"
 className="flex items-center gap-3 px-4 py-3 rounded-2xl border-[var(--border)] bg-[var(--surface-2)]/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group"
 whileHover={{ x: 5 }}
 onClick={handleMobileMenuClose}
 >
 <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-2)]/5 group-hover:bg-primary/20">
 <Phone className="w-5 h-5 text-[var(--muted-text)] group-hover:text-primary" strokeWidth={2} />
 </div>
 <span className="text-[var(--muted-text)] font-poppins font-medium group-hover:text-[var(--heading)]">
 Call Us
 </span>
 </motion.a>

 {/* WhatsApp Button */}
 <motion.a
 href="https://wa.me/91XXXXXXXXXX"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-3 px-4 py-3 rounded-2xl border-[var(--border)] bg-[var(--surface-2)]/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group"
 whileHover={{ x: 5 }}
 onClick={handleMobileMenuClose}
 >
 <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-2)]/5 group-hover:bg-primary/20">
 <MessageCircle className="w-5 h-5 text-primary" strokeWidth={2} />
 </div>
 <span className="text-[var(--muted-text)] font-poppins font-medium group-hover:text-[var(--heading)]">
 WhatsApp
 </span>
 </motion.a>

 {/* Get Quote Button */}
 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
 <Link
 href="/contact"
 onClick={handleMobileMenuClose}
 className="flex items-center justify-center gap-2 h-12 bg-primary text-white font-poppins font-semibold rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] group"
 >
 <span>Get Quote</span>
 <motion.span
 initial={{ x: 0 }}
 whileHover={{ x: 5 }}
 transition={{ type: "spring", stiffness: 400, damping: 17 }}
 >
 <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
 </motion.span>
 </Link>
 </motion.div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
}