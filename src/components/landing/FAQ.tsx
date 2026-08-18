"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const faqs = [
  {
    q: "Is GutVista available outside India?",
    a: "Yes — worldwide. The app works offline anywhere, and includes multi-country food databases for India, the UK, the US, and Australia. More regions are added regularly based on user requests.",
  },
  {
    q: "Does it replace the Monash FODMAP app?",
    a: "GutVista is built on the same published FODMAP thresholds and is a strong alternative — especially if you want AI scanning, portion-aware ratings, Indian cuisine depth, and an offline-first tracker. It is not affiliated with Monash University.",
  },
  {
    q: "Is it safe for IBD (Crohn's, ulcerative colitis)?",
    a: "The low-FODMAP diet is primarily an evidence-based protocol for IBS. If you have IBD, celiac disease, or any diagnosed condition, please use GutVista alongside guidance from your doctor or dietitian — it's a tracking tool, not medical advice.",
  },
  {
    q: "How does the AI plate scanner work?",
    a: "You take a photo of your meal and the scanner identifies the dishes and portions, then estimates FODMAP load, calories, and macros using the same portion thresholds as the Monash traffic-light system. Results can be added to your daily log in one tap.",
  },
  {
    q: "Does my data leave my phone?",
    a: "By default, no. All tracking data stays on your device. Cloud sync is optional and only enabled if you create an account. You can export everything as CSV or delete all data anytime from Settings.",
  },
  {
    q: "What does Premium cost and can I cancel?",
    a: "Premium is $7.99/month or $49/year, billed through your App Store or Google Play subscription — cancel anytime in one tap. The free tier stays free forever with full tracker, meal plans, and fingerprint insights.",
  },
  {
    q: "I'm a dietitian. Can I use it with patients?",
    a: "Yes. Premium includes clinician report export — a summary of symptoms, food logs, and fingerprint insights your patient can share with you in appointments.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-alt py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            subtitle="Everything you'd ask before making an app your daily gut-health companion."
          />
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated rounded-2xl bg-white border border-stone-100 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-stone-900">{f.q}</span>
                <span className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center transition-colors ${open === i ? "bg-brand-green text-white" : "bg-brand-green-light text-brand-green-dark"}`}>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-sm text-stone-600 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
