"use client";

import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Tell us about you", desc: "Your symptoms, preferences, cooking skill, allergies, and goals. Takes 3 minutes." },
  { step: "02", title: "Get your AI plan", desc: "A personalized weekly meal plan built for YOUR body — not a generic template." },
  { step: "03", title: "Track & adapt", desc: "Log symptoms in 10 seconds. The AI learns and adjusts your plan automatically." },
  { step: "04", title: "Reintroduce with confidence", desc: "Guided protocol tests FODMAPs one at a time. No more guessing." },
];

export default function Solution() {
  return (
    <section id="solution" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            Meet gutfeel — your AI gut health coach.
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Not a food database. Not a static meal plan. An intelligent system that learns what works for YOUR body and gets smarter over time.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              <div className="text-5xl font-bold text-emerald-200 mb-4">{s.step}</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">{s.title}</h3>
              <p className="text-stone-600 leading-relaxed">{s.desc}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 text-emerald-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
