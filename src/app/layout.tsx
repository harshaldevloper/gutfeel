import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gutfeel — Eat Confidently. AI FODMAP Meal Planner for IBS",
  description:
    "Stop guessing what to eat. Gutfeel creates personalized low FODMAP meal plans, tracks your symptoms, and guides you through reintroduction — all powered by AI that learns YOUR triggers.",
  keywords: [
    "low FODMAP",
    "IBS",
    "meal planner",
    "FODMAP diet",
    "gut health",
    "digestive health",
    "IBS diet",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans">
        {children}
      </body>
    </html>
  );
}
