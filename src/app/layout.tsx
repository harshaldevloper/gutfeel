import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GutVista — Eat Confidently | Low FODMAP Meal Planner",
  description:
    "Personalized low FODMAP meal plans, AI plate scanning, symptom tracking, and trigger detection — worldwide. Works offline. Not medical advice.",
  keywords: [
    "low FODMAP",
    "IBS",
    "meal planner",
    "FODMAP diet",
    "gut health",
    "digestive health",
    "IBS diet",
    "AI food scanner",
    "food photo scanner",
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
    title: "GutVista — Eat Confidently",
    description: "Low FODMAP meal plans, AI plate scanner, and symptom tracking that learn YOUR triggers — worldwide.",
    url: "https://gutvista.pages.dev",
    siteName: "GutVista",
    images: [{ url: "/logo.png", width: 440, height: 375, alt: "GutVista logo" }],
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
