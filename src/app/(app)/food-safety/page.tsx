"use client";

import { useState } from "react";
import { FOOD_SAFETY_ALERTS, FOOD_SAFETY_SCORES, RESTAURANT_SAFETY_TIPS, getSeverityColor } from "@/lib/foodSafety";
import AppHeader from "@/components/AppHeader";
import AppBottomNav from "@/components/AppBottomNav";

export default function FoodSafety() {
  const [tab, setTab] = useState<"alerts" | "scores" | "tips">("alerts");

  return (
    <div className="min-h-screen bg-cream pb-24">
      <AppHeader
        title="Food Safety"
        right={<span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">🇮🇳 India</span>}
      />

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-white">
          <p className="text-red-100 text-sm">Trending in Maharashtra</p>
          <h1 className="text-xl font-bold mt-1">FDA Crackdown: Food Safety First</h1>
          <p className="text-red-100 text-sm mt-2">Commissioner Tukaram Mundhe leads massive crackdown on adulterated food across Maharashtra. Stay informed, stay safe.</p>
        </div>

        <div className="flex gap-2">
          {(["alerts", "scores", "tips"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${tab === t ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-white text-stone-600 border border-stone-200"}`}>{t}</button>
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
                    <p className="text-xs font-medium">💡 {alert.action}</p>
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
                  <span className={`text-sm font-bold ${data.score >= 80 ? "text-emerald-600" : data.score >= 60 ? "text-amber-600" : "text-red-600"}`}>{data.score}/100</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full mb-2 overflow-hidden">
                  <div className={`h-full rounded-full ${data.score >= 80 ? "bg-emerald-500" : data.score >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${data.score}%` }} />
                </div>
                <p className="text-xs text-stone-500">💡 {data.tips}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "tips" && (
          <div className="space-y-3">
            <p className="text-sm text-stone-600">Restaurant safety tips from FSSAI guidelines.</p>
            {RESTAURANT_SAFETY_TIPS.map((tip, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-200 p-4 flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-bold text-emerald-700 shrink-0">{i + 1}</div>
                <p className="text-sm text-stone-700">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
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
          <a href="/food-safety" className="flex flex-col items-center gap-0.5 py-1 px-3 text-emerald-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span className="text-xs font-medium">Safety</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
