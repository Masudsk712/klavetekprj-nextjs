"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun, Moon, Phone, MessageCircle, ArrowRight, ArrowUpRight, Menu, X,
  ChevronDown, Layers, Box, Building2, Factory, Home, GraduationCap,
  Warehouse, HeartPulse, Blocks, ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/constants/company";
import { useScrollState } from "@/hooks/useScrollState";

/* ===== DATA ===== */
type DropdownKey = "products" | "projects";

const navItems: { name: string; href: string; dropdown?: DropdownKey }[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products", dropdown: "products" },
  { name: "Projects", href: "/projects", dropdown: "projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Career", href: "/career" },
  { name: "Contact", href: "/contact" },
];

const productMenu = [
  { id: "100mm", title: "100 mm AAC Block", desc: "Slim internal partitions that maximise floor space.", icon: Layers },
  { id: "125mm", title: "125 mm AAC Block", desc: "The ideal balance of strength and usable space.", icon: Box },
  { id: "150mm", title: "150 mm AAC Block", desc: "The standard choice for homes and villas.", icon: Blocks },
  { id: "200mm", title: "200 mm AAC Block", desc: "Heavy-duty performance for commercial structures.", icon: Building2 },
  { id: "250mm", title: "250 mm AAC Block", desc: "Maximum strength for industrial applications.", icon: Factory },
];

const projectMenu = [
  { key: "residential-buildings", title: "Residential", desc: "Premium housing complexes", icon: Home },
  { key: "commercial-buildings", title: "Commercial", desc: "Modern business spaces", icon: Building2 },
  { key: "industrial-projects", title: "Industrial", desc: "Heavy-duty structures", icon: Factory },
  { key: "hospitals", title: "Hospitals", desc: "Safe, acoustic care", icon: HeartPulse },
  { key: "educational-institutions", title: "Education", desc: "Safe learning campuses", icon: GraduationCap },
  { key: "warehouses", title: "Warehouses", desc: "Large-span storage", icon: Warehouse },
];

const whatsappNumber = company.phone2.replace(/\D/g, "");

/* ===== MOTION VARIANTS ===== */
const navbarEntrance: Variants = {
  hidden: { y: -110, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 16, mass: 0.9, delay: 0.05 } },
};

const menuStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, y: -14, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const megaShell: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 27 } },
  exit: { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.18, ease: "easeIn" } },
};

const mobileStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const mobileItem: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 28 } },
};

/* ===== MAGNETIC PRIMITIVE ===== */
function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Center-growing animated underline shown on nav item hover. */
function Underline() {
  return (
    <span className="absolute -bottom-1 left-1/2 h-[2px] w-3/4 -translate-x-1/2 origin-center scale-x-0 rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.7)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
  );
}

/* ===== ICON ACTION ===== */
function IconAction({ href, label, external, bounce, children, onClick }: {
  href: string; label: string; external?: boolean; bounce?: boolean; children: ReactNode; onClick?: () => void;
}) {
  return (
    <Magnetic strength={0.4}>
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={label}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        whileHover={bounce ? { y: -5, scale: 1.08 } : { scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 380, damping: 16 }}
        className="group relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-white/70 text-[var(--heading)] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl transition-colors duration-300 hover:border-primary/40 hover:text-primary dark:bg-white/5"
      >
        <span className="absolute inset-0 rounded-full bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10" />
        <span className="relative">{children}</span>
      </motion.a>
    </Magnetic>
  );
}

/* ===== CTA BUTTON ===== */
function CTAButton({ onClick, className, full }: { onClick?: () => void; className?: string; full?: boolean }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((p) => [...p, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
    window.setTimeout(() => setRipples((p) => p.filter((rp) => rp.id !== id)), 700);
  };

  return (
    <Link
      href="/contact"
      onClick={(e) => { addRipple(e); onClick?.(); }}
      className={cn(
        "group relative flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] px-5 font-semibold text-white shadow-[0_10px_30px_rgba(34,197,94,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(34,197,94,0.55)]",
        full && "w-full",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
      <AnimatePresence>
        {ripples.map((rp) => (
          <motion.span
            key={rp.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute h-5 w-5 rounded-full bg-white/60"
            style={{ left: rp.x - 10, top: rp.y - 10 }}
          />
        ))}
      </AnimatePresence>
      <span className="relative">Get Quote</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={2.5} />
    </Link>
  );
}

/* ===== THEME TOGGLE ===== */
function NavThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Hydration-safe mounted gate: server & first client render are identical
  // (placeholder), then this flips after hydration — prevents SSR/CSR mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes mounted pattern; runs once post-hydration to avoid the mismatch.
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : false;
  const label = mounted
    ? (isDark ? "Switch to light mode" : "Switch to dark mode")
    : "Toggle theme";

  return (
    <Magnetic strength={0.35}>
      <motion.button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={label}
        aria-pressed={isDark}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="group relative inline-flex h-[30px] w-[58px] shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-white/5 hover:border-primary/40"
      >
        {/* Track highlight behind active thumb */}
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-colors duration-300",
            isDark ? "bg-primary/15 dark:bg-primary/20" : "bg-white/10"
          )}
        />
        {/* Sun icon (light) */}
        <Sun
          className={cn(
            "pointer-events-none absolute h-4 w-4 left-[8px] transition-colors duration-300",
            isDark ? "text-[var(--muted-foreground)]/40" : "text-[#16A34A]"
          )}
          strokeWidth={2}
        />
        {/* Moon icon (dark) */}
        <Moon
          className={cn(
            "pointer-events-none absolute h-4 w-4 right-[8px] transition-colors duration-300",
            isDark ? "text-[#22C55E]" : "text-[var(--muted-foreground)]/40"
          )}
          strokeWidth={2}
        />
        {/* Sliding thumb with active icon */}
        <motion.span
          layoutId="theme-thumb"
          className="absolute left-[5px] top-[3px] flex h-[24px] w-[24px] items-center justify-center rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="thumb-moon"
                initial={{ rotate: -120, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 120, scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex h-5 w-5 items-center justify-center rounded-full"
              >
                <Moon className="h-4 w-4 text-white" strokeWidth={2} style={{ filter: "drop-shadow(0 0 6px rgba(34,197,94,0.8))" }} />
              </motion.span>
            ) : (
              <motion.span
                key="thumb-sun"
                initial={{ rotate: 120, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -120, scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex h-5 w-5 items-center justify-center rounded-full"
              >
                <Sun className="h-4 w-4 text-[#111827] dark:text-white" strokeWidth={2} style={{ filter: "drop-shadow(0 0 6px rgba(34,197,94,0.8))" }} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </motion.button>
    </Magnetic>
  );
}

/* ===== MEGA MENU PANELS ===== */
function ProductsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="w-[600px] rounded-3xl border border-[var(--border)] bg-[var(--dropdown-background)] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.10)] backdrop-blur-3xl dark:border-white/10 dark:shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-2 gap-1.5">
        {productMenu.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} onClick={onNavigate}
            className="group flex items-start gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-primary/10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
              <p.icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-[var(--heading)] transition-colors group-hover:text-primary">{p.title}</span>
              <span className="block text-xs text-[var(--muted-text)]">{p.desc}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent-glow/10 p-3.5">
        <div className="min-w-0">
          <span className="block text-sm font-semibold text-[var(--heading)]">Need technical specifications?</span>
          <span className="block text-xs text-[var(--muted-text)]">Download the full product brochure.</span>
        </div>
        <Link href="/contact" onClick={onNavigate}
          className="group/btn relative flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(34,197,94,0.35)] transition-all duration-300 hover:-translate-y-0.5">
          Get Quote
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

function ProjectsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="w-[680px] rounded-3xl border border-[var(--border)] bg-[var(--dropdown-background)] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.10)] backdrop-blur-3xl dark:border-white/10 dark:shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-3 gap-1.5">
        {projectMenu.map((p) => (
          <Link key={p.key} href={`/projects/${p.key}`} onClick={onNavigate}
            className="group flex flex-col items-start gap-3 rounded-2xl p-4 transition-colors duration-300 hover:bg-primary/10">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
              <p.icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[var(--heading)] transition-colors group-hover:text-primary">{p.title}</span>
              <span className="block text-xs text-[var(--muted-text)]">{p.desc}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent-glow/10 p-3.5">
        <div className="min-w-0">
          <span className="block text-sm font-semibold text-[var(--heading)]">Explore our portfolio</span>
          <span className="block text-xs text-[var(--muted-text)]">View completed, ongoing &amp; upcoming landmark projects.</span>
        </div>
        <Link href="/projects" onClick={onNavigate}
          className="group/btn relative flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(34,197,94,0.35)] transition-all duration-300 hover:-translate-y-0.5">
          All Projects
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <motion.button onClick={onClick} aria-label={open ? "Close menu" : "Open menu"}
      whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-white/70 text-[var(--heading)] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl dark:bg-white/5">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
            <X className="h-5 w-5" strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
            <Menu className="h-5 w-5" strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function PremiumNavbar() {
  // Scrolled once the user travels ~50px. Initialises to `false` so SSR and the
  // first client render are identical (no hydration mismatch); the scroll
  // listener is attached only in a browser `useEffect`.
  const isScrolled = useScrollState(50);
  // Two visual states only: a fully transparent navbar over the hero at the top,
  // then a premium glassmorphism bar once the user scrolls ~50px. Theme and
  // scroll state compose independently (dark/light × top/scrolled).
  const solidState = isScrolled;
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Reset transient UI when the route changes (render-time adjustment pattern).
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeAll = () => setOpenDropdown(null);
  const closeMobile = () => setMobileOpen(false);
  const isActive = (href: string, dropdown?: DropdownKey) =>
    dropdown ? pathname === href || pathname.startsWith(href) : pathname === href;

  return (
    <>
      <motion.header variants={navbarEntrance} initial="hidden" animate="visible" className="fixed inset-x-0 top-0 z-50 w-full">
        {/* Full-width glassmorphism background — edge-to-edge across the entire
            viewport (top: 0 / left: 0 / right: 0, no insets, no outer radius).
            Fully transparent over the hero at the top, then an elegant frosted
            glass bar once scrolled. Only this background layer is full width;
            the navigation content below stays centered in its own container. */}
        <motion.div
          initial={false}
          animate={{ opacity: solidState ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-none absolute inset-0 z-0 border-b transition-all duration-500",
            isScrolled
              ? "border-[var(--border)] bg-[var(--navbar-glass)] shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.30)]"
              : "border-transparent bg-transparent"
          )}
          style={{
            backdropFilter: isScrolled ? "blur(22px) saturate(160%)" : "blur(0px)",
          }}
        />
        {/* Ambient green glow (hidden over the transparent hero so it never breaks the
            integrated look; fades back in subtly with the glass bar after scroll) */}
        <div className={cn("pointer-events-none absolute inset-x-0 top-0 z-0 transition-opacity duration-700", solidState ? "opacity-100" : "opacity-0")}>
          <div className="absolute left-1/2 top-0 h-44 w-[min(84vw,760px)] -translate-x-1/2 rounded-full bg-[#16A34A]/25 blur-[90px] dark:bg-[#22C55E]/20" />
        </div>

        {/* Bar / floating panel */}
        <div className={cn("relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 lg:px-8", "h-[80px]", solidState && "h-[64px] sm:h-[68px]")}>
          {/* Logo — left */}
          <div className="flex shrink-0 items-center">
            <Magnetic strength={0.2}>
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="group relative">
                <Link href="/" aria-label="Klavetek — Home" className="group relative flex items-center">
                  <motion.span whileHover={{ scale: 1.06, rotate: 2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="relative block">
                    <span className="absolute inset-0 rounded-2xl bg-primary/0 blur-xl transition-all duration-500 group-hover:bg-primary/35" />
                    <span className="relative block transition-all duration-500">
                      <Image src="/logos/logo.png" alt="Klavetek Green Blocks & Tiles" width={88} height={56} priority quality={100}
                        className={cn("h-auto w-auto object-contain transition-all duration-700", solidState ? "h-[46px]" : "h-[52px]")} />
                    </span>
                  </motion.span>
                </Link>
              </motion.div>
            </Magnetic>
          </div>

          {/* Center nav — desktop */}
          <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:block">
            <motion.ul variants={menuStagger} initial="hidden" animate="visible" className="pointer-events-auto m-0 flex list-none items-center gap-4 p-0 2xl:gap-8 3xl:gap-11">
              {navItems.map((item) => {
                const active = isActive(item.href, item.dropdown);
                const hasDropdown = !!item.dropdown;
                return (
                  <motion.li key={item.name} variants={menuItem} className="relative"
                    onMouseEnter={() => item.dropdown && setOpenDropdown(item.dropdown)}
                    onMouseLeave={() => setOpenDropdown(null)}>
                    <Magnetic strength={0.22}>
                      <Link href={item.href} onClick={closeAll}
                        className={cn("group relative flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[15px] font-semibold tracking-[0.2px] transition-colors duration-300 hover:-translate-y-px 2xl:px-4",
                          active
                            ? "text-primary"
                            : cn("hover:text-primary", isScrolled ? "text-[var(--heading)] dark:text-white/95" : "text-white/95"))}>
                        {active && (
                          <motion.span layoutId="desktopActivePill" className="absolute inset-0 rounded-full border border-primary/30 bg-primary/10"
                            style={{ boxShadow: "0 0 24px rgba(var(--primary-rgb),0.35), inset 0 0 14px rgba(var(--primary-rgb),0.15)" }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                        )}
                        <span className="relative z-10">{item.name}</span>
                        {hasDropdown && (
                          <motion.span initial={false} animate={{ rotate: openDropdown === item.dropdown ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="relative z-10">
                            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                          </motion.span>
                        )}
                        {!active && <Underline />}
                      </Link>
                    </Magnetic>
                    {hasDropdown && (
                      <AnimatePresence>
                        {openDropdown === item.dropdown && (
                          <motion.div variants={megaShell} initial="hidden" animate="visible" exit="exit" className="absolute left-1/2 top-full -translate-x-1/2 z-50 pt-5">
                            {item.dropdown === "products" ? <ProductsPanel onNavigate={closeAll} /> : <ProjectsPanel onNavigate={closeAll} />}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          {/* Right actions */}
          <div className="pointer-events-auto flex shrink-0 items-center gap-2.5">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="hidden items-center gap-2.5 xl:flex"
            >
              <NavThemeToggle />
              <div className="hidden items-center gap-2.5 2xl:flex">
                <IconAction href={`tel:${company.phone.replace(/\s/g, "")}`} label="Call Klavetek" onClick={closeAll}>
                  <Phone className="h-[18px] w-[18px]" strokeWidth={2} />
                </IconAction>
                <IconAction href={`https://wa.me/${whatsappNumber}`} label="Chat on WhatsApp" external bounce>
                  <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2} />
                </IconAction>
              </div>
              <CTAButton onClick={closeAll} />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-2.5 xl:hidden">
              <NavThemeToggle />
              <Hamburger open={mobileOpen} onClick={() => setMobileOpen((p) => !p)} />
            </motion.div>
          </div>


        </div>
      </motion.header>

      {/* Mobile menu — slide from right */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeMobile} className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm xl:hidden" />
            <motion.aside key="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[60] flex w-[min(92vw,420px)] flex-col border-l border-[var(--border)] bg-[var(--dropdown-background)] shadow-2xl backdrop-blur-2xl xl:hidden">
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
                <Link href="/" onClick={closeMobile} className="flex items-center">
                  <Image src="/logos/logo.png" alt="Klavetek" width={80} height={50} className="h-[40px] w-auto object-contain" />
                </Link>
                <Hamburger open onClick={closeMobile} />
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 overflow-y-auto px-3 py-5">
                <motion.ul key="mobile-links" variants={mobileStagger} initial="hidden" animate="visible" className="m-0 flex list-none flex-col gap-1 p-0">
                  {navItems.map((item) => {
                    const active = isActive(item.href, item.dropdown);
                    return (
                      <motion.li key={item.name} variants={mobileItem}>
                        <Link href={item.href} onClick={closeMobile}
                          className={cn("group flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition-colors duration-300",
                            active ? "border border-primary/30 bg-primary/10 text-primary" : "text-[var(--heading)] hover:bg-primary/5 hover:text-primary")}>
                          <span>{item.name}</span>
                          <motion.span whileHover={{ x: 4 }}
                            className={cn("flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)]",
                              active ? "border-primary/40 text-primary" : "text-[var(--muted-text)] group-hover:text-primary")}>
                            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                          </motion.span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              {/* Drawer footer actions */}
              <motion.div variants={mobileStagger} initial="hidden" animate="visible" className="space-y-4 border-t border-[var(--border)] px-6 py-6">
                <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} onClick={closeMobile}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-primary/40 hover:text-primary">
                    <Phone className="h-4 w-4" strokeWidth={2} /> Call
                  </a>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" onClick={closeMobile}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-primary/40 hover:text-primary">
                    <MessageCircle className="h-4 w-4 text-[#22C55E]" strokeWidth={2} /> WhatsApp
                  </a>
                </div>
                <CTAButton onClick={closeMobile} full />
                <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-[var(--muted-text)]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                  ISI-certified AAC blocks since 2010
                </div>
              </motion.div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </>
  );
}




