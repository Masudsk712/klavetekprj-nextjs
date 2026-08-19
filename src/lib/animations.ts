import type { Variants, Transition } from "framer-motion";

// Shared easing curves
export const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
export const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const baseTransition: Transition = {
 duration: 0.7,
 ease: easePremium,
};

// Fade Up
export const fadeUp: Variants = {
 hidden: { opacity: 0, y: 32 },
 visible: { opacity: 1, y: 0, transition: baseTransition },
};

// Fade Down
export const fadeDown: Variants = {
 hidden: { opacity: 0, y: -32 },
 visible: { opacity: 1, y: 0, transition: baseTransition },
};

// Fade Left
export const fadeLeft: Variants = {
 hidden: { opacity: 0, x: -40 },
 visible: { opacity: 1, x: 0, transition: baseTransition },
};

// Fade Right
export const fadeRight: Variants = {
 hidden: { opacity: 0, x: 40 },
 visible: { opacity: 1, x: 0, transition: baseTransition },
};

// Scale
export const scaleIn: Variants = {
 hidden: { opacity: 0, scale: 0.92 },
 visible: { opacity: 1, scale: 1, transition: baseTransition },
};

// Stagger container
export const staggerContainer: Variants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.1,
 delayChildren: 0.05,
 },
 },
};

export const staggerContainerFast: Variants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.06,
 },
 },
};

// Item for stagger
export const staggerItem: Variants = {
 hidden: { opacity: 0, y: 24 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
};

// Viewport defaults
//
// NOTE (root-cause fix): a negative rootMargin (e.g. "-80px") tightens the
// observed viewport, so large / last-on-page sections (Testimonials, FAQ,
// CinematicCTA) can stay just outside the shrunken observer box and their
// `whileInView` reveal never fires — leaving content stuck at opacity:0.
// Use a tolerant `amount` and NO shrinking margin so every reveal is reached.
export const viewportOnce = { once: true, amount: 0 } as const;

// Helper to create a delayed variant
export function withDelay(variants: Variants, delay: number): Variants {
 return {
 hidden: variants.hidden,
 visible: {
 ...(variants.visible as object),
 transition: { ...(variants.visible as { transition?: Transition }).transition, delay },
 },
 };
}