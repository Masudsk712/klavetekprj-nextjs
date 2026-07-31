const fs = require("fs");
const path = require("path");

const replacements = [
  // Green hex in Tailwind classes [HEX] -> @theme utility
  ["[#059669]", "primary"],
  ["[#10B981]", "primary"],
  ["[#16a34a]", "primary"],
  ["[#4CAF50]", "primary"],
  ["[#59C22E]", "primary"],
  ["[#047857]", "primary-hover"],
  ["[#065F46]", "primary-hover"],
  ["[#064E3B]", "primary-hover"],
  ["[#2E7D32]", "primary-hover"],
  ["[#2F7A18]", "primary-hover"],
  ["[#34D399]", "accent-glow"],
  ["[#4ade80]", "accent-glow"],
  ["[#22c55e]", "accent-glow"],
  ["[#66BB6A]", "accent-glow"],
  ["[#7ED957]", "accent-glow"],
  ["[#25D366]", "accent-glow"],

  // Green hex in inline styles (quoted) -> CSS variable
  ['"#059669"', '"var(--primary)"'],
  ['"#10B981"', '"var(--primary)"'],
  ['"#16a34a"', '"var(--primary)"'],
  ['"#4CAF50"', '"var(--primary)"'],
  ['"#59C22E"', '"var(--primary)"'],
  ['"#047857"', '"var(--primary-hover)"'],
  ['"#065F46"', '"var(--primary-hover)"'],
  ['"#064E3B"', '"var(--primary-hover)"'],
  ['"#2E7D32"', '"var(--primary-hover)"'],
  ['"#2F7A18"', '"var(--primary-hover)"'],
  ['"#34D399"', '"var(--accent-glow)"'],
  ['"#4ade80"', '"var(--accent-glow)"'],
  ['"#22c55e"', '"var(--accent-glow)"'],
  ['"#66BB6A"', '"var(--accent-glow)"'],
  ['"#7ED957"', '"var(--accent-glow)"'],
  ['"#25D366"', '"var(--accent-glow)"'],

  // Neutral hex in Tailwind classes [HEX] -> CSS variable
  ["[#F5F5F7]", "[var(--secondary-bg)]"],
  ["[#1C1C1E]", "[var(--background)]"],
  ["[#0A0A0B]", "[var(--background)]"],
  ["[#111827]", "[var(--secondary-bg)]"],
  ["[#2C2C2E]", "[var(--surface)]"],
  ["[#3A3A3C]", "[var(--surface)]"],
  ["[#FAFAFA]", "[var(--surface)]"],

  // Neutral hex in inline styles (quoted) -> CSS variable
  ['"#F5F5F7"', '"var(--secondary-bg)"'],
  ['"#1C1C1E"', '"var(--background)"'],
  ['"#0A0A0B"', '"var(--background)"'],
  ['"#111827"', '"var(--secondary-bg)"'],
  ['"#2C2C2E"', '"var(--surface)"'],
  ['"#3A3A3C"', '"var(--surface)"'],
  ['"#FAFAFA"', '"var(--surface)"'],

  // rgba GREEN -> CSS variable-based rgba
  ["rgba(5, 150, 105,", "rgba(var(--primary-rgb),"],
  ["rgba(16, 185, 129,", "rgba(var(--primary-rgb),"],
  ["rgba(34, 197, 94,", "rgba(var(--accent-glow-rgb),"],
  ["rgba(37, 211, 102,", "rgba(var(--accent-glow-rgb),"],
  ["rgba(5,150,105,", "rgba(var(--primary-rgb),"],
  ["rgba(16,185,129,", "rgba(var(--primary-rgb),"],
  ["rgba(34,197,94,", "rgba(var(--accent-glow-rgb),"],
  ["rgba(37,211,102,", "rgba(var(--accent-glow-rgb),"],

  // rgba NEUTRAL -> new RGB
  ["rgba(28, 28, 30,", "rgba(0, 0, 0,"],
  ["rgba(28,28,30,", "rgba(0, 0, 0,"],
  ["rgba(10, 10, 10,", "rgba(9, 9, 11,"],
  ["rgba(10,10,10,", "rgba(9, 9, 11,"],
  ["rgba(11, 15, 10,", "rgba(9, 9, 11,"],
  ["rgba(11,15,10,", "rgba(9, 9, 11,"],
  ["rgba(17, 24, 39,", "rgba(9, 9, 11,"],
  ["rgba(17,24,39,", "rgba(9, 9, 11,"],

  // Tailwind gray classes -> CSS variable arbitrary values
  ["text-gray-900", "text-[var(--heading)]"],
  ["text-gray-800", "text-[var(--heading)]"],
  ["text-gray-700", "text-[var(--body-text)]"],
  ["text-gray-600", "text-[var(--body-text)]"],
  ["text-gray-500", "text-[var(--muted-text)]"],
  ["text-gray-400", "text-[var(--muted-text)]"],
  ["text-gray-300", "text-[var(--body-text)]"],
  ["text-gray-200", "text-[var(--muted-text)]"],
  ["bg-gray-50", "bg-[var(--secondary-bg)]"],
  ["bg-gray-100", "bg-[var(--surface-2)]"],
  ["bg-gray-200", "bg-[var(--surface-2)]"],
  ["bg-gray-300", "bg-[var(--surface-2)]"],
  ["bg-gray-700", "bg-[var(--surface)]"],
  ["bg-gray-800", "bg-[var(--surface)]"],
  ["bg-gray-900", "bg-[var(--secondary-bg)]"],
  ["border-gray-100", "border-[var(--border)]"],
  ["border-gray-200", "border-[var(--border)]"],
  ["border-gray-300", "border-[var(--border)]"],
  ["border-gray-700", "border-[var(--border)]"],
  ["border-gray-800", "border-[var(--border)]"],

  // border-white low opacity -> CSS variable border
  ["border-white/10", "border-[var(--border)]"],
  ["border-white/15", "border-[var(--border)]"],

  // text-black -> CSS variable heading
  ["text-black", "text-[var(--heading)]"],
];

// Regex replacements (for patterns that need lookahead/lookbehind)
const regexReplacements = [
  // bg-white NOT followed by / (avoid matching bg-white/5, bg-white/10, etc.)
  [/bg-white(?!\/)/g, "bg-[var(--surface)]"],
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (/\.(tsx|ts|css)$/.test(item.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walkDir("src");
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;
  for (const [pattern, replacement] of replacements) {
    content = content.split(pattern).join(replacement);
  }
  for (const [regex, replacement] of regexReplacements) {
    content = content.replace(regex, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    count++;
    console.log("Updated: " + path.basename(file));
  }
}
console.log("Total files updated: " + count);
