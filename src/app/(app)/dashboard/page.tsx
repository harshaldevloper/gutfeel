"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { buildDailyPlan, mealSafePercent, type MealSlot } from "@/lib/meals";
import { getDbStats, saveEntry, getLast7DaysSeverity, getWeekComparison, isLoggedToday, getTodayEntry, loadProfile, type DbStats } from "@/lib/storage";
import { mergeAvoidList } from "@/lib/planContext";
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

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [symptomLogged, setSymptomLogged] = useState(false);
  const [severity, setSeverity] = useState(3);
  const [stats, setStats] = useState<DbStats>({ entries: [], streak: 0, fingerprint: [], triggeredFoods: [], testedCount: 0 });
  const [plan, setPlan] = useState(() => buildDailyPlan(SAMPLE_TRIGGERS));

  useEffect(() => {
    Promise.all([getDbStats(), loadProfile()]).then(([s, profile]) => {
      const todayLogged = isLoggedToday(s.entries);
      const todayEntry = getTodayEntry(s.entries);
      setStats(s);
      const base = s.triggeredFoods.length > 0 ? s.triggeredFoods : SAMPLE_TRIGGERS;
      setPlan(buildDailyPlan(mergeAvoidList(base, profile)));
      setSymptomLogged(todayLogged);
      if (todayEntry) setSeverity(todayEntry.severity);
    });
    syncLocalDataToCloud();
  }, []);

  async function refreshAfterLog() {
    const [s, profile] = await Promise.all([getDbStats(), loadProfile()]);
    setStats(s);
    const base = s.triggeredFoods.length > 0 ? s.triggeredFoods : SAMPLE_TRIGGERS;
    setPlan(buildDailyPlan(mergeAvoidList(base, profile)));
  }

  async function handleCheckIn() {
    await saveEntry({ severity, symptoms: [], bowel: "normal", stress: 3, foods: [] });
    setSymptomLogged(true);
    await refreshAfterLog();
  }

  const insight = getFingerprintInsight(stats.fingerprint, stats.streak);
  const triggers = stats.triggeredFoods.length > 0 ? stats.triggeredFoods : SAMPLE_TRIGGERS;
  const weeklyData = getLast7DaysSeverity(stats.entries);
  const weekComparison = getWeekComparison(stats.entries);
  const topFingerprint = stats.fingerprint.filter(f => f.testCount > 0).slice(0, 4);

  return (
    <AppShell
      headerRight={
        <div className="streak-pill">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.451-1.283-.476-1.809-.074-1.63.782-2.926 1.86-3.927 1.023-.96 2.247-1.521 3.578-1.688a.75.75 0 01.697.447z" clipRule="evenodd" />
          </svg>
          {stats.streak} day{stats.streak === 1 ? "" : "s"}
        </div>
      }
    >
      {/* Daily Check-in — hero card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-checkin rounded-2xl p-6 text-white"
      >
        <p className="section-label text-white/60 mb-1">{greeting()}</p>
        <h1 className="font-serif text-2xl font-bold mb-5">How is your gut today?</h1>

        {!symptomLogged ? (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-white/70 mb-2">
                <span>Feeling great</span>
                <span className="font-semibold text-white">{severity}/5</span>
                <span>Severe</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={severity}
                onChange={e => setSeverity(+e.target.value)}
                className="w-full accent-brand-green h-2 rounded-full"
              />
            </div>
            <button
              onClick={handleCheckIn}
              className="w-full py-3.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl font-bold active:scale-[0.98] transition-all shadow-lg shadow-black/10"
            >
              Log today&apos;s check-in
            </button>
            <a href="/tracker" className="block text-center text-sm text-white/75 font-medium hover:text-white transition-colors">
              Add symptoms & foods →
            </a>
          </div>
        ) : (
          <div className="bg-white/15 backdrop-blur rounded-xl p-5 text-center border border-white/10">
            <div className="w-10 h-10 rounded-full bg-brand-green/30 flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-lg font-semibold">Logged for today</p>
            <p className="text-white/70 text-sm mt-1">Severity {severity}/5 — keep your streak alive</p>
          </div>
        )}
      </motion.div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="premium-card p-5 border-l-4 border-l-brand-green"
      >
        <p className="section-label text-brand-green-dark mb-1">Today&apos;s insight</p>
        <p className="text-sm text-stone-700 leading-relaxed">{insight}</p>
      </motion.div>

      {/* Meals */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="premium-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-bold text-brand-navy">Today&apos;s meals</h2>
          <a href="/plan" className="text-xs bg-brand-green-light text-brand-green-dark px-3 py-1.5 rounded-full font-semibold hover:bg-brand-green/15 transition-colors">
            Open planner
          </a>
        </div>
        <div className="space-y-2">
          {SLOTS.map(s => {
            const meal = plan.slots[s.key];
            return (
              <div key={s.key} className="flex items-center gap-3 p-3 rounded-xl bg-cream border border-stone-100">
                <div className="w-12 h-12 bg-brand-green-light rounded-xl flex flex-col items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand-green-dark leading-none">{meal.calories}</span>
                  <span className="text-[8px] font-medium text-brand-green-dark/70">kcal</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900 truncate">{meal.name}</p>
                  <p className="text-xs text-stone-500">{s.label} · {meal.cookMinutes} min</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-brand-green">{mealSafePercent(meal, triggers)}%</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wide">safe</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Fingerprint */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="premium-card p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-lg font-bold text-brand-navy">Your FODMAP fingerprint</h2>
          <span className="text-xs text-stone-500 font-medium">{stats.testedCount}/{FOODS.length}</span>
        </div>
        <div className="w-full h-2.5 bg-stone-100 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-green to-brand-green-dark rounded-full transition-all duration-500"
            style={{ width: `${(stats.testedCount / FOODS.length) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {topFingerprint.length > 0 ? topFingerprint.map(t => {
            const isTrigger = t.status === "confirmed-trigger" || t.status === "likely-trigger";
            return (
              <div key={t.foodName} className={`p-3 rounded-xl border ${isTrigger ? "border-red-200 bg-red-50" : "border-brand-green/25 bg-brand-green-light/50"}`}>
                <p className="text-sm font-semibold text-stone-900">{t.foodName}</p>
                <p className={`text-xs font-semibold mt-0.5 ${isTrigger ? "text-red-600" : "text-brand-green-dark"}`}>
                  {t.status === "confirmed-trigger" ? "Trigger" : t.status === "likely-trigger" ? "Likely trigger" : "Safe"}
                </p>
              </div>
            );
          }) : (
            <div className="col-span-2 p-4 rounded-xl border border-dashed border-stone-200 bg-stone-50/50 text-center">
              <p className="text-sm text-stone-500">Log meals to build your personal fingerprint</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Reintroduction */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="premium-card p-5 app-card-interactive"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-lg font-bold text-brand-navy">Reintroduction protocol</h2>
          <span className="text-xs bg-brand-green-light text-brand-green-dark px-2.5 py-1 rounded-full font-semibold">Phase 3</span>
        </div>
        <p className="text-sm text-stone-600 mb-4">Systematically test FODMAP groups to expand your safe foods.</p>
        <a href="/reintroduction" className="block text-center py-3 bg-brand-navy text-white rounded-xl font-bold text-sm hover:bg-brand-navy-light transition-colors">
          Continue protocol
        </a>
      </motion.div>

      {/* Weekly chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="premium-card p-5"
      >
        <h2 className="font-serif text-lg font-bold text-brand-navy mb-4">This week&apos;s symptoms</h2>
        <div className="flex items-end gap-2 h-28">
          {weeklyData.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full relative" style={{ height: "88px" }}>
                {day.level > 0 ? (
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
                      day.isToday ? "bg-brand-green" : day.level <= 1.5 ? "bg-brand-green-light" : day.level <= 2.5 ? "bg-amber-200" : "bg-red-200"
                    }`}
                    style={{ height: `${(day.level / 5) * 100}%`, opacity: day.isToday ? 1 : 0.75 }}
                  />
                ) : (
                  <div className="absolute bottom-0 w-full h-1 bg-stone-200 rounded-t-lg" />
                )}
              </div>
              <span className={`text-[10px] ${day.isToday ? "font-bold text-brand-green" : "text-stone-400"}`}>
                {day.label}
              </span>
            </div>
          ))}
        </div>
        {weekComparison ? (
          <p className="text-xs text-brand-green-dark mt-3 font-semibold">{weekComparison}</p>
        ) : stats.entries.length < 7 ? (
          <p className="text-xs text-stone-400 mt-3">Log daily to unlock weekly trends</p>
        ) : null}
      </motion.div>
    </AppShell>
  );
}
