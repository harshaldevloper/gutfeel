"use client";

import { motion } from "framer-motion";
import AppPreview from "@/components/landing/AppPreview";
import DownloadSection from "@/components/landing/DownloadSection";

export default function Hero() {
  return (
    <section className="hero-mesh pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-green/15 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-brand-navy/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 border border-brand-green/25 rounded-full text-brand-green-dark text-xs font-semibold mb-8 shadow-sm">
              <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              Low FODMAP · India-first · Works offline
            </div>

            <h1 className="font-serif text-[2.35rem] sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.08] text-brand-navy mb-5">
              Stop guessing what to eat.{" "}
              <span className="gradient-text">Start living again.</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-xl">
              Meal plans, symptom tracking, and trigger patterns — with roti, dal, and paneer built in. Not another generic Western diet app.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="/download/" className="btn-accent text-center">
                Download Android App
              </a>
              <a href="#waitlist" className="btn-secondary text-center">
                Join Waitlist
              </a>
            </div>

            <div className="mb-10">
              <DownloadSection compact />
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
              {["No credit card", "3-min setup", "Not medical advice"].map(label => (
                <span key={label} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <AppPreview />
        </div>
      </div>
    </section>
  );
}
