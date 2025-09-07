import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Cursor from "@/components/ui/Cursor";
import { Analytics } from "@vercel/analytics/react";
import BackToTop from "@/components/ui/BackToTop";
import EasterEgg from "@/components/ui/EasterEgg";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // 👉 replace on deploy
  title: "Aditya Raj Singh — Portfolio",
  description: "Minimal code, maximal impact.",
  authors: [{ name: "Aditya Raj Singh" }],
  creator: "Aditya Raj Singh",
  openGraph: {
    title: "Aditya Raj Singh — Portfolio",
    description: "Minimal code, maximal impact.",
    url: "https://your-domain.com",   // 👉 replace on deploy
    siteName: "Aditya Raj Singh — Portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Portfolio preview" }], // put og.png in /public
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Raj Singh — Portfolio",
    description: "Minimal code, maximal impact.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-white text-base-900 dark:bg-base-900 dark:text-base-100 transition-colors">
        <Header />
        <EasterEgg />
        <Cursor />
        <main className="pt-16">{children}</main>
        <Analytics /> {/* Vercel Analytics */}
        <BackToTop />
      </body>
    </html>
  );
}
