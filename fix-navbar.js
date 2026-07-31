const fs = require("fs");
const file = "src/components/layout/Navbar/PremiumNavbar.tsx";
let c = fs.readFileSync(file, "utf8");

// Fix mobile action buttons - bg-white/5 -> bg-[var(--surface-2)]/5
c = c.split("bg-white/5 hover:bg-primary/10 hover:border-primary/30").join("bg-[var(--surface-2)]/5 hover:bg-primary/10 hover:border-primary/30");

// Fix icon div - remove dark variants, use CSS variable
c = c.split("bg-white/5 group-hover:bg-primary/20 dark:bg-[var(--surface-2)]/50 dark:group-hover:bg-primary/20").join("bg-[var(--surface-2)]/5 group-hover:bg-primary/20");

// Fix Phone icon text
c = c.split("text-white group-hover:text-primary dark:text-[var(--body-text)] dark:group-hover:text-primary").join("text-[var(--body-text)] group-hover:text-primary");

// Fix span text
c = c.split("text-white/80 font-poppins font-medium group-hover:text-white dark:text-[var(--body-text)] dark:group-hover:text-[var(--heading)]").join("text-[var(--body-text)] font-poppins font-medium group-hover:text-[var(--heading)]");

// Fix desktop nav links
c = c.split("text-white/80 hover:text-white").join("text-[var(--body-text)] hover:text-[var(--heading)]");

// Fix Phone button icon
c = c.split('text-white dark:text-[var(--heading)]" strokeWidth={2} />').join('text-[var(--heading)]" strokeWidth={2} />');

// Fix Menu/X buttons
c = c.split('text-white dark:text-[var(--muted-text)]" strokeWidth={2.5} />').join('text-[var(--muted-text)]" strokeWidth={2.5} />');

// Fix mobile divider
c = c.split("via-white/10").join("via-[var(--border)]");

fs.writeFileSync(file, c, "utf8");
console.log("Navbar fixed!");
