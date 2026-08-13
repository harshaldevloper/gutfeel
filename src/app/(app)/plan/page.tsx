"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  buildDailyPlan,
  swapMeal,
  mealSafePercent,
  type DailyPlan,
  type MealSlot,
} from "@/lib/meals";
import { getDbStats, loadProfile } from "@/lib/storage";
import { mergeAvoidList } from "@/lib/planContext";
import AppHeader from "@/components/AppHeader";
import AppBottomNav from "@/components/AppBottomNav";

const SAMPLE_TRIGGERS = ["Onion", "Garlic"];

const SLOTS: { key: MealSlot; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

export default function Plan() {
  const [triggers, setTriggers] = useState<string[]>(SAMPLE_TRIGGERS);
  const [plan, setPlan] = useState<DailyPlan>(() => buildDailyPlan(SAMPLE_TRIGGERS));

  useEffect(() => {
    Promise.all([getDbStats(), loadProfile()]).then(([s, profile]) => {
      const avoid = mergeAvoidList(
        s.triggeredFoods.length > 0 ? s.triggeredFoods : SAMPLE_TRIGGERS,
        profile
      );
      setTriggers(avoid);
      setPlan(buildDailyPlan(avoid));
    });
  }, []);

  const dayScore = Math.round(
    SLOTS.reduce((sum, s) => sum + mealSafePercent(plan.slots[s.key], triggers), 0) / SLOTS.length
  );

  function handleSwap(slot: MealSlot) {
    setPlan(prev => ({
      ...prev,
      slots: { ...prev.slots, [slot]: swapMeal(slot, prev.slots[slot].id, triggers) },
    }));
  }

  const grocery = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of SLOTS) {
      for (const ing of plan.slots[s.key].ingredients) {
        counts[ing] = (counts[ing] || 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [plan]);

  return (
    <div className="min-h-screen app-page-bg pb-24">
      <AppHeader
        title="Meal Planner"
        right={<span className="text-xs bg-brand-green-light text-brand-green-dark px-2.5 py-1 rounded-full font-semibold">Personalized</span>}
      />

      <main className="max-w-4xl mx-auto px-4 py-5 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-checkin rounded-2xl p-6 text-white"
        >
          <p className="text-white/70 text-sm">{plan.personalized ? "Personalized day score" : "Day score"}</p>
          <p className="font-serif text-5xl font-bold mt-1">{dayScore}%</p>
          <p className="text-white/70 text-sm mt-1">of your day is low FODMAP safe</p>
          <div className="w-full h-2 bg-white/25 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${dayScore}%` }} />
          </div>
          {plan.personalized && plan.avoidedTriggers.length > 0 && (
            <div className="bg-white/15 rounded-xl p-3 mt-4">
              <p className="text-sm font-medium mb-2">Avoiding your triggers:</p>
              <div className="flex flex-wrap gap-2">
                {plan.avoidedTriggers.map(t => (
                  <span key={t} className="bg-white text-brand-green-dark text-xs font-bold px-2.5 py-1 rounded-full">{t}</span>
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
              className="premium-card p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="section-label text-brand-green-dark">{label}</span>
                <span className="text-xs bg-brand-green-light text-brand-green-dark font-bold px-2 py-0.5 rounded-full">
                  {mealSafePercent(meal, triggers)}% safe
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-stone-900">Today's Grocery List</h2>
            <span className="text-xs text-stone-500">{grocery.length} items</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {grocery.map(([item, count]) => (
              <span key={item} className="px-3 py-1.5 rounded-full text-sm bg-stone-100 border border-stone-200 text-stone-700">
                {item}
                {count > 1 ? <span className="text-stone-400 ml-1">×{count}</span> : null}
              </span>
            ))}
          </div>
        </motion.div>
      </main>
      <AppBottomNav />
</div>
  );
}