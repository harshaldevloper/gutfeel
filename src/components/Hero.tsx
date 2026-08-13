"use client";

import { motion } from "framer-motion";
import AppPreview from "@/components/landing/AppPreview";
import DownloadSection from "@/components/landing/DownloadSection";

const stats = [
  { value: "3 min", label: "to set up your profile" },
  { value: "100+", label: "India-safe foods rated" },
  { value: "Offline", label: "works without internet" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <section className="hero-mesh pt-28 pb-16 lg:pt-36 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-brand-green/18 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-brand-navy/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-green/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/90 backdrop-blur border border-brand-green/20 rounded-full text-brand-green-dark text-xs font-bold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
              </span>
              Low FODMAP · India-first · Works offline
            </div>

            <h1 className="font-serif text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.06] text-brand-navy mb-6 tracking-tight">
              Stop guessing what to eat.{" "}
              <span className="text-brand-green block sm:inline mt-1 sm:mt-0">Start living again.</span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-8 max-w-xl">
              Personalized meal plans, symptom tracking, and trigger patterns — with roti, dal, and paneer built in. Not another generic Western diet app.
            </p>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-3 gap-3 mb-8 max-w-lg"
            >
              {stats.map(s => (
                <motion.div key={s.label} variants={item} className="premium-card p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-xl font-serif font-bold text-brand-navy">{s.value}</p>
                  <p className="text-[10px] sm:text-xs text-stone-500 mt-1 leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="/download/" className="btn-accent text-center shadow-lg shadow-brand-green/20">
                Download Android App
              </a>
              <a href="/onboarding/" className="btn-primary text-center">
                Try web demo
              </a>
            </div>

            <div className="mb-8">
              <DownloadSection compact />
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
              {["No credit card", "Honest health copy", "Not medical advice"].map(label => (
                <span key={label} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <AppPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
