"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    step: "01",
    title: "Tell us about you",
    desc: "Symptoms, country, diet preferences, and goals. Onboarding takes about 3 minutes.",
  },
  {
    step: "02",
    title: "Get your daily plan",
    desc: "Breakfast, lunch, and dinner that avoid your known triggers — with swaps and a grocery list.",
  },
  {
    step: "03",
    title: "Track & learn",
    desc: "Log symptoms in under a minute. Your FODMAP fingerprint surfaces patterns from your own data.",
  },
  {
    step: "04",
    title: "Reintroduce carefully",
    desc: "Guided protocol UI for testing FODMAP groups one at a time — no more guesswork.",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="section-alt py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <SectionHeading
            eyebrow="How it works"
            title="Meet GutVista — your gut health companion"
            subtitle="Not another static food list. A practical system that learns from your logs and adapts your plan over time."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="card-elevated rounded-2xl p-6 relative"
            >
              <div className="text-4xl font-serif font-bold text-emerald-200 mb-3">{s.step}</div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{s.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
