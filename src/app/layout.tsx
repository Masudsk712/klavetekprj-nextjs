import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import Layout from "@/components/layout/Layout";
import StructuredData from "@/components/shared/StructuredData";

const inter = Inter({
 subsets: ["latin"],
 variable: "--font-inter",
 display: "swap",
});

const poppins = Poppins({
 subsets: ["latin"],
 variable: "--font-poppins",
 weight: ["300", "400", "500", "600", "700", "800"],
 display: "swap",
});

export const metadata: Metadata = {
 title: "Klavetek Green Blocks & Tiles Pvt. Ltd. | Premium AAC Block Manufacturer",
 description:
 "Klavetek manufactures premium ISI-certified AAC blocks in 100mm, 125mm, 150mm, 200mm & 250mm sizes. Sustainable, lightweight, fire-resistant building materials since 2020.",
 keywords: [
 "AAC blocks",
 "AAC block manufacturer",
 "Klavetek",
 "autoclaved aerated concrete",
 "green building materials",
 "fly ash bricks",
 "construction materials West Bengal",
 "ISI certified AAC blocks",
 "lightweight blocks",
 "eco-friendly bricks",
 ],
 authors: [{ name: "Klavetek Green Blocks & Tiles Pvt. Ltd." }],
 creator: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
 publisher: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
 metadataBase: new URL("https://kgbt.in"),
 alternates: {
 canonical: "/",
 },
 openGraph: {
 type: "website",
 locale: "en_IN",
 url: "https://kgbt.in",
 siteName: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
 title: "Klavetek Green Blocks & Tiles | Premium AAC Block Manufacturer",
 description:
 "ISI-certified AAC blocks manufactured with German technology. Sustainable, lightweight, fire-resistant building materials since 2020.",
 images: [
 {
 url: "/images/about/about-hero.webp",
 width: 1200,
 height: 630,
 alt: "Klavetek Green Blocks & Tiles Pvt. Ltd.",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Klavetek Green Blocks & Tiles | Premium AAC Block Manufacturer",
 description:
 "ISI-certified AAC blocks manufactured with German technology. Sustainable, lightweight, fire-resistant building materials since 2020.",
 images: ["/images/about/about-hero.webp"],
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 "max-image-preview": "large",
 "max-snippet": -1,
 },
 },
 icons: {
 icon: "/logos/logo.png",
 apple: "/logos/logo.png",
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
 <body className={`${inter.variable} ${poppins.variable}`}>
 <StructuredData />
 <ThemeProvider>
 <Layout>
 {children}
 </Layout>
 </ThemeProvider>
 </body>
 </html>
 );
}


