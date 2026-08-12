"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const stats = [
  { value: "10-15%", label: "of global population has IBS" },
  { value: "70%", label: "report food as primary trigger" },
  { value: "2 years", label: "average time to diagnosis" },
  { value: "67%", label: "say diet advice is confusing" },
];

const pains = [
  { icon: "😰", title: "Fear of eating", desc: "Every meal is a gamble. Will this cause pain, bloating, or an urgent bathroom trip?" },
  { icon: "📱", title: "Confusing information", desc: "Google gives you 10 conflicting answers. Monash has data but no plan." },
  { icon: "🍽️", title: "Generic meal plans", desc: "One-size-fits-all diets that don't account for YOUR triggers or preferences." },
  { icon: "🔄", title: "Reintroduction is impossible", desc: "The hardest phase of FODMAP — and nobody guides you through it." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Problem() {
  return (
    <section id="problem" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="The problem"
            title="Living with IBS is exhausting"
            subtitle="You've tried elimination diets, downloaded food lists, and spent hours researching — and you're still guessing."
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={item} className="text-center p-6 bg-cream rounded-2xl border border-stone-100">
              <p className="text-2xl sm:text-3xl font-serif font-semibold text-brand-green mb-2">{stat.value}</p>
              <p className="text-sm text-stone-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pains.map((pain, i) => (
            <motion.div key={i} variants={item} className="p-6 bg-cream rounded-2xl border border-stone-100 hover:border-emerald-200/80 hover:shadow-lg hover:shadow-emerald-100/40 transition-all">
              <span className="text-3xl mb-4 block">{pain.icon}</span>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{pain.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{pain.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
