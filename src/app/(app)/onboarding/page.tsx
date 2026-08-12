"use client";

import { useEffect, useState } from "react";
import { loadProfile, saveProfile } from "@/lib/storage";

const COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳", foods: ["Rice", "Roti", "Dal", "Paneer", "Buttermilk"] },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", foods: ["Bread", "Potatoes", "Beans", "Cheese", "Apples"] },
  { code: "US", name: "United States", flag: "🇺🇸", foods: ["Chicken", "Rice", "Corn", "Beef", "Bananas"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", foods: ["Bread", "Meat", "Rice", "Bananas", "Cheese"] },
];

const IBS_TYPES = ["IBS-D", "IBS-C", "IBS-M", "IBS-U"];
const ALLERGIES = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs", "Shellfish"];
const DIETS = ["Vegetarian", "Vegan", "Pescatarian", "Halal", "Kosher"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [country, setCountry] = useState("");
  const [ibsType, setIbsType] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [skill, setSkill] = useState("");
  const [household, setHousehold] = useState(1);

  useEffect(() => {
    loadProfile().then(profile => {
      if (!profile) return;
      setCountry(profile.country);
      setIbsType(profile.ibsType);
      setAllergies(profile.allergies);
      setDiets(profile.diets);
      setSkill(profile.skill);
      setHousehold(profile.household);
    });
  }, []);

  function persistProfile(overrides: Partial<{ country: string; ibsType: string; allergies: string[]; diets: string[]; skill: string; household: number }> = {}) {
    saveProfile({
      country: overrides.country ?? country,
      ibsType: overrides.ibsType ?? ibsType,
      allergies: overrides.allergies ?? allergies,
      diets: overrides.diets ?? diets,
      skill: overrides.skill ?? skill,
      household: overrides.household ?? household,
    });
  }

  function next() { setStep(Math.min(step + 1, 4)); }
  function back() { setStep(Math.max(step - 1, 0)); }
  function toggle(arr: string[], item: string, fn: (v: string[]) => void) {
    fn(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex gap-1 mb-4">
            {[0,1,2,3,4].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-emerald-500" : "bg-stone-200"}`} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-stone-900">Welcome to Gutfeel</h1>
              <p className="text-stone-600">First, where do you live? This helps us show foods you actually eat.</p>
              <div className="space-y-2">
                {COUNTRIES.map(c => (
                  <button key={c.code} onClick={() => { setCountry(c.code); persistProfile({ country: c.code }); next(); }} className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${country === c.code ? "border-emerald-500 bg-emerald-50" : "border-stone-200 hover:border-stone-300 active:bg-stone-50"}`}>
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <p className="font-medium text-stone-900">{c.name}</p>
                      <p className="text-xs text-stone-500">{c.foods.join(" · ")}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-stone-900">Your IBS Profile</h1>
              <p className="text-stone-600">What type of IBS do you have?</p>
              <div className="grid grid-cols-2 gap-2">
                {IBS_TYPES.map(t => (
                  <button key={t} onClick={() => setIbsType(t)} className={`p-3 rounded-xl border text-sm font-medium transition-all ${ibsType === t ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-stone-200 active:bg-stone-50"}`}>{t}</button>
                ))}
              </div>
              <button onClick={() => { persistProfile({ ibsType }); next(); }} disabled={!ibsType} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium disabled:opacity-40">Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-stone-900">Allergies & Diet</h1>
              <p className="text-stone-600">Select any that apply</p>
              <div>
                <p className="text-sm font-medium text-stone-700 mb-2">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {ALLERGIES.map(a => (
                    <button key={a} onClick={() => toggle(allergies, a, setAllergies)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${allergies.includes(a) ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{a}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-700 mb-2">Diet</p>
                <div className="flex flex-wrap gap-2">
                  {DIETS.map(d => (
                    <button key={d} onClick={() => toggle(diets, d, setDiets)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${diets.includes(d) ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{d}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { persistProfile({ allergies, diets }); next(); }} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium">Continue</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-stone-900">Cooking & Lifestyle</h1>
              <p className="text-stone-600">How many people are you cooking for?</p>
              <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map(n => (
                  <button key={n} onClick={() => setHousehold(n)} className={`p-3 rounded-xl border text-center font-medium transition-all ${household === n ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-stone-200"}`}>{n}</button>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-stone-700 mb-2">Cooking skill</p>
                <div className="grid grid-cols-3 gap-2">
                  {["beginner", "intermediate", "advanced"].map(s => (
                    <button key={s} onClick={() => setSkill(s)} className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all ${skill === s ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-stone-200"}`}>{s}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { persistProfile({ skill, household }); next(); }} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium">Continue</button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">You&apos;re all set!</h3>
              <p className="text-stone-600 text-sm mb-4">Your personalized {country ? COUNTRIES.find(c => c.code === country)?.name : ""} meal plan is ready.</p>
              <a href="/dashboard" className="block w-full py-3 bg-emerald-600 text-white rounded-xl font-medium">View My Plan</a>
            </div>
          )}
        </div>

        {step > 0 && step < 4 && (
          <button onClick={back} className="w-full mt-4 py-3 text-stone-600 font-medium text-sm">← Back</button>
        )}
      </div>
    </div>
  );
}
