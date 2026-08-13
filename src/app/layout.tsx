import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-stone-900 font-sans">{children}</body>
    </html>
  );
}
