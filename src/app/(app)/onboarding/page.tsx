"use client";

import { useState } from "react";

const STEPS = [
  { title: "Welcome to GutWise", subtitle: "Let's personalize your experience. This takes 3 minutes." },
  { title: "Your IBS Profile", subtitle: "Help us understand your condition." },
  { title: "Dietary Preferences", subtitle: "What can't or don't you eat?" },
  { title: "Cooking & Lifestyle", subtitle: "How do you like to cook?" },
  { title: "You're Ready!", subtitle: "Your personalized plan is being created." },
];

const IBS_TYPES = ["IBS-D", "IBS-C", "IBS-M", "IBS-U"];
const ALLERGIES = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs", "Shellfish", "Fish"];
const DIETS = ["Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Halal", "Kosher"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ ibsType: "", allergies: [] as string[], diets: [] as string[], skill: "", meals: 3, budget: "medium", household: 1 });

  function next() { setStep(Math.min(step + 1, STEPS.length - 1)); }
  function back() { setStep(Math.max(step - 1, 0)); }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="flex gap-1 mb-6">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-emerald-500" : "bg-stone-200"}`} />
            ))}
          </div>
          <h1 className="text-2xl font-bold text-stone-900">{STEPS[step].title}</h1>
          <p className="text-stone-600 mt-1">{STEPS[step].subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-stone-600">GutWise creates AI-personalized low FODMAP meal plans that adapt to YOUR body. No more generic diets.</p>
              <div className="bg-emerald-50 rounded-xl p-4 text-sm text-emerald-800">
                <p className="font-semibold mb-1">What you'll get:</p>
                <ul className="space-y-1">
                  <li>• Weekly meal plans tailored to your triggers</li>
                  <li>• Smart grocery lists organized by store aisle</li>
                  <li>• Guided reintroduction protocol</li>
                  <li>• Symptom tracking that finds YOUR patterns</li>
                </ul>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">What type of IBS do you have?</label>
                <div className="grid grid-cols-2 gap-2">
                  {IBS_TYPES.map(t => (
                    <button key={t} onClick={() => setForm({...form, ibsType: t})} className={`p-3 rounded-lg border text-sm font-medium transition-colors ${form.ibsType === t ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-stone-200 hover:border-stone-300"}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Allergies / Intolerances</label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGIES.map(a => (
                    <button key={a} onClick={() => setForm({...form, allergies: form.allergies.includes(a) ? form.allergies.filter(x => x !== a) : [...form.allergies, a]})} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${form.allergies.includes(a) ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{a}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Dietary Preference</label>
                <div className="flex flex-wrap gap-2">
                  {DIETS.map(d => (
                    <button key={d} onClick={() => setForm({...form, diets: form.diets.includes(d) ? form.diets.filter(x => x !== d) : [...form.diets, d]})} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${form.diets.includes(d) ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{d}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Cooking skill</label>
                <div className="grid grid-cols-3 gap-2">
                  {["beginner", "intermediate", "advanced"].map(s => (
                    <button key={s} onClick={() => setForm({...form, skill: s})} className={`p-3 rounded-lg border text-sm font-medium capitalize transition-colors ${form.skill === s ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-stone-200"}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Meals per day: {form.meals}</label>
                <input type="range" min="2" max="5" value={form.meals} onChange={e => setForm({...form, meals: +e.target.value})} className="w-full accent-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Household size: {form.household}</label>
                <input type="range" min="1" max="6" value={form.household} onChange={e => setForm({...form, household: +e.target.value})} className="w-full accent-emerald-500" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Your plan is ready!</h3>
              <p className="text-stone-600 text-sm">Based on your profile, we've created your first week of meals. Let's see them!</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          {step > 0 && <button onClick={back} className="flex-1 py-3 border border-stone-300 text-stone-700 rounded-xl font-medium hover:bg-stone-50">Back</button>}
          <button onClick={step === STEPS.length - 1 ? () => window.location.href = "/dashboard" : next} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700">
            {step === STEPS.length - 1 ? "View My Plan" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
