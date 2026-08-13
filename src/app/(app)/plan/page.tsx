"use client";

import { useEffect, useMemo, useState } from "react";
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

const SLOTS: { key: MealSlot; label: string; short: string }[] = [
  { key: "breakfast", label: "Breakfast", short: "B" },
  { key: "lunch", label: "Lunch", short: "L" },
  { key: "dinner", label: "Dinner", short: "D" },
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
    <div className="min-h-screen app-page-bg pb-28">
      <AppHeader
        title="Meal Planner"
        right={<span className="text-xs bg-brand-green-light text-brand-green-dark px-2.5 py-1 rounded-full font-semibold border border-brand-green/25">Personalized</span>}
      />

      <main className="max-w-4xl mx-auto px-4 py-5 space-y-4 relative z-[1]">
        <div className="plan-score-glass rounded-2xl p-4 flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light flex flex-col items-center justify-center shrink-0 shadow-lg shadow-brand-navy/25"
            aria-hidden
          >
            <span className="text-lg font-bold text-white leading-none">{dayScore}</span>
            <span className="text-[9px] text-white/70 font-semibold">%</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="section-label text-brand-green-dark mb-0.5">
              {plan.personalized ? "Personalized day score" : "Day score"}
            </p>
            <p className="text-sm text-stone-600">Low FODMAP safe today</p>
            <div className="w-full h-1.5 bg-stone-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-brand-green rounded-full transition-all" style={{ width: `${dayScore}%` }} />
            </div>
          </div>
        </div>

        {plan.personalized && plan.avoidedTriggers.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center px-1">
            <span className="text-xs font-semibold text-stone-500">Avoiding:</span>
            {plan.avoidedTriggers.map(t => (
              <span key={t} className="text-xs bg-brand-green-light text-brand-green-dark font-bold px-2.5 py-1 rounded-full border border-brand-green/20">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* First meal preview hint */}
        <p className="text-xs text-stone-400 px-1 -mb-2">Today&apos;s meals · tap swap to rotate</p>

        {SLOTS.map(({ key, label, short }) => {
          const meal = plan.slots[key];
          return (
            <div key={key} className="meal-row-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand-green-dark">{short}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="section-label text-brand-green-dark">{label}</span>
                    <span className="text-xs bg-brand-green-light text-brand-green-dark font-bold px-2 py-0.5 rounded-full shrink-0">
                      {mealSafePercent(meal, triggers)}% safe
                    </span>
                  </div>
                  <h2 className="font-semibold text-stone-900 truncate">{meal.name}</h2>
                  <p className="text-xs text-stone-500 mt-1">{meal.cookMinutes} min · {meal.calories} kcal</p>
                </div>
              </div>
              <p className="text-sm text-stone-600 mt-3 line-clamp-2">{meal.description}</p>
              <button
                onClick={() => handleSwap(key)}
                className="mt-3 w-full py-2.5 bg-cream hover:bg-stone-100 border border-stone-200 rounded-xl text-sm font-bold text-brand-navy transition-colors active:scale-[0.98]"
              >
                Swap meal
              </button>
            </div>
          );
        })}

        <div className="premium-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif font-bold text-brand-navy">Grocery list</h2>
            <span className="text-xs font-semibold text-stone-500">{grocery.length} items</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {grocery.map(([item, count]) => (
              <span key={item} className="px-3 py-1.5 rounded-full text-sm bg-cream border border-stone-200 text-stone-700">
                {item}
                {count > 1 ? <span className="text-stone-400 ml-1">×{count}</span> : null}
              </span>
            ))}
          </div>
        </div>
      </main>
      <AppBottomNav />
    </div>
  );
}
