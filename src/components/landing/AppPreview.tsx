"use client";

import { motion } from "framer-motion";

const meals = [
  { emoji: "🍳", name: "Moong dal khichdi", tag: "Safe", kcal: "320" },
  { emoji: "🥙", name: "Roti + paneer bhurji", tag: "Safe", kcal: "410" },
  { emoji: "🍲", name: "Lauki lemon rice", tag: "Safe", kcal: "380" },
];

/** Product preview inside phone mockup — leads with the app, not feature bullets */
export default function AppPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="relative mx-auto w-full max-w-[320px] lg:max-w-none"
    >
      <div className="absolute -top-4 -right-2 lg:right-4 z-10 px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-brand-green shadow-lg border border-brand-green-light animate-float">
        🇮🇳 Built for Indian meals
      </div>

      <div className="phone-frame mx-auto max-w-[300px]">
        <div className="phone-screen">
          {/* Status bar */}
          <div className="bg-brand-navy px-4 pt-3 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo-mark.png" alt="" className="w-7 h-7 object-contain" />
              <span className="text-white text-xs font-semibold">Gutfeel</span>
            </div>
            <span className="text-[10px] text-white/70">Today</span>
          </div>

          <div className="p-3 space-y-3 bg-cream min-h-[380px]">
            <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-4 text-white">
              <p className="text-[10px] text-white/70 uppercase tracking-wider">Daily check-in</p>
              <p className="text-sm font-semibold mt-1">How is your gut?</p>
              <div className="mt-3 h-1.5 bg-white/20 rounded-full">
                <div className="h-full w-3/5 bg-brand-green rounded-full" />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-brand-navy/60 uppercase tracking-wider mb-2 px-0.5">Meal plan</p>
              <div className="space-y-2">
                {meals.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-brand-navy/5 shadow-sm"
                  >
                    <span className="text-lg">{m.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-brand-navy truncate">{m.name}</p>
                      <p className="text-[9px] text-stone-400">{m.kcal} kcal</p>
                    </div>
                    <span className="text-[9px] font-bold text-brand-green bg-brand-green-light px-1.5 py-0.5 rounded-full">{m.tag}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {["Plan", "Track", "Foods"].map(label => (
                <div key={label} className="text-center py-2 rounded-xl bg-white border border-brand-navy/5">
                  <p className="text-[9px] font-medium text-brand-navy/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
