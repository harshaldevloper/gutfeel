"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { buildDailyPlan, mealSafePercent, type MealSlot } from "@/lib/meals";
import { getDbStats, saveEntry, getLast7DaysSeverity, getWeekComparison, isLoggedToday, getTodayEntry, type DbStats } from "@/lib/storage";
import { getFingerprintInsight } from "@/lib/fingerprint";
import { FOODS } from "@/lib/localizedFoods";
import { syncLocalDataToCloud } from "@/lib/sync";
import AppShell from "@/components/AppShell";

const SAMPLE_TRIGGERS = ["Onion", "Garlic"];

const SLOTS: { key: MealSlot; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

const FDA_ALERT = "⚠\uFE0F FDA seized 2,000L adulterated milk in Pune this week. Tap to check your brand.";

export default function Dashboard() {
  const [symptomLogged, setSymptomLogged] = useState(false);
  const [severity, setSeverity] = useState(3);
  const [stats, setStats] = useState<DbStats>({ entries: [], streak: 0, fingerprint: [], triggeredFoods: [], testedCount: 0 });
  const [plan, setPlan] = useState(() => buildDailyPlan(SAMPLE_TRIGGERS));

  useEffect(() => {
    getDbStats().then(s => {
      const todayLogged = isLoggedToday(s.entries);
      const todayEntry = getTodayEntry(s.entries);
      setStats(s);
      setPlan(buildDailyPlan(s.triggeredFoods.length > 0 ? s.triggeredFoods : SAMPLE_TRIGGERS));
      setSymptomLogged(todayLogged);
      if (todayEntry) setSeverity(todayEntry.severity);
    });
    syncLocalDataToCloud();
  }, []);

  async function handleCheckIn() {
    await saveEntry({ severity, symptoms: [], bowel: "normal", stress: 3, foods: [] });
    setSymptomLogged(true);
    getDbStats().then(s => {
      setStats(s);
      setPlan(buildDailyPlan(s.triggeredFoods.length > 0 ? s.triggeredFoods : SAMPLE_TRIGGERS));
    });
  }

  const insight = getFingerprintInsight(stats.fingerprint, stats.streak);
  const triggers = stats.triggeredFoods.length > 0 ? stats.triggeredFoods : SAMPLE_TRIGGERS;
  const weeklyData = getLast7DaysSeverity(stats.entries);
  const weekComparison = getWeekComparison(stats.entries);
  const topFingerprint = stats.fingerprint.filter(f => f.testCount > 0).slice(0, 4);

  return (
    <AppShell
      headerRight={
        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
          <span className="text-sm">{"\uD83D\uDD25"}</span>
          <span className="text-sm font-bold text-amber-700">{stats.streak}</span>
        </div>
      }
    >
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
          className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-2xl p-5 text-white shadow-lg shadow-brand-navy/20"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-emerald-100 text-sm">Good morning!</p>
              <h1 className="text-xl font-bold">How is your gut today?</h1>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">{stats.streak}</div>
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
              <button onClick={handleCheckIn} className="w-full py-3.5 bg-brand-green text-white rounded-xl font-bold active:scale-95 transition-transform hover:bg-brand-green-dark">
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
          <p className="text-sm text-blue-700 mt-1">{insight}</p>
        </motion.div>

        {/* Fingerprint Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-stone-900">Your FODMAP Fingerprint</h2>
            <span className="text-xs text-stone-500">{stats.testedCount}/{FOODS.length} foods</span>
          </div>
          <div className="w-full h-3 bg-stone-100 rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all" style={{ width: `${(stats.testedCount / FOODS.length) * 100}%` }} />
          </div>
          <p className="text-sm text-stone-600 mb-4">{stats.triggeredFoods.length > 0 ? `${stats.triggeredFoods.length} trigger${stats.triggeredFoods.length === 1 ? "" : "s"} found. Keep logging meals + symptoms to sharpen accuracy.` : "Log daily to discover YOUR specific triggers. Most users see patterns after 7 days."}</p>
          <div className="grid grid-cols-2 gap-2">
            {topFingerprint.length > 0 ? topFingerprint.map((t, i) => {
              const isTrigger = t.status === "confirmed-trigger" || t.status === "likely-trigger";
              return (
                <div key={t.foodName} className={`p-3 rounded-xl border ${isTrigger ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                  <p className="text-sm font-medium text-stone-900">{t.foodName}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${isTrigger ? "text-red-600" : "text-emerald-600"}`}>
                    {t.status === "confirmed-trigger" ? "\u2717 Trigger" : t.status === "likely-trigger" ? "\u26A0\uFE0F Likely" : "\u2713 Safe"}
                  </p>
                </div>
              );
            }) : (
              <div className="col-span-2 p-3 rounded-xl border border-stone-200 bg-stone-50">
                <p className="text-sm text-stone-500">Log your first meals to build your Fingerprint.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Today\'s Meals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-elevated rounded-2xl p-5"
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
                    <p className="text-sm font-bold text-emerald-600">{mealSafePercent(meal, triggers)}%</p>
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
          className="card-elevated rounded-2xl p-5"
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
          className="card-elevated rounded-2xl p-5"
        >
          <h2 className="font-bold text-stone-900 mb-4">This Week&apos;s Symptoms</h2>
          <div className="flex items-end gap-2 h-24">
            {weeklyData.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative" style={{ height: "80px" }}>
                  {day.level > 0 ? (
                    <div className={`absolute bottom-0 w-full rounded-t-md transition-all ${day.isToday ? "bg-emerald-500" : day.level <= 1.5 ? "bg-emerald-300" : day.level <= 2.5 ? "bg-amber-300" : "bg-red-300"}`} style={{ height: `${(day.level / 5) * 100}%`, opacity: day.isToday ? 1 : 0.6 }} />
                  ) : (
                    <div className="absolute bottom-0 w-full h-1 bg-stone-200 rounded-t-md opacity-40" />
                  )}
                </div>
                <span className={`text-xs ${day.isToday ? "font-bold text-emerald-600" : "text-stone-400"}`}>{day.label}{day.isToday ? "*" : ""}</span>
              </div>
            ))}
          </div>
          {weekComparison && (
            <p className="text-xs text-emerald-600 mt-3 font-medium">{weekComparison}</p>
          )}
          {!weekComparison && stats.entries.length < 7 && (
            <p className="text-xs text-stone-400 mt-3">Log daily to see weekly trends</p>
          )}
        </motion.div>
      </AppShell>
  );
}
