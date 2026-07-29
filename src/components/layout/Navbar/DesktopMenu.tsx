"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { navigation } from "@/constants/navigation";

export default function DesktopMenu() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main Navigation">
      <ul className="flex items-center gap-8">
        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={`relative py-2 text-[15px] font-medium transition-colors duration-300 ${
                  active
                    ? "text-[var(--primary)]"
                    : "text-[var(--black)] hover:text-[var(--primary)]"
                }`}
              >
                {item.name}

                {active && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[var(--primary)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}