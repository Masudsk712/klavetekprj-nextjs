# Premium Enterprise Color System — Bulk Replacement Script
# Replaces all old bright green / neutral hex colors with new CSS variable references

$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts","*.css"

$replacements = @(
    # ====== GREEN HEX COLORS in Tailwind classes [HEX] -> @theme utility name ======
    # Primary green -> primary
    @{Pattern = '\[#059669\]'; Replacement = 'primary'},
    @{Pattern = '\[#10B981\]'; Replacement = 'primary'},
    @{Pattern = '\[#16a34a\]'; Replacement = 'primary'},
    @{Pattern = '\[#4CAF50\]'; Replacement = 'primary'},
    @{Pattern = '\[#59C22E\]'; Replacement = 'primary'},

    # Primary hover -> primary-hover
    @{Pattern = '\[#047857\]'; Replacement = 'primary-hover'},
    @{Pattern = '\[#065F46\]'; Replacement = 'primary-hover'},
    @{Pattern = '\[#064E3B\]'; Replacement = 'primary-hover'},
    @{Pattern = '\[#2E7D32\]'; Replacement = 'primary-hover'},
    @{Pattern = '\[#2F7A18\]'; Replacement = 'primary-hover'},

    # Accent glow -> accent-glow
    @{Pattern = '\[#34D399\]'; Replacement = 'accent-glow'},
    @{Pattern = '\[#4ade80\]'; Replacement = 'accent-glow'},
    @{Pattern = '\[#22c55e\]'; Replacement = 'accent-glow'},
    @{Pattern = '\[#66BB6A\]'; Replacement = 'accent-glow'},
    @{Pattern = '\[#7ED957\]'; Replacement = 'accent-glow'},
    @{Pattern = '\[#25D366\]'; Replacement = 'accent-glow'},

    # ====== GREEN HEX COLORS in inline styles (quoted) -> CSS variable ======
    @{Pattern = '"#059669"'; Replacement = '"var(--primary)"'},
    @{Pattern = '"#10B981"'; Replacement = '"var(--primary)"'},
    @{Pattern = '"#16a34a"'; Replacement = '"var(--primary)"'},
    @{Pattern = '"#4CAF50"'; Replacement = '"var(--primary)"'},
    @{Pattern = '"#59C22E"'; Replacement = '"var(--primary)"'},
    @{Pattern = '"#047857"'; Replacement = '"var(--primary-hover)"'},
    @{Pattern = '"#065F46"'; Replacement = '"var(--primary-hover)"'},
    @{Pattern = '"#064E3B"'; Replacement = '"var(--primary-hover)"'},
    @{Pattern = '"#2E7D32"'; Replacement = '"var(--primary-hover)"'},
    @{Pattern = '"#2F7A18"'; Replacement = '"var(--primary-hover)"'},
    @{Pattern = '"#34D399"'; Replacement = '"var(--accent-glow)"'},
    @{Pattern = '"#4ade80"'; Replacement = '"var(--accent-glow)"'},
    @{Pattern = '"#22c55e"'; Replacement = '"var(--accent-glow)"'},
    @{Pattern = '"#66BB6A"'; Replacement = '"var(--accent-glow)"'},
    @{Pattern = '"#7ED957"'; Replacement = '"var(--accent-glow)"'},
    @{Pattern = '"#25D366"'; Replacement = '"var(--accent-glow)"'},

    # ====== NEUTRAL HEX COLORS in Tailwind classes [HEX] -> CSS variable ======
    @{Pattern = '\[#F5F5F7\]'; Replacement = '[var(--secondary-bg)]'},
    @{Pattern = '\[#1C1C1E\]'; Replacement = '[var(--background)]'},
    @{Pattern = '\[#0A0A0B\]'; Replacement = '[var(--background)]'},
    @{Pattern = '\[#111827\]'; Replacement = '[var(--secondary-bg)]'},
    @{Pattern = '\[#2C2C2E\]'; Replacement = '[var(--surface)]'},
    @{Pattern = '\[#3A3A3C\]'; Replacement = '[var(--surface)]'},
    @{Pattern = '\[#FAFAFA\]'; Replacement = '[var(--surface)]'},

    # ====== NEUTRAL HEX COLORS in inline styles (quoted) -> CSS variable ======
    @{Pattern = '"#F5F5F7"'; Replacement = '"var(--secondary-bg)"'},
    @{Pattern = '"#1C1C1E"'; Replacement = '"var(--background)"'},
    @{Pattern = '"#0A0A0B"'; Replacement = '"var(--background)"'},
    @{Pattern = '"#111827"'; Replacement = '"var(--secondary-bg)"'},
    @{Pattern = '"#2C2C2E"'; Replacement = '"var(--surface)"'},
    @{Pattern = '"#3A3A3C"'; Replacement = '"var(--surface)"'},
    @{Pattern = '"#FAFAFA"'; Replacement = '"var(--surface)"'},

    # ====== rgba GREEN values -> CSS variable-based rgba ======
    @{Pattern = 'rgba\(5,\s*150,\s*105,'; Replacement = 'rgba(var(--primary-rgb),'},
    @{Pattern = 'rgba\(16,\s*185,\s*129,'; Replacement = 'rgba(var(--primary-rgb),'},
    @{Pattern = 'rgba\(34,\s*197,\s*94,'; Replacement = 'rgba(var(--accent-glow-rgb),'},
    @{Pattern = 'rgba\(37,\s*211,\s*102,'; Replacement = 'rgba(var(--accent-glow-rgb),'},

    # ====== rgba NEUTRAL values -> new RGB values ======
    @{Pattern = 'rgba\(28,\s*28,\s*30,'; Replacement = 'rgba(0, 0, 0,'},
    @{Pattern = 'rgba\(10,\s*10,\s*10,'; Replacement = 'rgba(9, 9, 11,'},
    @{Pattern = 'rgba\(11,\s*15,\s*10,'; Replacement = 'rgba(9, 9, 11,'},
    @{Pattern = 'rgba\(17,\s*24,\s*39,'; Replacement = 'rgba(9, 9, 11,'},

    # ====== Tailwind built-in GRAY classes -> CSS variable arbitrary values ======
    # Text colors
    @{Pattern = 'text-gray-900'; Replacement = 'text-[var(--heading)]'},
    @{Pattern = '