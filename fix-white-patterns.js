const fs = require("fs");
const path = require("path");

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) results = results.concat(walkDir(fullPath));
    else if (/\.(tsx|ts|css)$/.test(item.name)) results.push(fullPath);
  }
  return results;
}

const D = String.fromCharCode(45) + String.fromCharCode(45);

const fixes = [
  ["bg-white/90", "bg-[var(" + D + "surface)]/90"],
  ["bg-white/80", "bg-[var(" + D + "surface)]/80"],
  ["bg-white/70", "bg-[var(" + D + "surface)]/70"],
  ["bg-white/20", "bg-[var(" + D + "surface-2)]/20"],
  ["bg-white/10", "bg-[var(" + D + "surface-2)]/10"],
  ["bg-white/5", "bg-[var(" + D + "surface-2)]/5"],
  ["bg-white/[0.03]", "bg-[var(" + D + "surface-2)]/[0.03]"],
  ["bg-white/[0.06]", "bg-[var(" + D + "surface-2)]/[0.06]"],
  ["bg-white/[0.12]", "bg-[var(" + D + "surface-2)]/[0.12]"],
  ["border-white/25", "border-[var(" + D + "border)]"],
  ["border-white/20", "border-[var(" + D + "border)]"],
  ["border-white/40", "border-[var(" + D + "border)]"],
  ["dark:border-white/5", "dark:border-[var(" + D + "border)]"],
];

const files = walkDir("src");
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;
  for (const [pattern, replacement] of fixes) {
    content = content.split(pattern).join(replacement);
  }
  content = content.replace(/  +/g, " ");
  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    count++;
    console.log("Updated: " + path.basename(file));
  }
}
console.log("Total files updated: " + count);
