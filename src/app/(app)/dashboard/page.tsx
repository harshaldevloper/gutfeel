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
import StreakRing from "@/components/ui/StreakRing";
import WeeklyMiniChart from "@/components/ui/WeeklyMiniChart";
import MealSafetyPill from "@/components/ui/MealSafetyPill";

const SAMPLE_TRIGGERS = ["Onion", "Garlic"];

const SLOTS: { key: MealSlot; label: string; time: string }[] = [
  { key: "breakfast", label: "Breakfast", time: "8:30 AM" },
  { key: "lunch", label: "Lunch", time: "1:15 PM" },
  { key: "dinner", label: "Dinner", time: "7:00 PM" },
];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function MealIcon({ slot }: { slot: MealSlot }) {
  if (slot === "breakfast") {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  }
  if (slot === "lunch") {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
    </svg>
  );
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
    <AppShell>
      {/* Stitch-style greeting header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center -mt-1 mb-1">
        <div>
          <p className="text-sm text-stone-500">{greeting()},</p>
          <h1 className="font-serif text-2xl font-bold text-brand-navy">Welcome back</h1>
        </div>
        <div className="streak-pill">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.451-1.283-.476-1.809-.074-1.63.782-2.926 1.86-3.927 1.023-.96 2.247-1.521 3.578-1.688a.75.75 0 01.697.447z" clipRule="evenodd" />
          </svg>
          {stats.streak} day{stats.streak === 1 ? "" : "s"}
        </div>
      </motion.div>

      {/* Hero check-in — navy gradient */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-checkin rounded-2xl p-6 text-white relative z-[1]"
      >
        <h2 className="font-serif text-xl font-bold mb-1">Daily check-in</h2>
        <p className="text-white/75 text-sm mb-5">How is your gut feeling today?</p>

        {!symptomLogged ? (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-white/70 mb-2 font-medium">
                <span>Feeling great</span>
                <span className="font-bold text-white">{severity}/5</span>
                <span>Severe</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={severity}
                onChange={e => setSeverity(+e.target.value)}
                className="checkin-slider w-full"
              />
            </div>
            <button
              onClick={handleCheckIn}
              className="w-full py-3.5 btn-glow text-white rounded-xl font-bold active:scale-[0.98] transition-all"
            >
              Log today&apos;s check-in
            </button>
            <a href="/tracker" className="block text-center text-sm text-white/75 font-medium hover:text-white transition-colors">
              Add symptoms & foods →
            </a>
          </div>
        ) : (
          <div className="hero-inner-glass rounded-xl p-5 text-center">
            <div className="w-10 h-10 rounded-full bg-brand-green/30 flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-lg font-semibold">Logged for today</p>
            <p className="text-white/70 text-sm mt-1">Severity {severity}/5 — keep your streak alive</p>
          </div>
        )}
      </motion.section>

      {/* Stitch 2-col: streak ring + mini weekly chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 gap-3"
      >
        <StreakRing days={stats.streak} />
        <WeeklyMiniChart data={weeklyData} />
      </motion.div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="insight-glass rounded-2xl p-5"
      >
        <p className="section-label text-brand-green-dark mb-1">Today&apos;s insight</p>
        <p className="text-sm text-stone-700 leading-relaxed">{insight}</p>
      </motion.div>

      {/* Recent meals — Stitch card rows */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-lg font-bold text-brand-navy">Today&apos;s meals</h2>
          <a href="/plan" className="text-xs font-semibold text-brand-navy/70 hover:text-brand-navy hover:underline">
            View all
          </a>
        </div>
        {SLOTS.map(s => {
          const meal = plan.slots[s.key];
          const safePct = mealSafePercent(meal, triggers);
          return (
            <div key={s.key} className="meal-row-card p-4 flex items-center gap-4">
              <div className="food-row-icon">
                <MealIcon slot={s.key} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-900 truncate">{meal.name}</p>
                <p className="text-xs text-stone-500 mt-0.5">{s.time} · {meal.cookMinutes} min</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <MealSafetyPill percent={safePct} />
                <span className="text-xs font-bold text-brand-green">{safePct}%</span>
              </div>
            </div>
          );
        })}
        <a
          href="/tracker"
          className="block border border-dashed border-stone-300 rounded-xl p-4 text-center text-sm font-semibold text-stone-500 hover:bg-cream-dark/50 transition-colors"
        >
          + Log a meal
        </a>
      </motion.section>

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

      {/* Full weekly chart with day labels */}
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-3"
      >
        <a href="/support/" className="glass-card rounded-2xl p-4 flex flex-col gap-1 hover:shadow-md transition-shadow">
          <span className="text-sm font-bold text-brand-navy">Support</span>
          <span className="text-xs text-stone-500">Get help</span>
        </a>
        <a href="/account/" className="glass-card rounded-2xl p-4 flex flex-col gap-1 hover:shadow-md transition-shadow">
          <span className="text-sm font-bold text-brand-navy">Premium</span>
          <span className="text-xs text-stone-500">Upgrade on web</span>
        </a>
        <a href="/download/" className="glass-card rounded-2xl p-4 flex flex-col gap-1 hover:shadow-md transition-shadow">
          <span className="text-sm font-bold text-brand-navy">Updates</span>
          <span className="text-xs text-stone-500">Download APK</span>
        </a>
      </motion.div>
    </AppShell>
  );
}
