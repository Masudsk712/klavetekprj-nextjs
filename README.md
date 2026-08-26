# Klavetek Green Blocks & Tiles Pvt. Ltd.

Premium AAC (Autoclaved Aerated Concrete) block manufacturer website built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion v12, and Lucide React.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Runtime:** React 19
- **Styling:** Tailwind CSS v4 (CSS-first)
- **Motion:** Framer Motion v12
- **Icons:** Lucide React
- **Theme:** next-themes (class-based dark mode)
- **Utils:** clsx + tailwind-merge
- **Fonts:** Inter & Poppins (Google Fonts)
- **Email:** Resend (server-side API routes)

## Project Structure

```
src/
  app/        # Next.js App Router (routes, layout, globals, robots, sitemap)
  components/   # UI components (home, about, products, projects, contact, gallery, blog, career, layout, shared)
  data/         # Centralized content/data layer
  constants/    # Company info & social links
  hooks/        # Custom React hooks
  lib/          # Utilities (animations, mailer, validation, utils)
  providers/    # Theme provider
  types/        # Shared TypeScript types
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment Variables

Configure in `.env.local` (and on Vercel under Settings -> Environment Variables)
for contact & career form email delivery. The Resend client is built lazily at
request time, so the build succeeds even when the key is absent — a missing key
only produces a graceful runtime 500, never a build crash.

| Variable | Description |
|----------|-------------|
| RESEND_API_KEY | Resend API key (required; canonical — only accepted name) |
| EMAIL_FROM | Verified sender email |
| EMAIL_TO | Recipient email |

See `.env.example` for a template. Never commit real secrets.

## License

Private project — Klavetek Green Blocks & Tiles Pvt. Ltd.
