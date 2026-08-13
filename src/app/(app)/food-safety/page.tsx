"use client";

import { useState } from "react";
import { FOOD_SAFETY_ALERTS, FOOD_SAFETY_SCORES, RESTAURANT_SAFETY_TIPS, getSeverityColor } from "@/lib/foodSafety";
import AppHeader from "@/components/AppHeader";
import AppBottomNav from "@/components/AppBottomNav";
import CountryBadge from "@/components/ui/CountryBadge";

export default function FoodSafety() {
  const [tab, setTab] = useState<"alerts" | "scores" | "tips">("alerts");

  return (
    <div className="min-h-screen app-page-bg pb-24">
      <AppHeader title="Food Safety" right={<CountryBadge country="IN" />} />

      <main className="max-w-4xl mx-auto px-4 py-5 space-y-5">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-white">
          <p className="text-red-100 text-sm">Trending in Maharashtra</p>
          <h1 className="text-xl font-bold mt-1">FDA Crackdown: Food Safety First</h1>
          <p className="text-red-100 text-sm mt-2">Commissioner Tukaram Mundhe leads massive crackdown on adulterated food across Maharashtra. Stay informed, stay safe.</p>
        </div>

        <div className="flex gap-2">
          {(["alerts", "scores", "tips"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`chip capitalize ${tab === t ? "chip-active" : ""}`}>{t}</button>
          ))}
        </div>

        {tab === "alerts" && (
          <div className="space-y-3">
            {FOOD_SAFETY_ALERTS.map(alert => (
              <div key={alert.id} className={`rounded-xl border p-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{alert.title}</h3>
                  <span className="text-xs font-semibold uppercase">{alert.severity}</span>
                </div>
                <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                {alert.action && (
                  <div className="bg-white/50 rounded-lg p-2 mt-2">
                    <p className="text-xs font-medium">Tip: {alert.action}</p>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                  <span>{alert.region}</span>
                  <span>{alert.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "scores" && (
          <div className="space-y-3">
            <p className="text-sm text-stone-600">Food safety scores based on FSSAI compliance data. Higher = safer.</p>
            {Object.entries(FOOD_SAFETY_SCORES).map(([food, data]) => (
              <div key={food} className="bg-white rounded-xl border border-stone-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-stone-900">{food}</h3>
                  <span className={`text-sm font-bold ${data.score >= 80 ? "text-brand-green-dark" : data.score >= 60 ? "text-amber-600" : "text-red-600"}`}>{data.score}/100</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full mb-2 overflow-hidden">
                  <div className={`h-full rounded-full ${data.score >= 80 ? "bg-brand-green" : data.score >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${data.score}%` }} />
                </div>
                <p className="text-xs text-stone-500">{data.tips}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "tips" && (
          <div className="space-y-3">
            <p className="text-sm text-stone-600">Restaurant safety tips from FSSAI guidelines.</p>
            {RESTAURANT_SAFETY_TIPS.map((tip, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-200 p-4 flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-green-light rounded-full flex items-center justify-center text-xs font-bold text-brand-green-dark shrink-0">{i + 1}</div>
                <p className="text-sm text-stone-700">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <AppBottomNav />
    </div>
  );
}
