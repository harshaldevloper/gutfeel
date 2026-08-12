"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  buildDailyPlan,
  swapMeal,
  mealSafePercent,
  type DailyPlan,
  type MealSlot,
} from "@/lib/meals";

const SAMPLE_TRIGGERS = ["Onion", "Garlic"];

const SLOTS: { key: MealSlot; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

export default function Plan() {
  const [plan, setPlan] = useState<DailyPlan>(() => buildDailyPlan(SAMPLE_TRIGGERS));

  const dayScore = Math.round(
    SLOTS.reduce((sum, s) => sum + mealSafePercent(plan.slots[s.key], SAMPLE_TRIGGERS), 0) / SLOTS.length
  );

  function handleSwap(slot: MealSlot) {
    setPlan(prev => ({
      ...prev,
      slots: { ...prev.slots, [slot]: swapMeal(slot, prev.slots[slot].id, SAMPLE_TRIGGERS) },
    }));
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <header className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" width="28" height="28" alt="Gutfeel" />
            <span className="text-lg font-bold text-stone-900">Meal Planner</span>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">Personalized</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200"
        >
          <p className="text-emerald-100 text-sm">{plan.personalized ? "Personalized day score" : "Day score"}</p>
          <p className="text-4xl font-bold mt-1">{dayScore}%</p>
          <p className="text-emerald-100 text-sm mt-1">of your day is low FODMAP safe</p>
          <div className="w-full h-2 bg-white/25 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${dayScore}%` }} />
          </div>
          {plan.personalized && plan.avoidedTriggers.length > 0 && (
            <div className="bg-white/15 rounded-xl p-3 mt-4">
              <p className="text-sm font-medium mb-2">Avoiding your triggers:</p>
              <div className="flex flex-wrap gap-2">
                {plan.avoidedTriggers.map(t => (
                  <span key={t} className="bg-white text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {SLOTS.map(({ key, label }, i) => {
          const meal = plan.slots[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{label}</span>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  {mealSafePercent(meal, SAMPLE_TRIGGERS)}% safe
                </span>
              </div>
              <h2 className="font-bold text-stone-900 text-lg">{meal.name}</h2>
              <p className="text-sm text-stone-600 mt-1">{meal.description}</p>
              <p className="text-xs text-stone-500 mt-3">{meal.ingredients.join(" · ")}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-stone-500 font-medium">
                <span>{meal.cookMinutes} min</span>
                <span className="text-stone-300">·</span>
                <span>{meal.calories} kcal</span>
              </div>
              <button
                onClick={() => handleSwap(key)}
                className="mt-3 w-full py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl text-sm font-bold text-stone-700 transition-colors active:scale-[0.98]"
              >
                Swap meal
              </button>
            </motion.div>
          );
        })}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-xs font-medium">Home</span>
          </a>
          <a href="/plan" className="flex flex-col items-center gap-0.5 py-1 px-3 text-emerald-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="text-xs font-medium">Plan</span>
          </a>
          <a href="/tracker" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="text-xs font-medium">Tracker</span>
          </a>
          <a href="/foods" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            <span className="text-xs font-medium">Foods</span>
          </a>
          <a href="/food-safety" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span className="text-xs font-medium">Safety</span>
          </a>
        </div>
      </nav>
    </div>
  );
}