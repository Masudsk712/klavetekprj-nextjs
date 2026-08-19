// Converts scroll-triggered `whileInView` visibility reveals to guaranteed
// mount-triggered `animate` reveals in the homepage + shared components.
// Root-cause fix: whileInView (IntersectionObserver) reveals were unreliable,
// leaving content stuck at opacity:0. `animate` fires on mount -> guaranteed.
import { readFileSync, writeFileSync } from "node:fs";

const files = [
  "src/components/home/AboutPreview.tsx",
  "src/components/home/Applications.tsx",
  "src/components/home/CinematicCTA.tsx",
  "src/components/home/ComparisonTable.tsx",
  "src/components/home/FAQ.tsx",
  "src/components/home/GalleryPreview.tsx",
  "src/components/home/ManufacturingProcess.tsx",
  "src/components/home/TechnicalSpecs.tsx",
  "src/components/home/TrustBar.tsx",
  "src/components/home/WhyKlavetekStandsOut.tsx",
  "src/components/shared/SectionHeader.tsx",
  "src/components/shared/GlassCard.tsx",
  "src/components/shared/SectionDivider.tsx",
  "src/components/products/ProductCardGrid.tsx",
];

let total = 0;
for (const file of files) {
  let src = readFileSync(file, "utf8");
  const before = (src.match(/whileInView/g) || []).length;

  // 1) string form: whileInView="visible" -> animate="visible"
  src = src.replace(/whileInView="visible"/g, 'animate="visible"');

  // 2) object form (multi-line possible): whileInView={{ ... }} -> animate={{ ... }}
  src = src.replace(/whileInView=\{(\{[^]*?\})\}/gs, 'animate={$1}');

  const after = (src.match(/whileInView/g) || []).length;
  const changed = before - after;
  if (changed) {
    writeFileSync(file, src, "utf8");
    console.log(`${file}: converted ${changed} whileInView -> animate`);
    total += changed;
  } else {
    console.log(`${file}: no change`);
  }
}
console.log(`TOTAL converted: ${total}`);
