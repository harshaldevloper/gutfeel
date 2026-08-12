"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { buildDailyPlan, mealSafePercent, type MealSlot } from "@/lib/meals";

const SAMPLE_TRIGGERS = ["Onion", "Garlic"];
const SLOTS: { key: MealSlot; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

const plan = buildDailyPlan(SAMPLE_TRIGGERS);

const STREAK = 5;
const FINGERPRINT_COMPLETE = 4;
const FINGERPRINT_TOTAL = 14;

const LIKELY_TRIGGERS = [
  { food: "Broccoli", confidence: 87, status: "likely-trigger" },
  { food: "Onion", confidence: 92, status: "confirmed-trigger" },
  { food: "Quinoa", confidence: 12, status: "likely-safe" },
  { food: "Chicken", confidence: 5, status: "confirmed-safe" },
  { food: "Rice", confidence: 8, status: "confirmed-safe" },
];

const TODAY_INSIGHT = "People with IBS-D who ate rice today reported 40% fewer symptoms.";
const FDA_ALERT = "⚠\uFE0F FDA seized 2,000L adulterated milk in Pune this week. Tap to check your brand.";

export default function Dashboard() {
  const [symptomLogged, setSymptomLogged] = useState(false);
  const [severity, setSeverity] = useState(3);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" width="28" height="28" alt="Gutfeel" />
            <span className="text-lg font-bold text-stone-900">Gutfeel</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
              <span className="text-sm">{"\uD83D\uDD25"}</span>
              <span className="text-sm font-bold text-amber-700">{STREAK}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {/* FDA Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <p className="text-sm text-red-800 font-medium">{FDA_ALERT}</p>
        </motion.div>

        {/* Daily Check-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-emerald-100 text-sm">Good morning!</p>
              <h1 className="text-xl font-bold">How is your gut today?</h1>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">{STREAK}</div>
              <p className="text-emerald-100 text-xs mt-1">day streak</p>
            </div>
          </div>
          {!symptomLogged ? (
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-emerald-100">
                <span>{"\uD83D\uDE0A Feeling great"}</span>
                <span>{"\uD83D\uDE23 Severe"}</span>
              </div>
              <input type="range" min="1" max="5" value={severity} onChange={e => setSeverity(+e.target.value)} className="w-full accent-white h-2" />
              <button onClick={() => setSymptomLogged(true)} className="w-full py-3.5 bg-white text-emerald-700 rounded-xl font-bold active:scale-95 transition-transform">
                Log Today&apos;s Symptoms
              </button>
            </div>
          ) : (
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <p className="text-lg font-semibold">{"\u2713 Logged today!"}</p>
              <p className="text-emerald-100 text-sm">Severity: {severity}/5. Keep your streak going!</p>
            </div>
          )}
        </motion.div>

        {/* Daily Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <p className="text-sm text-blue-800 font-medium">{"\uD83D\uDCA1 Today's Insight"}</p>
          <p className="text-sm text-blue-700 mt-1">{TODAY_INSIGHT}</p>
        </motion.div>

        {/* Fingerprint Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-stone-900">Your FODMAP Fingerprint</h2>
            <span className="text-xs text-stone-500">{FINGERPRINT_COMPLETE}/{FINGERPRINT_TOTAL} foods</span>
          </div>
          <div className="w-full h-3 bg-stone-100 rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all" style={{ width: `${(FINGERPRINT_COMPLETE / FINGERPRINT_TOTAL) * 100}%` }} />
          </div>
          <p className="text-sm text-stone-600 mb-4">Log daily to discover YOUR specific triggers. Most users see patterns after 7 days.</p>
          <div className="grid grid-cols-2 gap-2">
            {LIKELY_TRIGGERS.map((t, i) => (
              <div key={i} className={`p-3 rounded-xl border ${t.status.includes("trigger") ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                <p className="text-sm font-medium text-stone-900">{t.food}</p>
                <p className={`text-xs font-semibold mt-0.5 ${t.status.includes("trigger") ? "text-red-600" : "text-emerald-600"}`}>
                  {t.status === "confirmed-trigger" ? "\u2717 Trigger" : t.status === "likely-trigger" ? "\u26A0\uFE0F Likely trigger" : "\u2713 Safe"}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today\'s Meals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-stone-900">Today&apos;s Meals</h2>
            <a href="/plan" className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">Open planner</a>
          </div>
          <div className="space-y-3">
            {SLOTS.map(s => {
              const meal = plan.slots[s.key];
              return (
                <div key={s.key} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100 active:bg-stone-100 transition-colors">
                  <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-xs font-bold text-emerald-700">{meal.calories}<span className="text-[9px] font-medium ml-0.5">kcal</span></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{meal.name}</p>
                    <p className="text-xs text-stone-500">{s.label} &middot; {meal.cookMinutes} min</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-emerald-600">{mealSafePercent(meal, SAMPLE_TRIGGERS)}%</p>
                    <p className="text-xs text-stone-400">safe</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Reintroduction Protocol */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-stone-900">Reintroduction Protocol</h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">Phase 3 of 6</span>
          </div>
          <p className="text-sm text-stone-600 mb-3">Currently challenging Lactose — 33% done. Find out which FODMAPs you can safely enjoy.</p>
          <a href="/reintroduction" className="block text-center py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm active:scale-95 transition-transform">Continue Protocol</a>
        </motion.div>

        {/* Weekly Symptom Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
        >
          <h2 className="font-bold text-stone-900 mb-4">This Week&apos;s Symptoms</h2>
          <div className="flex items-end gap-2 h-24">
            {[2, 1, 3, 1, 2, 1, 1].map((level, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative" style={{ height: "80px" }}>
                  <div className={`absolute bottom-0 w-full rounded-t-md transition-all ${i === 6 ? "bg-emerald-500" : level <= 1 ? "bg-emerald-300" : level <= 2 ? "bg-amber-300" : "bg-red-300"}`} style={{ height: `${level * 33}%`, opacity: i === 6 ? 1 : 0.6 }} />
                </div>
                <span className={`text-xs ${i === 6 ? "font-bold text-emerald-600" : "text-stone-400"}`}>{["M","T","W","T","F","S","S"][i]}{i === 6 ? "*" : ""}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-emerald-600 mt-3 font-medium">{"\u2198"} 40% better than last week</p>
        </motion.div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 py-1 px-3 text-emerald-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-xs font-medium">Home</span>
          </a>
          <a href="/plan" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="text-xs font-medium">Plan</span>
          </a>
          <a href="/tracker" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="text-xs font-medium">Tracker</span>
          </a>
          <a href="/foods" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
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
