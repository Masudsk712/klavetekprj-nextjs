import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import Layout from "@/components/layout/Layout";
import StructuredData from "@/components/shared/StructuredData";
import { companyName, homeTitle, homeDescription, siteUrl } from "@/constants/seo";

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
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "AAC blocks in Malda",
    "AAC block manufacturer in Malda",
    "AAC block factory in Malda",
    "AAC block supplier in Malda",
    "lightweight blocks in Malda",
    "autoclaved aerated concrete blocks",
    "construction blocks in Malda",
    "AAC blocks in West Bengal",
    "Klavetek",
    "building materials Malda",
  ],
  authors: [{ name: companyName }],
  creator: companyName,
  publisher: companyName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: companyName,
    title: homeTitle,
    description: homeDescription,
    images: [
      {
        url: "/images/about/about-hero.webp",
        width: 1200,
        height: 630,
        alt: "Klavetek — AAC block manufacturer in Malda, West Bengal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
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
    <html lang="en-IN" suppressHydrationWarning data-scroll-behavior="smooth">
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
