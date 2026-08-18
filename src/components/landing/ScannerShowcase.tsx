"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

function PhoneIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
      <path d="M12 9c1.5 1.5 3 1.5 4.5 0M8.5 12c1 1 2.5 1 3.5 0M12 12c1.5 1.5 3 1.5 4.5 0" opacity="0.7" />
    </svg>
  );
}

const detectedItems = [
  { name: "White Rice", kcal: "205 kcal", carbs: "45 g C", tag: "Low FODMAP" },
  { name: "Paneer (small portion)", kcal: "120 kcal", carbs: "3 g C", tag: "Dairy · portioned" },
  { name: "Cucumber salad", kcal: "15 kcal", carbs: "2 g C", tag: "Low FODMAP" },
];

export default function ScannerShowcase() {
  return (
    <section id="scanner" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] rounded-full bg-brand-green/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-900/40 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <SectionHeading
            light
            eyebrow="AI Plate Scanner"
            title="Photograph your plate. Know what's in it."
            subtitle="Point your camera at any meal — dal, roti, rice, pasta, salads — and GutVista estimates the FODMAP content, calories, and macros instantly. No barcode required. Works on Indian, Western, and mixed cuisines."
          />
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-10 items-center mt-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="premium-card rounded-3xl p-7 bg-white/[0.06] border-white/15 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-brand-navy">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="text-white font-semibold">Scan in progress…</p>
                  <p className="text-xs text-emerald-100/80">3 items detected · 2 seconds</p>
                </div>
                <span className="ml-auto text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-3 py-1.5 rounded-full">
                  Premium
                </span>
              </div>
              <div className="space-y-3">
                {detectedItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-center gap-4 rounded-2xl bg-white/[0.08] px-4 py-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-green-light/20 flex items-center justify-center text-brand-green-light text-sm font-bold shrink-0">
                      {item.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-emerald-100/70">{item.kcal} · {item.carbs}</p>
                    </div>
                    <span className="ml-auto text-[10px] font-semibold text-emerald-200 bg-emerald-400/15 px-2 py-1 rounded-lg whitespace-nowrap">
                      {item.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-white font-bold text-lg">340 kcal total</span>
                <span className="text-xs text-emerald-100/80">Added to today&apos;s log</span>
              </div>
            </div>
          </motion.div>
          <div className="lg:col-span-3 space-y-8">
            {[
              {
                title: "One tap, not ten taps",
                desc: "Instead of searching a food list and guessing portions, take a photo. The scanner estimates what's on your plate and its FODMAP load.",
              },
              {
                title: "Portion-aware FODMAP ratings",
                desc: "FODMAP status changes with serving size. GutVista applies Monash-style portion thresholds automatically — small paneer is fine, a full bowl isn't.",
              },
              {
                title: "Macros go straight into your tracker",
                desc: "Calories, protein, carbs, and fat land in your daily log in one tap — so insights and your fingerprint keep learning even when you scan instead of type.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex gap-5"
              >
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center font-serif font-bold text-brand-green-light text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1.5">{f.title}</h3>
                  <p className="text-emerald-100/80 text-sm leading-relaxed max-w-xl">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
