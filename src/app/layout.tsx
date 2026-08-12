import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gutfeel — Eat Confidently | Low FODMAP Meal Planner",
  description:
    "Personalized low FODMAP meal plans, symptom tracking, and trigger detection. Built for India and beyond. Not medical advice.",
  keywords: [
    "low FODMAP",
    "IBS",
    "meal planner",
    "FODMAP diet",
    "gut health",
    "digestive health",
    "IBS diet",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-mark.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Gutfeel — Eat Confidently",
    description: "Personalized low FODMAP meal plans that learn YOUR triggers.",
    url: "https://gutfeel.pages.dev",
    siteName: "Gutfeel",
    images: [{ url: "/logo.png", width: 440, height: 375, alt: "Gutfeel logo" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-stone-900 font-sans">{children}</body>
    </html>
  );
}
