"use client";

import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";

const meals = [
  { emoji: "🍳", name: "Moong dal khichdi", time: "25 min", safe: true },
  { emoji: "🥙", name: "Roti with paneer bhurji", time: "20 min", safe: true },
  { emoji: "🍲", name: "Lemon rice & bottle gourd", time: "18 min", safe: true },
];

export default function Hero() {
  return (
    <section className="hero-mesh pt-28 pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-sage/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/70 border border-emerald-200/80 rounded-full text-emerald-800 text-xs font-semibold mb-8 shadow-sm"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Early access — built for India & beyond
            </motion.div>

            <div className="mb-6 lg:hidden">
              <BrandLogo height={52} href="/" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold leading-[1.08] text-stone-900 mb-5">
              Stop guessing what to eat.{" "}
              <span className="gradient-text">Start living again.</span>
            </h1>
            <p className="text-xl text-stone-700 font-medium mb-3 tracking-tight">Eat Confidently.</p>
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-9 max-w-xl">
              Personalized low FODMAP meal plans, symptom tracking, and trigger patterns — with Indian foods like roti, dal, and paneer built in.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3.5 mb-8"
            >
              <a href="/onboarding" className="btn-primary text-center">
                Try the App — Free
              </a>
              <a href="#waitlist" className="btn-secondary text-center">
                Join Waitlist
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-500"
            >
              {["No credit card", "Works offline", "Not medical advice"].map(label => (
                <div key={label} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
            className="relative lg:pl-4"
          >
            <div className="absolute -top-6 -right-2 lg:right-4 px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-emerald-700 shadow-md border border-emerald-100 animate-float hidden sm:block">
              🇮🇳 India-first food database
            </div>

            <a href="/plan" className="block card-elevated rounded-3xl p-6 sm:p-7 hover:border-emerald-200/80 transition-all group">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-100">
                <BrandLogo height={36} href="/plan" />
                <div>
                  <p className="text-sm font-semibold text-stone-900">Today&apos;s Meal Plan</p>
                  <p className="text-xs text-stone-500">Elimination phase · personalized</p>
                </div>
              </div>
              <div className="space-y-3">
                {meals.map((meal, i) => (
                  <motion.div
                    key={meal.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 p-3.5 bg-emerald-50/80 rounded-xl group-hover:bg-emerald-50 transition-colors"
                  >
                    <span className="text-xl">{meal.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">{meal.name}</p>
                      <p className="text-xs text-stone-500">{meal.time}</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-white px-2 py-1 rounded-full border border-emerald-100">
                      Safe
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs font-medium text-emerald-700 group-hover:underline">
                Open meal planner →
              </p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
