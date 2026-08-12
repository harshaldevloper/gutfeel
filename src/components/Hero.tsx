"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold mb-6"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Now in Early Access — Limited Spots
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-stone-900 mb-6">
              Stop guessing what to eat.{" "}
              <span className="gradient-text">Start living again.</span>
            </h1>
            <p className="text-lg text-stone-500 font-medium mt-2 mb-4">Eat Confidently.</p>
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-8 max-w-xl">
              Gutfeel uses AI to create personalized low FODMAP meal plans that adapt to YOUR body. No more generic diets. No more fear of food. Just relief.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <a href="#waitlist" className="px-8 py-4 bg-emerald-600 text-white rounded-xl text-base font-semibold hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-200 text-center">
                Get Early Access — Free
              </a>
              <a href="#solution" className="px-8 py-4 bg-white border border-stone-300 text-stone-700 rounded-xl text-base font-semibold hover:bg-stone-50 transition-colors text-center">
                See How It Works
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-6 text-sm text-stone-500"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Cancel anytime
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <a href="/plan" className="block bg-white rounded-2xl shadow-2xl shadow-stone-200 p-6 border border-stone-100 hover:shadow-emerald-100 hover:border-emerald-200 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 text-lg">🥗</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Your Meal Plan</p>
                  <p className="text-xs text-stone-500">Week 1 — Elimination Phase</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { emoji: "🍳", name: "Scrambled eggs with spinach", time: "12 min", safe: true },
                  { emoji: "🥙", name: "Quinoa bowl with grilled chicken", time: "20 min", safe: true },
                  { emoji: "🍲", name: "Lemon herb salmon with rice", time: "25 min", safe: true },
                ].map((meal, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg"
                  >
                    <span className="text-lg">{meal.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-900">{meal.name}</p>
                      <p className="text-xs text-stone-500">{meal.time}</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">Safe</span>
                  </motion.div>
                ))}
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
